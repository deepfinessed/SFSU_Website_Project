import express from 'express';
import Prisma from '@prisma/client';

const router = express.Router();

const {PrismaClient} = Prisma;

const prisma = new PrismaClient();


router.get('/', async function(req, res, next) {
    let query = req.query;
    let queryObj = {};
    if(query.name){
        queryObj = {
            where: {
                name: {
                    contains: query.name
                }
            },
            include: {
                covidRecords: /covid|all/i.test(query.type),
                fireRecords:/fire|all/i.test(query.type)
            }
        };
    } else {
        queryObj = {
            include: {
                covidRecords: /covid|all/i.test(query.type),
                fireRecords:/fire|all/i.test(query.type)
            }
        };

    }
    const records = await prisma.county.findMany(queryObj);
    if(records.length === 0) {
        res.sendStatus(404);
    }
    res.json(records);
});

export default router;
