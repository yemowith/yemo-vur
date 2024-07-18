import { ethers } from "hardhat"
import { expect } from "chai"
import { Contract, Signer } from "ethers"

describe("Session Manager and Vault Integration with Multiple Sessions using TestContract", function () {
    let TestContractTest: Contract
    let owner: Signer
    let user1: Signer
    let user2: Signer
    let token: Contract
    let vault: Contract
    let sessionManager: Contract
    let snapshotId: string

    before(async function () {
        ;[owner, user1, user2] = await ethers.getSigners()

        // Deploy TestContractTest
        const TestContractTestFactory = await ethers.getContractFactory("TestContractTest")
        TestContractTest = await TestContractTestFactory.deploy()
        await TestContractTest.deployed()

        // Retrieve the deployed MockERC20 token instance
        token = await ethers.getContractAt("MockERC20", await TestContractTest.token())
        // Retrieve the deployed Vault instance
        vault = await ethers.getContractAt("VaultTest", await TestContractTest.vault())
        // Retrieve the deployed SessionManager instance
        sessionManager = await ethers.getContractAt(
            "SessionManagerTest",
            await TestContractTest.sessionManager()
        )

        // Take a snapshot to revert back after each test
        snapshotId = await ethers.provider.send("evm_snapshot", [])
    })

    afterEach(async function () {
        // Revert to the snapshot after each test
        await ethers.provider.send("evm_revert", [snapshotId])
        // Take a new snapshot for the next test
        snapshotId = await ethers.provider.send("evm_snapshot", [])
    })

    it("should execute transactions in two different sessions using TestContractTest", async function () {
        const depositAmount1 = 100
        const withdrawAmount1 = 50
        const depositAmount2 = 200
        const withdrawAmount2 = 100
        const sessionDuration = 600 // 10 minutes

        const user1Address = await user1.getAddress()
        const user2Address = await user2.getAddress()

        // Transfer tokens to users
        await token.transfer(user1Address, depositAmount1)
        await token.transfer(user2Address, depositAmount2)
        await token.connect(user1).approve(vault.address, depositAmount1)
        await token.connect(user2).approve(vault.address, depositAmount2)

        // Run tests via TestContractTest with gas limit
        const gasLimit = 5000000

        // Execute the test contract's runTests function
        let tx = await TestContractTest.runTests(
            user1Address,
            user2Address,
            sessionDuration,
            depositAmount1,
            withdrawAmount1,
            depositAmount2,
            withdrawAmount2,
            { gasLimit }
        )
        await tx.wait()
        console.log("Transactions executed during sessions")

        // Check balances after all operations
        const balanceUser1 = await vault.balances(user1Address)
        const balanceUser2 = await vault.balances(user2Address)
        const vaultBalance = await token.balanceOf(vault.address)

        console.log(`Balance of User1: ${balanceUser1.toString()}`)
        console.log(`Balance of User2: ${balanceUser2.toString()}`)
        console.log(`Balance of Vault: ${vaultBalance.toString()}`)

        expect(balanceUser1).to.equal(depositAmount1 - withdrawAmount1)
        expect(balanceUser2).to.equal(depositAmount2 - withdrawAmount2)
        expect(vaultBalance).to.equal(
            depositAmount1 - withdrawAmount1 + depositAmount2 - withdrawAmount2
        )
    })
})
