import { ethers } from "hardhat"
import { expect } from "chai"
import { Contract, Signer } from "ethers"

describe("Proxy and Wallet Integration with Module and SessionManager", function () {
    let proxy: Contract
    let wallet: Contract
    let module: Contract
    let token: Contract
    let owner: Signer
    let user1: Signer
    let user2: Signer
    let snapshotId: string

    before(async function () {
        ;[owner, user1, user2] = await ethers.getSigners()

        // Deploy TestMockERC20 contract
        const TestMockERC20Factory = await ethers.getContractFactory("TestMockERC20")
        token = await TestMockERC20Factory.deploy(
            "Mock Token",
            "MTK",
            ethers.utils.parseEther("1000")
        )
        await token.deployed()
        console.log(`TestMockERC20 deployed at: ${token.address}`)

        // Deploy Wallet contract
        const WalletFactory = await ethers.getContractFactory("TestWallet")
        wallet = await WalletFactory.deploy()
        await wallet.deployed()
        console.log(`Wallet deployed at: ${wallet.address}`)

        // Deploy Module contract
        const ModuleFactory = await ethers.getContractFactory("TestModule")
        module = await ModuleFactory.deploy()
        await module.deployed()
        console.log(`Module deployed at: ${module.address}`)

        // Deploy TestProxy contract
        const TestProxyFactory = await ethers.getContractFactory("TestProxy")
        proxy = await TestProxyFactory.deploy()
        await proxy.deployed()
        console.log(`Proxy deployed at: ${proxy.address}`)

        // Set wallet as the implementation of proxy
        await proxy.setImplementation(wallet.address)
        console.log(`Proxy implementation set to Wallet at: ${wallet.address}`)

        // Set Module as the module of wallet
        await wallet.setModule(module.address)
        console.log(`Wallet module set to Module at: ${module.address}`)

        // Authorize the module in wallet
        await wallet.authoriseModule(module.address, true)
        console.log("Module authorized in Wallet")

        // Transfer some tokens to the proxy contract
        await token.transfer(proxy.address, ethers.utils.parseEther("100"))
        console.log(`Transferred 100 MTK to Proxy at: ${proxy.address}`)

        // Take a snapshot to revert back after each test
        snapshotId = await ethers.provider.send("evm_snapshot", [])
        console.log(`Snapshot taken with ID: ${snapshotId}`)
    })

    afterEach(async function () {
        // Revert to the snapshot after each test
        await ethers.provider.send("evm_revert", [snapshotId])
        console.log(`Reverted to snapshot ID: ${snapshotId}`)
        // Take a new snapshot for the next test
        snapshotId = await ethers.provider.send("evm_snapshot", [])
        console.log(`New snapshot taken with ID: ${snapshotId}`)
    })

    it("should execute transactions through the proxy with session management", async function () {
        const sessionDuration = 600 // 10 minutes
        const user1Address = await user1.getAddress()
        const transferAmount = ethers.utils.parseEther("10")

        // Start session for user1
        await module.connect(user1).startSession(sessionDuration)
        console.log(`Session started for user1 with duration: ${sessionDuration}`)

        // Encode the ERC20 transfer transaction data
        const data = token.interface.encodeFunctionData("transfer", [user1Address, transferAmount])
        console.log(`Encoded transfer data: ${data}`)

        // Execute the transaction through the wallet's execute function
        await proxy.connect(user1).execute(wallet.address, 0, data, {
            gasLimit: 1000000,
        })
        console.log(
            `Transaction sent through Proxy to transfer ${transferAmount.toString()} MTK to ${user1Address}`
        )

        // End session for user1
        await module.connect(user1).endSession()
        console.log("Session ended for user1")

        // Check if the session was correctly managed
        expect(await module.sessionUser()).to.equal(ethers.constants.AddressZero)
        expect(await module.sessionExpiry()).to.equal(0)
        console.log("Session management verified")

        // Check if the transfer was successful
        const user1Balance = await token.balanceOf(user1Address)
        expect(user1Balance).to.equal(transferAmount)
        console.log(`Transfer successful, user1 balance: ${user1Balance.toString()}`)
    })
})
