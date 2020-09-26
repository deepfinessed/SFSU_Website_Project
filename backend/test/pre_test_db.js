import Prisma from '@prisma/client';
import ChaiPkg from 'chai'
import Mocha from 'mocha'

const {PrismaClient} = Prisma
const {describe, it} = Mocha
const {expect} = ChaiPkg


const prisma = new PrismaClient();

describe("Testing database", () => {
    describe("Testing on startup", () => {
        it("Testing add to county", async () => {
            const county = await prisma.county.create({
                data: {
                    population: 42,
                    name: "testCounty",
                    area: 3.14,
                },
            });
            expect(county.population).to.equal(42);
        });
        it("Testing SELECT ONE", async () => {
            const county = await prisma.county.findOne({
                where: {
                    name: "testCounty",
                },
            });
            expect(county.population).to.equal(42);
        });
        it("Testing DELETE", async () => {
            const county = await prisma.county.delete({
                where: {
                    name: "testCounty",
                },
            });
            expect(county.population).to.equal(42);
        });
    });
});
