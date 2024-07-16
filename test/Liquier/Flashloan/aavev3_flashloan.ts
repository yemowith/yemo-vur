import { expect } from "chai"
import { ethers } from "hardhat"
import fs from "fs"
import { balanceOf } from "@utils/clients/erc20"
import { BigNumber, Contract } from "ethers"

const IERC20 = "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol:IERC20"
const USDC_ADDRESS = "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619"
const USDC_DECIMALS = 18
const FLASHLOAN_AMOUNT = ethers.utils.parseUnits("10", USDC_DECIMALS)
const AMOUNT_UINT = ethers.utils.parseUnits("1", USDC_DECIMALS)
const POOL_ADDRESS = "0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb"

describe("AaveV3 Flashloan", function () {
    let flashloan: any
    let deployer: any
    let erc20: any
    let PoolAddressesProvider: any
    let tokenContract: Contract
    let feeAmount: any

    before(async function () {
        ;[deployer] = await ethers.getSigners()

        tokenContract = await ethers.getContractAt(IERC20, USDC_ADDRESS)

        const balance = await tokenContract.balanceOf(deployer.address)
        console.log(
            `Deployer address USDC balance: ${ethers.utils.formatUnits(balance, USDC_DECIMALS)}`
        )

        const MintFlashLoan = await ethers.getContractFactory("MintFlashLoan")
        flashloan = await MintFlashLoan.deploy(POOL_ADDRESS, { gasLimit: 300000000 })
        await flashloan.deployed()
        console.log("flashLoan deployed to:", flashloan.address)
    })

    it("should transfer USDC to the FlashLoan contract", async function () {
        const balanceLoaner = await tokenContract.balanceOf(flashloan.address)
        console.log(
            `flashloan address USDC balance: ${ethers.utils.formatUnits(
                balanceLoaner,
                USDC_DECIMALS
            )}`
        )

        // Calculate fee amount for 0.05% of FLASHLOAN_AMOUNT
        feeAmount = FLASHLOAN_AMOUNT.mul(5).div(10000)
        console.log(
            `Calculated fee amount: ${ethers.utils.formatUnits(feeAmount, USDC_DECIMALS)} USDC`
        )

        const transferTx = await tokenContract.transfer(flashloan.address, feeAmount, {
            gasLimit: 3000000,
        })

        await transferTx.wait(1)
        console.log(
            `Transferred ${ethers.utils.formatUnits(
                FLASHLOAN_AMOUNT.add(feeAmount),
                USDC_DECIMALS
            )} USDC to the FlashLoan contract`
        )

        const balanceLoanerAfter = await tokenContract.balanceOf(flashloan.address)
        console.log(
            `flashloan address USDC balance: ${ethers.utils.formatUnits(
                balanceLoanerAfter,
                USDC_DECIMALS
            )}`
        )
    })

    it("should execute a flash loan", async function () {
        console.log(`Requesting a flash loan of ${FLASHLOAN_AMOUNT.div(AMOUNT_UINT)} USDC...`)
        const res = await flashloan.executeFlashLoan(USDC_ADDRESS, FLASHLOAN_AMOUNT)
        await res.wait()
        console.log("Flashloan executed!")
        console.log(`MintFlashLoan successfully, please check tx hash ${res.hash} for more details`)
    })
})
