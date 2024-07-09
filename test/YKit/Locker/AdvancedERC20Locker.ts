import { expect } from "chai"
import { ethers } from "hardhat"

describe("AdvancedERC20Locker", function () {
    let owner: any
    let user: any
    let feeRecipient: any
    let token: any
    let locker: any

    const initialSupply = ethers.utils.parseEther("1000000")
    const penaltyFee = 5 // 5%

    before(async function () {
        ;[owner, user, feeRecipient] = await ethers.getSigners()

        // Deploy ERC20 token
        const ERC20Token = await ethers.getContractFactory("ERC20Token") // Assuming an ERC20 implementation named ERC20Token
        token = await ERC20Token.deploy("TestToken", "TTK", owner.address, { gasLimit: 3000000 })
        await token.deployed()
        console.log("ERC20 token deployed at:", token.address)

        // Mint additional tokens to the owner address
        await token.mint(owner.address, initialSupply, { gasLimit: 3000000 })
        console.log("Minted initial supply to owner:", initialSupply.toString())

        // Distribute some tokens to the user
        await token.transfer(user.address, ethers.utils.parseEther("1000"), { gasLimit: 3000000 })
        console.log("Transferred 1000 tokens to user:", user.address)

        // Deploy the locker contract
        const AdvancedERC20Locker = await ethers.getContractFactory("AdvancedERC20Locker")
        locker = await AdvancedERC20Locker.deploy(token.address, feeRecipient.address, penaltyFee, {
            gasLimit: 3000000,
        })
        await locker.deployed()
        console.log("AdvancedERC20Locker deployed at:", locker.address)
    })

    it("should lock tokens", async function () {
        const amount = ethers.utils.parseEther("100")
        const lockTime = 60 * 60 * 24 // 1 day

        await token.connect(user).approve(locker.address, amount, { gasLimit: 3000000 })
        console.log("User approved locker to spend:", amount.toString())

        await locker.connect(user).lockTokens(amount, lockTime, { gasLimit: 3000000 })
        console.log("User locked tokens:", amount.toString(), "for", lockTime, "seconds")

        const lockInfo = await locker.getLockInfo(user.address, { gasLimit: 3000000 })
        expect(lockInfo.amount).to.equal(amount)
        expect(lockInfo.unlockTime).to.be.above(0)
    })

    it("should unlock tokens after the lock period", async function () {
        const lockInfo = await locker.getLockInfo(user.address, { gasLimit: 3000000 })
        const unlockTime = lockInfo.unlockTime.toNumber()

        // Fast forward time
        await ethers.provider.send("evm_increaseTime", [unlockTime + 1])
        await ethers.provider.send("evm_mine", [])
        console.log("Fast forwarded time to unlock tokens")

        await locker.connect(user).unlockTokens({ gasLimit: 3000000 })
        console.log("User unlocked tokens")

        const lockInfoAfter = await locker.getLockInfo(user.address, { gasLimit: 3000000 })
        expect(lockInfoAfter.amount).to.equal(0)
        expect(lockInfoAfter.unlockTime).to.equal(0)
    })

    it("should extend lock period", async function () {
        const amount = ethers.utils.parseEther("100")
        const lockTime = 60 * 60 * 24 // 1 day

        await token.connect(user).approve(locker.address, amount, { gasLimit: 3000000 })
        console.log("User approved locker to spend:", amount.toString())

        await locker.connect(user).lockTokens(amount, lockTime, { gasLimit: 3000000 })
        console.log("User locked tokens:", amount.toString(), "for", lockTime, "seconds")

        const additionalTime = 60 * 60 * 24 // 1 more day
        await locker.connect(user).extendLock(additionalTime, { gasLimit: 3000000 })
        console.log("User extended lock period by:", additionalTime, "seconds")

        const blockTimestamp = (await ethers.provider.getBlock("latest")).timestamp
        const lockInfo = await locker.getLockInfo(user.address, { gasLimit: 3000000 })
        expect(lockInfo.unlockTime).to.be.above(blockTimestamp + lockTime)
    })

    it("should emergency unlock tokens with penalty", async function () {
        const amount = ethers.utils.parseEther("100")
        const lockTime = 60 * 60 * 24 // 1 day

        await token.connect(user).approve(locker.address, amount, { gasLimit: 3000000 })
        console.log("User approved locker to spend:", amount.toString())

        await locker.connect(user).lockTokens(amount, lockTime, { gasLimit: 3000000 })
        console.log("User locked tokens:", amount.toString(), "for", lockTime, "seconds")

        await locker.emergencyUnlock(user.address, { gasLimit: 3000000 })
        console.log("User performed emergency unlock")

        const penalty = amount.mul(penaltyFee).div(100)
        const amountAfterPenalty = amount.sub(penalty)

        const userBalance = await token.balanceOf(user.address, { gasLimit: 3000000 })
        const feeRecipientBalance = await token.balanceOf(feeRecipient.address, {
            gasLimit: 3000000,
        })

        expect(userBalance).to.equal(amountAfterPenalty)
        expect(feeRecipientBalance).to.equal(penalty)
    })

    it("should change fee recipient", async function () {
        const newRecipient = owner.address
        await locker.changeFeeRecipient(newRecipient, { gasLimit: 3000000 })
        console.log("Changed fee recipient to:", newRecipient)

        const feeRecipient = await locker.feeRecipient({ gasLimit: 3000000 })
        expect(feeRecipient).to.equal(newRecipient)
    })

    it("should change penalty fee", async function () {
        const newPenaltyFee = 10 // 10%
        await locker.changePenaltyFee(newPenaltyFee, { gasLimit: 3000000 })
        console.log("Changed penalty fee to:", newPenaltyFee)

        const penaltyFee = await locker.penaltyFee({ gasLimit: 3000000 })
        expect(penaltyFee).to.equal(newPenaltyFee)
    })

    it("should batch lock tokens", async function () {
        const users = [user.address, owner.address]
        const amounts = [ethers.utils.parseEther("100"), ethers.utils.parseEther("200")]
        const lockTime = 60 * 60 * 24 // 1 day

        await token.approve(locker.address, ethers.utils.parseEther("300"), { gasLimit: 3000000 })
        console.log("Approved locker to spend 300 tokens for batch lock")

        await locker.batchLockTokens(users, amounts, lockTime, { gasLimit: 3000000 })
        console.log(
            "Batch locked tokens for users:",
            users,
            "with amounts:",
            amounts,
            "for",
            lockTime,
            "seconds"
        )

        const lockInfoUser = await locker.getLockInfo(user.address, { gasLimit: 3000000 })
        const lockInfoOwner = await locker.getLockInfo(owner.address, { gasLimit: 3000000 })

        expect(lockInfoUser.amount).to.equal(amounts[0])
        expect(lockInfoOwner.amount).to.equal(amounts[1])
    })

    it("should batch unlock tokens", async function () {
        const users = [user.address, owner.address]

        // Fast forward time
        await ethers.provider.send("evm_increaseTime", [60 * 60 * 24 + 1])
        await ethers.provider.send("evm_mine", [])
        console.log("Fast forwarded time to unlock tokens for batch unlock")

        await locker.batchUnlockTokens(users, { gasLimit: 3000000 })
        console.log("Batch unlocked tokens for users:", users)

        const lockInfoUser = await locker.getLockInfo(user.address, { gasLimit: 3000000 })
        const lockInfoOwner = await locker.getLockInfo(owner.address, { gasLimit: 3000000 })

        expect(lockInfoUser.amount).to.equal(0)
        expect(lockInfoOwner.amount).to.equal(0)
    })

    it("should auto unlock tokens", async function () {
        const amount = ethers.utils.parseEther("100")
        const lockTime = 60 * 60 * 24 // 1 day

        await token.connect(user).approve(locker.address, amount, { gasLimit: 3000000 })
        console.log("User approved locker to spend:", amount.toString())

        await locker.connect(user).lockTokens(amount, lockTime, { gasLimit: 3000000 })
        console.log("User locked tokens:", amount.toString(), "for", lockTime, "seconds")

        // Fast forward time
        await ethers.provider.send("evm_increaseTime", [60 * 60 * 24 + 1])
        await ethers.provider.send("evm_mine", [])
        console.log("Fast forwarded time to auto unlock tokens")

        await locker.autoUnlock(user.address, { gasLimit: 3000000 })
        console.log("Auto unlocked tokens for user:", user.address)

        const lockInfo = await locker.getLockInfo(user.address, { gasLimit: 3000000 })
        expect(lockInfo.amount).to.equal(0)
        expect(lockInfo.unlockTime).to.equal(0)
    })
})
