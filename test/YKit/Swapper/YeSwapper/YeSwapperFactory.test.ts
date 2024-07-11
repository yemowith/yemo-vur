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

        // Deploy the ERC20 tokens
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
        const createVaultTx = await yeSwapperFactory.createVault(
            underlyingToken.address,
            quoteToken.address
        )
        const receipt = await createVaultTx.wait()
        const vaultAddress = receipt.events.find((event: any) => event.event === "VaultCreated")
            .args.vaultAddress
        logg.info(`Vault Address: ${vaultAddress}`)

        vault = await ethers.getContractAt("ERC20SwapVault", vaultAddress)
        expect(await vault.baseToken()).to.equal(underlyingToken.address)
        expect(await vault.quoteToken()).to.equal(quoteToken.address)
        logg.info(`Vault creation successful`)
    })

    it("creates a new YeSwapper", async function () {
        const createSwapperTx = await yeSwapperFactory.createSwapper(vault.address, exchangeRate)
        const receipt = await createSwapperTx.wait()
        const swapperAddress = receipt.events.find((event: any) => event.event === "SwapperCreated")
            .args.swapperAddress
        logg.info(`Swapper Address: ${swapperAddress}`)

        swapper = await ethers.getContractAt("YeSwapper", swapperAddress)
        expect(await swapper.vault()).to.equal(vault.address)
        expect(await swapper.exchangeRate()).to.equal(exchangeRate)
        logg.info(`Swapper creation successful`)
    })

    it("creates a wrapped token and sets up swap", async function () {
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
            wrappedToken.address,
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

        // Validate the created wrapped token, vault, and swapper
        const vault = await ethers.getContractAt("ERC20SwapVault", vaultAddress)
        expect(await vault.baseToken()).to.equal(proxyAddress)
        expect(await vault.quoteToken()).to.equal(underlyingToken.address)

        const swapper = await ethers.getContractAt("YeSwapper", swapperAddress)
        expect(await swapper.vault()).to.equal(vaultAddress)
        expect(await swapper.exchangeRate()).to.equal(exchangeRate)
    })
})
