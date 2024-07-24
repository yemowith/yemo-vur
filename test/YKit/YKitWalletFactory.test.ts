import { ethers } from "hardhat"
import { expect } from "chai"

describe("YKitWalletFactory", function () {
    let YKitWalletFactory, AccountManager, RelayerManager
    let factory, accountManager, relayerManager
    let owner, user1, user2

    before(async function () {
        ;[owner, user1, user2] = await ethers.getSigners()
        YKitWalletFactory = await ethers.getContractFactory("YKitWalletFactory")
        AccountManager = await ethers.getContractFactory("AccountManager")
        RelayerManager = await ethers.getContractFactory("RelayerManager")
    })

    it("should deploy AccountManager and RelayerManager", async function () {
        factory = await YKitWalletFactory.deploy()
        await factory.deployed()

        const accountManagerAddress = await factory.deployAccountManager()
        accountManager = AccountManager.attach(accountManagerAddress)

        const relayerManagerAddress = await factory.deployRelayerManager(accountManagerAddress)
        relayerManager = RelayerManager.attach(relayerManagerAddress)

        expect(accountManager.address).to.equal(accountManagerAddress)
        expect(relayerManager.address).to.equal(relayerManagerAddress)
    })

    it("should create account and execute transaction", async function () {
        await accountManager.connect(user1).createAccount()
        const account = await accountManager.accounts(user1.address)
        expect(account).to.not.equal(ethers.constants.AddressZero)

        // Whitelist user1 account
        await accountManager.addToWhitelist(user1.address)

        // Execute transaction
        const txData = accountManager.interface.encodeFunctionData("executeByAccount", [
            user1.address,
            relayerManager.address,
            0,
            ethers.utils.randomBytes(32),
        ])

        const tx = await relayerManager
            .connect(user1)
            .execute(
                account,
                txData,
                1,
                1,
                ethers.constants.AddressZero,
                ethers.constants.AddressZero
            )
        await tx.wait()

        const executed = await relayerManager.executedTransactions(tx.hash)
        expect(executed).to.be.true
    })
})
