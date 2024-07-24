import { ethers } from "hardhat"
import { expect } from "chai"
import { AccountManager, TestMockERC20 } from "../../../../typechain-types"

describe("AccountManager", function () {
    let manager: AccountManager
    let token: TestMockERC20
    let owner: any
    let user1: any
    let user2: any

    before(async () => {
        ;[owner, user1, user2] = await ethers.getSigners()

        // Deploy the AccountManager
        const AccountManager = await ethers.getContractFactory("AccountManager")
        manager = await AccountManager.deploy({ gasLimit: 3000000 })
        await manager.deployed()
        console.log("AccountManager deployed at:", manager.address)

        // Deploy the TestMockERC20 token
        const TestMockERC20 = await ethers.getContractFactory("TestMockERC20")
        token = await TestMockERC20.deploy("MockToken", "MTK", ethers.utils.parseEther("1000"), {
            gasLimit: 3000000,
        })
        await token.deployed()
        console.log("MockERC20 deployed at:", token.address)

        manager = await ethers.getContractAt("AccountManager", manager.address)

        token = await ethers.getContractAt("TestMockERC20", token.address)
    })

    it("should create account", async () => {
        await manager.connect(user1).createAccount({ gasLimit: 3000000 })
        const accountAddress = await manager.accounts(user1.address)
        expect(accountAddress).to.not.equal(ethers.constants.AddressZero)
        console.log("Account created for user1 at:", accountAddress)
    })

    it("should add to whitelist", async () => {
        await manager.connect(owner).addToWhitelist(user1.address, { gasLimit: 3000000 })
        const isWhitelisted = await manager.whitelist(user1.address)
        expect(isWhitelisted).to.be.true
        console.log("Account added to whitelist:", user1.address)
    })

    it("should execute transactions through the proxy", async () => {
        const accountAddress = await manager.accounts(user1.address)
        console.log("Account address:", accountAddress)

        await token.mint(accountAddress, ethers.utils.parseEther("5"), { gasLimit: 3000000 })
        console.log("Minted 10 MTK to user1 at:", user1.address)

        await token
            .connect(user1)
            .approve(accountAddress, ethers.utils.parseEther("10"), { gasLimit: 3000000 })
        console.log("Approved 10 MTK from user1 to proxy at:", accountAddress)

        // Encode the transfer function data
        const transferData = token.interface.encodeFunctionData("transfer", [
            user2.address,
            ethers.utils.parseEther("5"),
        ])

        // Execute the transfer through the proxy
        const transaction = await manager
            .connect(user1)
            .executeByAccount(user1.address, token.address, 0, transferData, { gasLimit: 3000000 })

        // Wait for the transaction to be mined
        await ethers.provider.waitForTransaction(transaction.hash, 1)
        console.log("Transaction mined:", transaction.hash)

        // Check the balances
        const balanceUser1 = await token.balanceOf(user1.address)
        const balanceUser2 = await token.balanceOf(user2.address)
        const balanceAccount = await token.balanceOf(accountAddress)

        console.log("Balance of User1:", balanceUser1.toString())
        console.log("Balance of User2:", balanceUser2.toString())
        console.log("Balance of Account:", balanceAccount.toString())

        // expect(balanceUser1).to.equal(ethers.utils.parseEther("5"))
        //expect(balanceUser2).to.equal(ethers.utils.parseEther("5"))
    })

    it("should execute static call through the proxy", async () => {
        const accountAddress = await manager.accounts(user1.address)
        const balanceData = token.interface.encodeFunctionData("balanceOf", [accountAddress])

        const result = await manager
            .connect(user1)
            .executeStaticByAccount(user1.address, token.address, balanceData, {
                gasLimit: 3000000,
            })

        const [decodedResult] = ethers.utils.defaultAbiCoder.decode(["uint256"], result)
        //  expect(decodedResult).to.equal(ethers.utils.parseEther("5"))
        console.log(
            "Executed static call to get balance of user1. Decoded result:",
            decodedResult.toString()
        )
    })

    it("should remove from whitelist", async () => {
        await manager.connect(owner).removeFromWhitelist(user1.address, { gasLimit: 3000000 })
        const isWhitelisted = await manager.whitelist(user1.address)
        expect(isWhitelisted).to.be.false
        console.log("Account removed from whitelist:", user1.address)
    })
})
