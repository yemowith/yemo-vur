import { logg } from "@utils/core/logger"
import { deploy, fromEther, fromWeiToEther, toEther, toWeiFromEther } from "@utils/tools"
import { BigNumber, Contract } from "ethers"
import { ethers } from "hardhat"

describe("WrappedTokenFactory", function () {
    let deployer: any
    let underlyingToken: Contract
    let wrappedTokenFactory: Contract
    let proxyAddress: string
    let wrappedToken: Contract
    const initialSupply: BigNumber = toWeiFromEther("1000000")

    this.beforeAll(async function () {
        ;[deployer] = await ethers.getSigners()
        // Deploy underlying ERC20 token
        underlyingToken = await (
            await deploy("ERC20Token", ["UnderlyingToken", "UND", deployer.address])
        ).deployed
        await underlyingToken.mint(deployer.address, toWeiFromEther("10000000000"))
        const deployerBalance = await underlyingToken.balanceOf(deployer.address)
        logg.info(`Deployer balance: ${fromWeiToEther(deployerBalance)}`)

        // Deploy ERC20WrappedToken implementation
        const wrappedTokenImplementation = await (
            await deploy("ERC20WrappedToken", ["WrappedToken", "WTK", underlyingToken.address])
        ).deployed

        // Deploy WrappedTokenFactory
        wrappedTokenFactory = await (
            await deploy("WrappedTokenFactory", [wrappedTokenImplementation.address])
        ).deployed

        // Create a wrapped token through the factory
        const createTx = await wrappedTokenFactory.createWrappedToken(
            "WrappedToken",
            "WTK",
            underlyingToken.address,
            {
                gasLimit: 3000000,
            }
        )
        const receipt = await createTx.wait()
        proxyAddress = receipt.events.find((event) => event.event === "TokenCreated").args
            .tokenAddress
        logg.info(`Wrapped Token Proxy Address: ${proxyAddress}`)

        // Get the instance of the wrapped token
        wrappedToken = await ethers.getContractAt("ERC20WrappedToken", proxyAddress)
    })

    it("Wrapped Token Factory creates a new wrapped token", async function () {
        const name = await wrappedToken.name()
        const symbol = await wrappedToken.symbol()
        logg.info(`Wrapped Token Name: ${name}`)
        logg.info(`Wrapped Token Symbol: ${symbol}`)
        logg.info(`Wrapped Token creation successful`)
    })

    it("Wrap tokens", async function () {
        const amountToWrap = toWeiFromEther("1000")
        await underlyingToken.approve(wrappedToken.address, amountToWrap)

        const wrapTx = await wrappedToken.wrap(amountToWrap, {
            gasLimit: 3000000,
        })
        await wrapTx.wait()

        const wrappedBalance = await wrappedToken.balanceOf(deployer.address)
        logg.info(`Wrapped Token Balance: ${fromWeiToEther(wrappedBalance)}`)
        logg.info(`Wrap tokens successful`)
    })

    it("Unwrap tokens", async function () {
        const amountToUnwrap = toWeiFromEther("500")

        const unwrapTx = await wrappedToken.unwrap(amountToUnwrap, {
            gasLimit: 3000000,
        })
        await unwrapTx.wait()

        const wrappedBalance = await wrappedToken.balanceOf(deployer.address)
        logg.info(`Wrapped Token Balance after unwrap: ${fromWeiToEther(wrappedBalance)}`)
        logg.info(`Unwrap tokens successful`)
    })
})
