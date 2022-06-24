const { expect } = require("chai")
const { ethers } = require("hardhat")
const { assert } = require("chai")

describe("SimpleStorage", function () {
    let ssFactory, simpleStorage
    beforeEach(async function() {
        ssFactory  = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await ssFactory.deploy()
    })

    it("Should start with age of 0", async function(){
        const currentAge = await simpleStorage.retrieve()
        const expectedAge = "0"
        assert.equal(currentAge.toString(), expectedAge)
    })

    it("Should update when we call store", async function () {
        const expectedAge = "7"
        const txnResponse = await simpleStorage.store("7")
        await txnResponse.wait(1)

        const currentValue= await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedAge)
    })
})