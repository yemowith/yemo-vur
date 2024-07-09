import { expect } from "chai"
import { ethers } from "hardhat"

describe("ETHLocker", function () {
    let owner: any
    let user: any
    let locker: any

    before(async function () {
        ;[owner, user] = await ethers.getSigners()

        const ETHLocker = await ethers.getContractFactory("ETHLocker")
        locker = await ETHLocker.deploy({ gasLimit: 300000000 })
        await locker.deployed()
        console.log("ETHLocker deployed at:", locker.address)
    })

    it("should lock ETH", async function () {
        const lockTime = 60 * 60 * 24 // 1 day
        const amount = ethers.utils.parseEther("1")

        await locker.connect(user).lockETH(lockTime, { value: amount, gasLimit: 300000000 })
        console.log("User locked ETH:", amount.toString(), "for", lockTime, "seconds")

        const lockInfo = await locker.getLockInfo(user.address)
        expect(lockInfo.amount).to.equal(amount)
        expect(lockInfo.unlockTime).to.be.above(0)
    })

    it("should unlock ETH after the lock period", async function () {
        // Lock ETH before unlocking
        const lockTime = 60 * 60 * 24 // 1 day
        const amount = ethers.utils.parseEther("1")
        await locker.connect(user).lockETH(lockTime, { value: amount, gasLimit: 300000000 })
        console.log("User locked ETH:", amount.toString(), "for", lockTime, "seconds")

        const lockInfo = await locker.getLockInfo(user.address)
        const unlockTime = lockInfo.unlockTime.toNumber()

        // Fast forward time
        await ethers.provider.send("evm_increaseTime", [unlockTime + 1])
        await ethers.provider.send("evm_mine", [])
        console.log("Fast forwarded time to unlock ETH")

        const userBalanceBefore = await ethers.provider.getBalance(user.address)

        const tx = await locker.connect(user).unlockETH({ gasLimit: 300000000 })
        const receipt = await tx.wait()
        const gasUsed = receipt.cumulativeGasUsed.mul(receipt.effectiveGasPrice)

        const userBalanceAfter = await ethers.provider.getBalance(user.address)
        expect(userBalanceAfter).to.equal(userBalanceBefore.add(lockInfo.amount).sub(gasUsed))
        console.log(
            "User unlocked ETH. Balance before:",
            userBalanceBefore.toString(),
            "Balance after:",
            userBalanceAfter.toString()
        )

        const lockInfoAfter = await locker.getLockInfo(user.address)
        expect(lockInfoAfter.amount).to.equal(0)
        expect(lockInfoAfter.unlockTime).to.equal(0)
    })

    it("should extend lock period", async function () {
        // Lock ETH before extending lock period
        const lockTime = 60 * 60 * 24 // 1 day
        const amount = ethers.utils.parseEther("1")
        await locker.connect(user).lockETH(lockTime, { value: amount, gasLimit: 300000000 })
        console.log("User locked ETH:", amount.toString(), "for", lockTime, "seconds")

        const additionalTime = 60 * 60 * 24 // 1 more day
        await locker.connect(user).extendLock(additionalTime, { gasLimit: 300000000 })
        console.log("User extended lock period by:", additionalTime, "seconds")
        const blockNumber = await ethers.provider.getBlockNumber()
        const block = await ethers.provider.getBlock(blockNumber)

        const lockInfo = await locker.getLockInfo(user.address)
        const currentBlock = await ethers.provider.getBlock("latest")
        expect(lockInfo.unlockTime).to.be.above(currentBlock.timestamp + lockTime)
    })

    it("should emergency unlock ETH", async function () {
        // Lock ETH before emergency unlocking
        const lockTime = 60 * 60 * 24 // 1 day
        const amount = ethers.utils.parseEther("1")
        await locker.connect(user).lockETH(lockTime, { value: amount, gasLimit: 300000000 })
        console.log("User locked ETH:", amount.toString(), "for", lockTime, "seconds")

        const userBalanceBefore = await ethers.provider.getBalance(user.address)

        const tx = await locker.emergencyUnlock(user.address, { gasLimit: 300000000 })
        const receipt = await tx.wait()
        const gasUsed = receipt.cumulativeGasUsed.mul(receipt.effectiveGasPrice)

        const userBalanceAfter = await ethers.provider.getBalance(user.address)
        expect(userBalanceAfter).to.equal(userBalanceBefore.add(amount.toNumber()).sub(gasUsed))
        console.log(
            "Emergency unlocked ETH for user. Balance before:",
            userBalanceBefore.toString(),
            "Balance after:",
            userBalanceAfter.toString()
        )

        const lockInfoAfter = await locker.getLockInfo(user.address)
        expect(lockInfoAfter.amount).to.equal(0)
        expect(lockInfoAfter.unlockTime).to.equal(0)
    })

    it("should revert lock if already locked", async function () {
        const lockTime = 60 * 60 * 24 // 1 day
        const amount = ethers.utils.parseEther("1")

        await locker.connect(user).lockETH(lockTime, { value: amount, gasLimit: 300000000 })
        console.log("User locked ETH:", amount.toString(), "for", lockTime, "seconds")

        await expect(
            locker.connect(user).lockETH(lockTime, { value: amount, gasLimit: 300000000 })
        ).to.be.revertedWith("ETH already locked")
        console.log("Reverted lock attempt as ETH is already locked")
    })

    it("should revert unlock if no ETH locked", async function () {
        await expect(locker.connect(owner).unlockETH({ gasLimit: 300000000 })).to.be.revertedWith(
            "No ETH locked"
        )
        console.log("Reverted unlock attempt as no ETH is locked")
    })

    it("should revert emergency unlock if no ETH locked", async function () {
        await expect(
            locker.emergencyUnlock(owner.address, { gasLimit: 300000000 })
        ).to.be.revertedWith("No ETH locked")
        console.log("Reverted emergency unlock attempt as no ETH is locked")
    })
})
