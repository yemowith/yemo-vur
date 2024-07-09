import { logg } from "@utils/core/logger"
import { deploy, fromEther, fromWeiToEther, toEther, toWeiFromEther } from "@utils/tools"
import { BigNumber, Contract } from "ethers"
import { ethers } from "hardhat"

describe("Advanced Escrow", function () {
    let deployer: any
    let token: Contract
    let amount: BigNumber = toWeiFromEther("1000000")
    let advancedEscrow: Contract
    let lastDeposit: BigNumber
    let tokenId: string

    this.beforeAll(async function () {
        ;[deployer] = await ethers.getSigners()
        token = await (await deploy("ERC20Token", ["YEToken", "YET", deployer.address])).deployed
        await token.mint(deployer.address, toWeiFromEther("10000000000"))
        const deployerBalance = await token.balanceOf(deployer.address)
        logg.info(`Deployer balance: ${fromWeiToEther(deployerBalance)}`)
        advancedEscrow = await (
            await deploy("AdvancedEscrow", [token.address, fromEther(1)])
        ).deployed

        await token.approve(advancedEscrow.address, amount)
    })

    it("Advanced Escrow deposit", async function () {
        const depositTx = await advancedEscrow.deposit(amount, "Test metadata", {
            gasLimit: 30000000,
        })
        await depositTx.wait()

        tokenId = (await advancedEscrow.nextTokenId()).sub(1)
        const userDeposit = await advancedEscrow.balanceOfDeposits(deployer.address)
        lastDeposit = userDeposit
        logg.info(`Token ID: ${tokenId.toString()}`)
        logg.info(`User Deposit: ${fromWeiToEther(lastDeposit)}`)
        logg.info(`Advanced Escrow deposit successful`)
    })

    it("Advanced Escrow getVaultItem", async function () {
        const vaultItem = await advancedEscrow.getVaultItem(tokenId)
        logg.info(`Vault Item - Owner: ${vaultItem[0]}, Amount: ${fromWeiToEther(vaultItem[1])}`)
        logg.info(`Advanced Escrow getVaultItem successful`)
    })

    it("Advanced Escrow redeem", async function () {
        const redeemTx = await advancedEscrow.redeem(tokenId, {
            gasLimit: 30000000,
        })
        await redeemTx.wait()

        const userDeposit = await advancedEscrow.balanceOfDeposits(deployer.address)
        logg.info(`User Deposit after redeem: ${fromWeiToEther(userDeposit)}`)
        logg.info(`Advanced Escrow redeem successful`)
    })

    it("Advanced Escrow emergencyWithdraw", async function () {
        const emergencyWithdrawTx = await advancedEscrow.emergencyWithdraw({
            gasLimit: 30000000,
        })
        await emergencyWithdrawTx.wait()

        const contractBalance = await token.balanceOf(advancedEscrow.address)
        logg.info(`Contract balance after emergency withdraw: ${fromWeiToEther(contractBalance)}`)
        logg.info(`Advanced Escrow emergency withdraw successful`)
    })

    it("Advanced Escrow balanceOfDeposits", async function () {
        const userDeposit = await advancedEscrow.balanceOfDeposits(deployer.address)
        logg.info(`User Deposit: ${fromWeiToEther(userDeposit)}`)
        logg.info(`Advanced Escrow balanceOfDeposits successful`)
    })

    it("Advanced Escrow setMinDepositAmount", async function () {
        const newMinDepositAmount = toWeiFromEther("10")
        const setMinDepositAmountTx = await advancedEscrow.setMinDepositAmount(
            newMinDepositAmount,
            {
                gasLimit: 30000000,
            }
        )
        await setMinDepositAmountTx.wait()

        const minDepositAmount = await advancedEscrow.minDepositAmount()
        logg.info(`New Min Deposit Amount: ${fromWeiToEther(minDepositAmount)}`)
        logg.info(`Advanced Escrow setMinDepositAmount successful`)
    })

    it("Advanced Escrow tokenURI", async function () {
        const uri = await advancedEscrow.tokenURI(tokenId)
        logg.info(`Token URI: ${uri}`)
        logg.info(`Advanced Escrow tokenURI successful`)
    })
})
