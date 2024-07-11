import { expect } from "chai"
import { ethers } from "hardhat"
import { Contract } from "ethers"

describe("SwapContract", function () {
    let owner: any
    let user1: any
    let baseToken: Contract
    let quoteToken: Contract
    let vault: Contract
    let swapContract: Contract

    const gasLimit = 50000000

    this.beforeAll(async function () {
        ;[owner, user1] = await ethers.getSigners()
        console.log("Signers obtained:", owner.address, user1.address)

        // Deploy Base Token
        const ERC20Token = await ethers.getContractFactory("ERC20Token")
        baseToken = await ERC20Token.deploy("BaseToken", "BASE", owner.address)
        await baseToken.deployed()
        console.log("Base Token deployed at:", baseToken.address)
        await baseToken.mint(owner.address, ethers.utils.parseEther("1000000"))
        console.log("Base Token minted to owner")

        // Deploy Quote Token
        quoteToken = await ERC20Token.deploy("QuoteToken", "QUOTE", owner.address)
        await quoteToken.deployed()
        console.log("Quote Token deployed at:", quoteToken.address)
        await quoteToken.mint(owner.address, ethers.utils.parseEther("1000000"))
        console.log("Quote Token minted to owner")

        // Deploy Vault
        const Vault = await ethers.getContractFactory("ERC20SwapVault")
        vault = await Vault.deploy(baseToken.address, quoteToken.address)
        await vault.deployed()
        console.log("Vault deployed at:", vault.address)

        // Deploy Swap Contract
        const Swap = await ethers.getContractFactory("SwapContract")
        swapContract = await Swap.deploy(vault.address)
        await swapContract.deployed()
        console.log("Swap Contract deployed at:", swapContract.address)
    })

    it("should deposit base token", async function () {
        const amount = ethers.utils.parseEther("100")
        await baseToken.approve(swapContract.address, amount)
        console.log("Base Token approved for deposit")

        const tx = await swapContract.depositBase(amount, { gasLimit })
        const receipt = await tx.wait()
        console.log("Base Token deposited, transaction hash:", receipt.transactionHash)

        const baseBalance = await vault.getDeposit(baseToken.address, owner.address)
        expect(baseBalance).to.equal(amount)
        console.log("Base Token deposit verified")
    })

    it("should withdraw base token", async function () {
        const depositAmount = ethers.utils.parseEther("100")
        await baseToken.approve(swapContract.address, depositAmount)
        await swapContract.depositBase(depositAmount, { gasLimit })
        console.log("Base Token deposited for withdrawal test")

        const withdrawAmount = ethers.utils.parseEther("50")
        const tx = await swapContract.withdrawBase(withdrawAmount, { gasLimit })
        const receipt = await tx.wait()
        console.log("Base Token withdrawn, transaction hash:", receipt.transactionHash)

        const baseBalance = await vault.getDeposit(baseToken.address, owner.address)
        expect(baseBalance).to.equal(depositAmount.sub(withdrawAmount))
        console.log("Base Token withdrawal verified")
    })

    it("should deposit quote token", async function () {
        const amount = ethers.utils.parseEther("100")
        await quoteToken.approve(swapContract.address, amount)
        console.log("Quote Token approved for deposit")

        const tx = await swapContract.depositQuote(amount, { gasLimit })
        const receipt = await tx.wait()
        console.log("Quote Token deposited, transaction hash:", receipt.transactionHash)

        const quoteBalance = await vault.getDeposit(quoteToken.address, owner.address)
        expect(quoteBalance).to.equal(amount)
        console.log("Quote Token deposit verified")
    })

    it("should withdraw quote token", async function () {
        const depositAmount = ethers.utils.parseEther("100")
        await quoteToken.approve(swapContract.address, depositAmount)
        await swapContract.depositQuote(depositAmount, { gasLimit })
        console.log("Quote Token deposited for withdrawal test")

        const withdrawAmount = ethers.utils.parseEther("50")
        const tx = await swapContract.withdrawQuote(withdrawAmount, { gasLimit })
        const receipt = await tx.wait()
        console.log("Quote Token withdrawn, transaction hash:", receipt.transactionHash)

        const quoteBalance = await vault.getDeposit(quoteToken.address, owner.address)
        expect(quoteBalance).to.equal(depositAmount.sub(withdrawAmount))
        console.log("Quote Token withdrawal verified")
    })

    it("should swap base to quote tokens", async function () {
        const baseAmount = ethers.utils.parseEther("100")
        await baseToken.approve(swapContract.address, baseAmount)
        await swapContract.depositBase(baseAmount, { gasLimit })
        console.log("Base Token deposited for swap test")

        const tx = await swapContract.swapBaseToQuote(baseAmount, { gasLimit })
        const receipt = await tx.wait()
        console.log("Base Token swapped to Quote Token, transaction hash:", receipt.transactionHash)

        const quoteBalance = await quoteToken.balanceOf(owner.address)
        expect(quoteBalance).to.equal(baseAmount)
        console.log("Base to Quote Token swap verified")
    })

    it("should swap quote to base tokens", async function () {
        const quoteAmount = ethers.utils.parseEther("100")
        await quoteToken.approve(swapContract.address, quoteAmount)
        await swapContract.depositQuote(quoteAmount, { gasLimit })
        console.log("Quote Token deposited for swap test")

        const tx = await swapContract.swapQuoteToBase(quoteAmount, { gasLimit })
        const receipt = await tx.wait()
        console.log("Quote Token swapped to Base Token, transaction hash:", receipt.transactionHash)

        const baseBalance = await baseToken.balanceOf(owner.address)
        expect(baseBalance).to.equal(quoteAmount)
        console.log("Quote to Base Token swap verified")
    })
})
