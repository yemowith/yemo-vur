import { expect } from "chai"
import { BigNumber, Contract } from "ethers"
import { ethers } from "hardhat"
import { deploy } from "@utils/tools"
import { logg } from "@utils/core/logger"

describe("YeSwapperFactory", function () {
    let deployer: any
    let underlyingToken: Contract
    let quoteToken: Contract
    let vault: Contract
    let swapper: Contract
    let wrappedTokenFactory: Contract
    let yeSwapperFactory: Contract
    let wrappedTokenImplementation: Contract
    let proxyAddress: string
    let wrappedToken: Contract
    const exchangeRate: BigNumber = ethers.utils.parseUnits("1", 18)

    this.beforeAll(async function () {
        ;[deployer] = await ethers.getSigners()

        underlyingToken = await (
            await deploy("ERC20Token", ["Underlying Token", "UND", deployer.address])
        ).deployed
        await underlyingToken.mint(deployer.address, ethers.utils.parseUnits("1000000", 18))

        quoteToken = await (
            await deploy("ERC20Token", ["Quote Token", "QUOTE", deployer.address])
        ).deployed
        await quoteToken.mint(deployer.address, ethers.utils.parseUnits("1000000", 18))

        // Deploy WrappedTokenFactory
        wrappedTokenImplementation = await (await deploy("ERC20WrappedToken", [])).deployed
        wrappedTokenFactory = await (
            await deploy("WrappedTokenFactory", [wrappedTokenImplementation.address])
        ).deployed

        // Deploy YeSwapperFactory
        yeSwapperFactory = await (
            await deploy("YeSwapperFactory", [wrappedTokenFactory.address])
        ).deployed
    })

    it("creates a new ERC20SwapVault", async function () {
        // Create a wrapped token through the factory
        const createTx = await wrappedTokenFactory.createWrappedToken(
            "WrappedToken",
            "WTK",
            18,
            underlyingToken.address,
            {
                gasLimit: 3000000,
            }
        )
        const receiptt = await createTx.wait()
        proxyAddress = receiptt.events.find((event) => event.event === "TokenCreated").args
            .tokenAddress
        logg.info(`Wrapped Token Proxy Address: ${proxyAddress}`)

        // Get the instance of the wrapped token
        wrappedToken = await ethers.getContractAt("ERC20WrappedToken", proxyAddress)

        const createTokenAndSetupSwapTx = await yeSwapperFactory.createVaultAndSetupSwap(
            "WrappedToken",
            "WTK",
            18,
            proxyAddress,
            underlyingToken.address,
            exchangeRate,
            { gasLimit: 3000000 }
        )
        const receipt = await createTokenAndSetupSwapTx.wait()

        const vaultAddress = receipt.events.find((event: any) => event.event === "VaultCreated")
            .args.vaultAddress
        const swapperAddress = receipt.events.find((event: any) => event.event === "SwapperCreated")
            .args.swapperAddress

        logg.info(`Vault Address: ${vaultAddress}`)
        logg.info(`Swapper Address: ${swapperAddress}`)
    })
})
