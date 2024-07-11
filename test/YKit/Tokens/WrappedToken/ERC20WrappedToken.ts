import { logg } from "@utils/core/logger"
import { deploy, fromWeiToEther, toWeiFromEther } from "@utils/tools"
import { BigNumber, Contract } from "ethers"
import { ethers } from "hardhat"

describe("ERC20WrappedToken", function () {
    let deployer: any
    let underlyingToken: Contract
    let wrappedToken: Contract

    const wrapAmount: BigNumber = toWeiFromEther("1000")
    const unwrapAmount: BigNumber = toWeiFromEther("500")

    this.beforeAll(async function () {
        ;[deployer] = await ethers.getSigners()

        // Deploy the underlying ERC20 token
        underlyingToken = await (
            await deploy("ERC20Token", ["UnderlyingToken", "UND", deployer.address])
        ).deployed
        await underlyingToken.mint(deployer.address, toWeiFromEther("10000000000"))
        const deployerBalance = await underlyingToken.balanceOf(deployer.address)
        logg.info(`Deployer balance: ${fromWeiToEther(deployerBalance)}`)

        // Deploy the ERC20WrappedToken proxy
        wrappedToken = await (await deploy("ERC20WrappedToken", [])).deployed

        // Initialize the ERC20WrappedToken
        const initializeTx = await wrappedToken.initialize(
            "WrappedToken",
            "WTK",
            18,
            underlyingToken.address
        )
        await initializeTx.wait()
    })

    it("Checks wrapped token name, symbol, and decimals", async function () {
        const name = await wrappedToken.name()
        const symbol = await wrappedToken.symbol()
        const decimals = await wrappedToken.decimals()
        logg.info(`Wrapped Token Name: ${name}`)
        logg.info(`Wrapped Token Symbol: ${symbol}`)
        logg.info(`Wrapped Token Decimals: ${decimals}`)
        logg.info(`Wrapped Token initialization successful`)
    })

    it("Wrap tokens", async function () {
        await underlyingToken.approve(wrappedToken.address, wrapAmount)
        const wrapTx = await wrappedToken.wrap(wrapAmount, {
            gasLimit: 3000000,
        })
        await wrapTx.wait()

        const wrappedBalance = await wrappedToken.balanceOf(deployer.address)
        logg.info(`Wrapped Token Balance: ${fromWeiToEther(wrappedBalance)}`)
        logg.info(`Wrap tokens successful`)
    })

    it("Unwrap tokens", async function () {
        const unwrapTx = await wrappedToken.unwrap(unwrapAmount, {
            gasLimit: 3000000,
        })
        await unwrapTx.wait()

        const wrappedBalance = await wrappedToken.balanceOf(deployer.address)
        logg.info(`Wrapped Token Balance after unwrap: ${fromWeiToEther(wrappedBalance)}`)
        logg.info(`Unwrap tokens successful`)
    })
})
