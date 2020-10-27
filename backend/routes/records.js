import express from 'express';
import Prisma from '@prisma/client';
import verifyJWT from "../utils/verifyJWT.js";

const router = express.Router();

const {PrismaClient} = Prisma;

const prisma = new PrismaClient();

router.use(verifyJWT);

router.get('/', function (req,res,next) {
  res.send('This is a protected endpoint');
})

router.post('/covid/', async function(req, res, next) {
  if(req.token?.access !== 'admin' && req.token?.access !== 'employee'){
    console.log("Rejecting with token as");
    console.log(req.token);
    res.sendStatus(403);
    return;
  }
  console.log(req.body);
  const {
    county,
    deaths,
    icu,
    hosp,
    cases,
    date,
    countyName,
  } = req.body;
  const dateObj = new Date(date);
  try {
    const countyDb = await prisma.county.findOne({
      where: {
        name: countyName,
      }
    });
    if(!countyDb) {
      res.status(422).send("Could not find that county");
      return;
    }
    const record = await prisma.covidRecord.create({
      data: {
        county: {
          connect: {
            id: countyDb.id,
          }
        },
        date: dateObj,
        deaths,
        icu,
        hosp,
        cases,
      }
    });
    if(!record){
      res.sendStatus(422);
      return;
    }
  } catch(err) {
    res.status(422).send(err);
    return;
  }
  res.sendStatus(201);
});

router.post('/fire/', async function(req, res, next){
  if(req.token?.access !== 'admin' || req.token?.access !== 'employee'){
    res.sendStatus(403);
  }
  const {
    start_date,
    end_date,
    aqi,
    EvacuationLevel,
    county,
    area,
    active,
    name,
  } = req.body;
  const countyDb = await prisma.county.findOne({
    where: {
      name: name,
    }
  });
  if(!countyDb) {
    res.status(422).send("Could not find that county");
  }
  const record = await prisma.fireRecord.create({
    data: {
      county: {
        connect: {
          id: county.id,
        }
      },
      start_date,
      end_date,
      aqi,
      EvacuationLevel,
      area,
      active,
      name,
    }
  });
  if(!record){
    res.sendStatus(422);
    return;
  }
  res.sendStatus(201);
});


export default router;
