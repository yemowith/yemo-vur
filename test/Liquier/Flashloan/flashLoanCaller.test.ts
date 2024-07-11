import { ethers } from "hardhat"
import { expect } from "chai"
import { Contract } from "ethers"

describe("FlashLoanCaller", function () {
    let flashLoanCaller: Contract
    let owner: any
    let addr1: any
    let token: any
    let tokenAddress: string = "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359"
    let addressProvider: string = "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb"

    beforeEach(async function () {
        ;[owner, addr1] = await ethers.getSigners()

        // Deploy FlashLoanCaller
        const FlashLoanCallerFactory = await ethers.getContractFactory("FlashLoanCaller")
        flashLoanCaller = await FlashLoanCallerFactory.deploy(addressProvider)
        await flashLoanCaller.deployed()
    })

    describe("Token Registry", function () {
        it("should allow the owner to add a token", async function () {
            await flashLoanCaller.addToken(tokenAddress)
            expect(await flashLoanCaller.tokenRegistry(tokenAddress)).to.be.true
        })
    })

    describe("Flash Loan", function () {
        it("should initiate a flash loan", async function () {})
    })
})
