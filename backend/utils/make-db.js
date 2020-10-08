import Prisma from '@prisma/client';
import loadCounties from "./counties.js";
import updateGeoData from "./geoCounties.js"

const {PrismaClient} = Prisma
const prisma = new PrismaClient();

async function makeDB(){
    let county = await prisma.county.findOne({
        where: {
            name: "San Mateo County",
        },
    });
    if(county == null) {
        console.log("Failed to find San Mateo County");
        console.log("Perhaps county data has not been loaded - ");
        loadCounties();
        county = await prisma.county.findOne({
            where: {
                name: "San Mateo County",
            },
        });
    }
    console.log("Updating Geodata");
    updateGeoData();
    console.log("Update finished");
}

export default makeDB;

await makeDB();
