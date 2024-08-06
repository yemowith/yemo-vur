import { ethers } from "hardhat"
import { expect } from "chai"

describe("ERC20FlashLoanFactory", function () {
    let factory: any
    let lender: any
    let borrower: any
    let token: any
    let counter: any
    let owner: any

    before(async () => {
        // Signer addresses
        ;[owner] = await ethers.getSigners()

        // Deploy a mock ERC20 token for testing
        const Token = await ethers.getContractFactory("MockERC20")
        token = await Token.deploy("TestToken", "TT", 18)
        await token.deployed()

        // Mint initial supply to the owner
        await token.mint(owner.address, ethers.utils.parseEther("1000"))

        // Deploy ERC20FlashLoanFactory contract
        const Factory = await ethers.getContractFactory("ERC20FlashLoanFactory")
        factory = await Factory.deploy()
        await factory.deployed()

        // Deploy Counter contract
        const Counter = await ethers.getContractFactory("Counter")
        counter = await Counter.deploy()
        await counter.deployed()
    })

    it("Should deploy a new ERC20FlashLender", async function () {
        const createLenderTx = await factory.createLender(token.address)
        const createLenderReceipt = await createLenderTx.wait()
        const lenderAddress = createLenderReceipt.events[0].args[0]
        lender = await ethers.getContractAt("ERC20FlashLender", lenderAddress)

        expect(await lender.token()).to.equal(token.address)
    })

    it("Should deploy a new ERC20FlashBorrower linked to the lender", async function () {
        const createBorrowerTx = await factory.createBorrower(lender.address)
        const createBorrowerReceipt = await createBorrowerTx.wait()
        const borrowerAddress = createBorrowerReceipt.events[0].args[0]
        borrower = await ethers.getContractAt("ERC20FlashBorrower", borrowerAddress)

        expect(await borrower.flashLender()).to.equal(lender.address)
    })

    it("Should perform a flash loan and call increment on Counter contract", async function () {
        // Mint tokens to the lender contract
        await token.mint(lender.address, ethers.utils.parseEther("100"))

        const amount = ethers.utils.parseEther("10")
        const targetContract = counter.address

        // Encode the function call to increment()
        const incrementFunctionData = counter.interface.encodeFunctionData("increment")

        // Borrow tokens via flash loan and call increment on Counter contract
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
        const lenderBalance = await token.balanceOf(lender.address)
        expect(lenderBalance).to.be.gte(ethers.utils.parseEther("100.001")) // Considering the fee
    })
})
