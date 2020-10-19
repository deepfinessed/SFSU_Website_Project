import express from 'express'
import Prisma from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import makeAccessJWT from "../utils/makeAccessJWT.js";
import makeRefreshToken from "../utils/makeRefreshToken.js"

const router = express.Router();

const {PrismaClient} = Prisma;
const prisma = new PrismaClient();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register/', async function (req,res,next) {
  const {firstName, lastName, email, password, phone} = req.body;
  const oldUser = await prisma.user.findOne({
    where: {
      email: email,
    }
  });
  if(oldUser){
    res.status(422).send('That email is already registered');
  }

  const saltRounds = 12;

  let newUser;
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    newUser = await prisma.user.create({
      data: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        passwordHash: hash,
        phone: phone,
        access: 'standard',
      },
    });
  });
  res.sendStatus(201);
});

router.post('/login/', async function(req, res, next) {
  const {email, password} = req.body;
  const user = prisma.user.findOne({
    where: {
      email: email,
    }
  });
  if(!user){
    res.status(422).send('There is no user with that email');
  }
  bcrypt.compare(password, user.passwordHash, (err, result) => {
    if(err || !result){
      res.sendStatus(401);
    }
    const accessToken = makeAccessJWT(user);
    const refreshToken = makeRefreshToken(user);
    const payload = {
      token_type: 'bearer',
      access_token: accessToken,
      refresh_token: 'Refresh token is in the cookie as HTTPOnly',
    }
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 3600 * 24 * 365,
      path: '/users/refresh/'
    });
    res.json(payload);
  });
});

router.post('/refresh/', async function(req, res, next) {
  const token = req.cookies.refresh_token;
  if(!token){
    res.sendStatus(401);
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if(err){
      res.status(400).send(err);
    }
    if(!decodedToken){
      res.sendStatus(401);
    }
    const user = await prisma.user.findOne({
      where: {
        email: decodedToken.sub,
      },
    });
    if(!user) {
      res.status(400).send(err);
    }
    const payload = {
      access_token: makeAccessJWT(user),
      token_type: 'bearer',
    }
    return res.json(payload);
  });
});

export default router;
