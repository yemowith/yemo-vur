import { ethers } from "hardhat"
import { expect } from "chai"

describe("ETHFlashLoanFactory", function () {
    let factory: any
    let lender: any
    let borrower: any
    let counter: any
    let owner: any

    before(async () => {
        // Signer addresses
        ;[owner] = await ethers.getSigners()

        // Deploy ETHFlashLoanFactory contract
        const Factory = await ethers.getContractFactory("ETHFlashLoanFactory")
        factory = await Factory.deploy()
        await factory.deployed()

        // Deploy Counter contract
        const Counter = await ethers.getContractFactory("Counter")
        counter = await Counter.deploy()
        await counter.deployed()
    })

    it("Should deploy a new ETHFlashLender", async function () {
        const createLenderTx = await factory.createLender()
        const createLenderReceipt = await createLenderTx.wait()
        const lenderAddress = createLenderReceipt.events[0].args[0]
        lender = await ethers.getContractAt("ETHFlashLender", lenderAddress)

        expect(await lender.address).to.equal(lenderAddress)
    })

    it("Should deploy a new ETHFlashBorrower linked to the lender", async function () {
        const createBorrowerTx = await factory.createBorrower(lender.address)
        const createBorrowerReceipt = await createBorrowerTx.wait()
        const borrowerAddress = createBorrowerReceipt.events[0].args[0]
        borrower = await ethers.getContractAt("ETHFlashBorrower", borrowerAddress)

        expect(await borrower.flashLender()).to.equal(lender.address)
    })

    it("Should perform a flash loan and call increment on Counter contract", async function () {
        // Fund the lender contract with ETH
        await owner.sendTransaction({ to: lender.address, value: ethers.utils.parseEther("10") })

        const amount = ethers.utils.parseEther("1")
        const targetContract = counter.address

        // Encode the function call to increment()
        const incrementFunctionData = counter.interface.encodeFunctionData("increment")

        // Borrow ETH via flash loan and call increment on Counter contract
        const flashLoanTx = await borrower.initiateBorrow(
            amount,
            targetContract,
            incrementFunctionData
        )
        await expect(flashLoanTx).to.emit(lender, "LoanProvided").withArgs(borrower.address, amount)

        // Check the count value in the Counter contract
        const countValue = await counter.getCount()
        expect(countValue).to.equal(1)

        // Check the balance of the lender contract after the transaction
        const lenderBalance = await ethers.provider.getBalance(lender.address)
        expect(lenderBalance).to.be.gte(ethers.utils.parseEther("10.001")) // Considering the fee
    })
})
