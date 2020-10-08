import csv from 'csv-parser';
import fs from 'fs';
import Prisma from '@prisma/client';

const {PrismaClient} = Prisma;



function updateCountyGeoData() {
    const prisma = new PrismaClient();
    const filePath = 'utils/CountyGeoData.csv'

    //The following ABOMINATION is necessary because there are different types of dashes
    const filter = /–/g;

    console.log("Loading county data from " + filePath + " ... ");

    fs.createReadStream(filePath).pipe(
        csv({
            mapHeaders: ({header, index}) => header.replace(filter,'-'),
            mapValues: ({header, index, value}) => value.replace(filter,'-'),
        }).on('data', async (row) => {
            let counties = await prisma.county.findMany({
                where: {
                    name: {
                        contains: row.County,
                    }
                }
            });
            console.log("Latitude: " + row.Latitude);
            console.log("Parsed Latitude: " + parseFloat(row.Latitude));
            console.log("Longitude: : " + row.Longitude);
            console.log("Parsed Longitude: " + parseFloat(row.Longitude));
            let updated = await prisma.county.update({
                where: {
                    id: counties[0].id
                },
                data: {
                    latitude: parseFloat(row.Latitude),
                    longitude: parseFloat(row.Longitude)
                }
            });
            console.log(updated);
        })
    );
}



export default updateCountyGeoData;
