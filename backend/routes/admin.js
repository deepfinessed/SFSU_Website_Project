import express from 'express'
import Prisma from '@prisma/client';

import verifyJWT from "../utils/verifyJWT.js";
import makeTransporter from "../utils/transporter.js";

const router = express.Router();

const {PrismaClient} = Prisma;
const prisma = new PrismaClient();

const transporter = makeTransporter();

function verifyAdmin(req, res, next) {
  if(req.token?.access !== 'admin') {
    res.sendStatus(403);
    return;
  }
  next();
}

router.use(verifyJWT);

router.get('/testEmail/', verifyAdmin, function (req, res, next) {
  const message = {
    from: 'alerts@sfsucsc648.com',
    to: 'alerts@sfsucsc648.com',
    subject: 'Testing SES Email',
    text: 'This is a simple test',
    html: '<p>This is a simple test</p>'
  }

  transporter.sendMail(message, (err, info) => {
    console.log('Err: ');
    console.log(err);
    console.log('Info: ');
    console.log(info);
  });

  res.status(200).send('Test email sent');
});

router.get('/covid/verify/', verifyAdmin, async function activateRecord(req, res, next) {
  const id = parseInt(req.query?.id);
  if(isNaN(id)) {
    res.status(422).send('There is no record id');
  }
  try {
    const record = await prisma.covidRecord.update({
      where: {
        id
      },
      data: {
        approved: true,
      }
    });
    if(!record) {
      res.status(422).send('No such record could be fine');
    }
  } catch(err) {
    res.status(422).send('No such record could be fine');
  }
  res.sendStatus(200);
});

router.get('/covid/verifyall/', verifyAdmin, async function activateRecord(req, res, next) {
  try {
    const record = await prisma.covidRecord.update({
      where: {
        approved: false,
      },
      data: {
        approved: true,
      }
    });
    if(!record) {
      res.status(422).send('No such record could be fine');
    }
  } catch(err) {
    res.status(422).send('No such record could be fine');
  }
  res.sendStatus(200);
});

router.get('/fire/verify/', verifyAdmin, async function activateRecord(req, res, next) {
  const id = parseInt(req.query?.id);
  if(isNaN(id)) {
    res.status(422).send('There is no record id');
  }
  try {
    const record = await prisma.covidRecord.update({
      where: {
        id
      },
      data: {
        approved: true,
      }
    });
    if(!record) {
      res.status(422).send('No such record could be fine');
    }
  } catch(err) {
    res.status(422).send('No such record could be fine');
  }
  res.sendStatus(200);
});

router.get('/fire/verifyall/', verifyAdmin, async function activateRecord(req, res, next) {
  try {
    const record = await prisma.covidRecord.update({
      where: {
        approved: false,
      },
      data: {
        approved: true,
      }
    });
    if(!record) {
      res.status(422).send('No such record could be fine');
    }
  } catch(err) {
    res.status(422).send('No such record could be fine');
  }
  res.sendStatus(200);
});

export default router;
