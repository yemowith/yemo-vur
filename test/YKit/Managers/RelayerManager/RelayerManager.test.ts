import { ethers } from "hardhat"
import { expect } from "chai"
import { Contract } from "ethers"

describe("RelayerManager", function () {
    let owner: any, user1: any, relayer: any
    let accountManager: Contract
    let relayerManager: Contract
    let mockERC20: Contract

    before(async function () {
        ;[owner, user1, relayer] = await ethers.getSigners()

        // Deploy Mock ERC20 token
        const MockERC20 = await ethers.getContractFactory("TestMockERC20")
        mockERC20 = await MockERC20.deploy("Mock Token", "MTK", ethers.utils.parseEther("1000"))
        await mockERC20.deployed()

        // Deploy AccountManager
        const AccountManager = await ethers.getContractFactory("AccountManager")
        accountManager = await AccountManager.deploy()
        await accountManager.deployed()

        // Deploy RelayerManager
        const RelayerManager = await ethers.getContractFactory("RelayerManager")
        relayerManager = await RelayerManager.deploy(accountManager.address)
        await relayerManager.deployed()

        // Create an account for user1
        await accountManager.connect(user1).createAccount()
    })

    it("should execute transactions through the relayer", async function () {
        const proxyAddress = await accountManager.accounts(user1.address)

        // Add user1 to the whitelist
        await accountManager.addToWhitelist(user1.address)

        // Mint tokens to user1
        await mockERC20.mint(user1.address, ethers.utils.parseEther("10"))

        // Approve the proxy to spend user1's tokens
        await mockERC20.connect(user1).approve(proxyAddress, ethers.utils.parseEther("10"))

        // Encode the transfer function data
        const transferData = mockERC20.interface.encodeFunctionData("transfer", [
            relayer.address,
            ethers.utils.parseEther("5"),
        ])

        // Encode the relayer transaction data
        const data = accountManager.interface.encodeFunctionData("executeByAccount", [
            user1.address,
            mockERC20.address,
            0,
            transferData,
        ])

        // Calculate the sign hash
        const nonce = (await relayerManager.getNonce(user1.address)).toNumber() + 1
        const gasPrice = ethers.utils.parseUnits("10", "gwei")
        const gasLimit = 300000
        const refundToken = mockERC20.address
        const refundAddress = relayer.address
        const signHash = ethers.utils.solidityKeccak256(
            ["address", "uint256", "bytes", "uint256", "uint256", "uint256", "address", "address"],
            [relayerManager.address, 0, data, nonce, gasPrice, gasLimit, refundToken, refundAddress]
        )

        // Sign the transaction
        const signature = await user1.signMessage(ethers.utils.arrayify(signHash))

        // Execute the relayer transaction
        await expect(
            relayerManager.execute(
                user1.address,
                data,
                nonce,
                signature,
                gasPrice,
                gasLimit,
                refundToken,
                refundAddress,
                { gasLimit }
            )
        )
            .to.emit(relayerManager, "TransactionExecuted")
            .withArgs(user1.address, true, "0x", signHash)

        // Check the balances
        const user1Balance = await mockERC20.balanceOf(user1.address)
        const relayerBalance = await mockERC20.balanceOf(relayer.address)

        expect(user1Balance).to.equal(ethers.utils.parseEther("5"))
        expect(relayerBalance).to.equal(ethers.utils.parseEther("5"))
    })
})
