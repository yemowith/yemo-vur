import { expect } from "chai"
import { ethers } from "hardhat"

describe("StakingContract", function () {
    let owner: any
    let user: any
    let stakingToken: any
    let stakingContract: any

    const initialSupply = ethers.utils.parseEther("1000000")
    const dailyRewardRate = ethers.utils.parseEther("0.1") // 0.1 token per day
    const weeklyRewardRate = ethers.utils.parseEther("0.7") // 0.7 token per week
    const monthlyRewardRate = ethers.utils.parseEther("3") // 3 tokens per month

    before(async function () {
        ;[owner, user] = await ethers.getSigners()

        // Deploy ERC20 token
        const ERC20Token = await ethers.getContractFactory("ERC20Token") // Assuming an ERC20 implementation named ERC20Token
        stakingToken = await ERC20Token.deploy("StakingToken", "STK", owner.address)
        await stakingToken.deployed()
        console.log("ERC20 token deployed at:", stakingToken.address)

        // Mint additional tokens to the owner address
        await stakingToken.mint(owner.address, initialSupply, { gasLimit: 3000000 })
        console.log("Minted initial supply to owner:", initialSupply.toString())

        // Distribute some tokens to the user
        await stakingToken.transfer(user.address, ethers.utils.parseEther("1000"), {
            gasLimit: 3000000,
        })
        console.log("Transferred 1000 tokens to user:", user.address)

        // Deploy the staking contract
        const StakingContract = await ethers.getContractFactory("StakingContract")
        stakingContract = await StakingContract.deploy(
            stakingToken.address,
            dailyRewardRate,
            weeklyRewardRate,
            monthlyRewardRate,
            { gasLimit: 3000000 }
        )
        await stakingContract.deployed()
        console.log("StakingContract deployed at:", stakingContract.address)
    })

    it("should allow staking tokens", async function () {
        const amount = ethers.utils.parseEther("100")
        await stakingToken
            .connect(user)
            .approve(stakingContract.address, amount, { gasLimit: 3000000 })
        console.log("User approved staking contract to spend:", amount.toString())

        await stakingContract.connect(user).stake(amount, 1, { gasLimit: 3000000 }) // 1 for Weekly
        console.log("User staked tokens:", amount.toString(), "for Weekly period")

        const stakeInfo = await stakingContract.stakes(user.address, { gasLimit: 3000000 })
        expect(stakeInfo.amount).to.equal(amount)
        expect(stakeInfo.staked).to.be.true
        console.log("Stake info:", stakeInfo)
    })

    it("should calculate rewards correctly", async function () {
        const stakeInfo = await stakingContract.stakes(user.address, { gasLimit: 3000000 })
        const stakingPeriod = 7 * 24 * 60 * 60 // 1 week in seconds
        await ethers.provider.send("evm_increaseTime", [stakingPeriod])
        await ethers.provider.send("evm_mine", [])
        console.log("Increased time by 1 week")

        const reward = await stakingContract.calculateReward(user.address, { gasLimit: 3000000 })
        const expectedReward = stakeInfo.amount
            .mul(weeklyRewardRate)
            .div(ethers.utils.parseEther("1"))
        expect(reward).to.equal(expectedReward)
        console.log(
            "Calculated reward:",
            reward.toString(),
            "Expected reward:",
            expectedReward.toString()
        )
    })

    it("should allow unstaking tokens", async function () {
        const stakeInfo = await stakingContract.stakes(user.address, { gasLimit: 3000000 })
        const userBalanceBefore = await stakingToken.balanceOf(user.address, { gasLimit: 3000000 })
        console.log("User balance before unstaking:", userBalanceBefore.toString())

        await stakingContract.connect(user).unstake({ gasLimit: 3000000 })
        console.log("User unstaked tokens")

        const userBalanceAfter = await stakingToken.balanceOf(user.address, { gasLimit: 3000000 })
        const stakeInfoAfter = await stakingContract.stakes(user.address, { gasLimit: 3000000 })

        expect(userBalanceAfter).to.equal(userBalanceBefore.add(stakeInfo.amount))
        expect(stakeInfoAfter.amount).to.equal(0)
        expect(stakeInfoAfter.staked).to.be.false
        console.log("User balance after unstaking:", userBalanceAfter.toString())
        console.log("Stake info after unstaking:", stakeInfoAfter)
    })

    it("should allow withdrawing rewards", async function () {
        const amount = ethers.utils.parseEther("100")
        await stakingToken
            .connect(user)
            .approve(stakingContract.address, amount, { gasLimit: 3000000 })
        console.log("User approved staking contract to spend:", amount.toString())

        await stakingContract.connect(user).stake(amount, 1, { gasLimit: 3000000 }) // 1 for Weekly
        console.log("User staked tokens:", amount.toString(), "for Weekly period")

        const stakingPeriod = 7 * 24 * 60 * 60 // 1 week in seconds
        await ethers.provider.send("evm_increaseTime", [stakingPeriod])
        await ethers.provider.send("evm_mine", [])
        console.log("Increased time by 1 week")

        await stakingContract.connect(user).unstake({ gasLimit: 3000000 })
        console.log("User unstaked tokens")

        const userBalanceBefore = await stakingToken.balanceOf(user.address, { gasLimit: 3000000 })
        console.log("User balance before withdrawing rewards:", userBalanceBefore.toString())

        await stakingContract.connect(user).withdrawRewards({ gasLimit: 3000000 })
        console.log("User withdrew rewards")

        const userBalanceAfter = await stakingToken.balanceOf(user.address, { gasLimit: 3000000 })
        const expectedReward = amount.mul(weeklyRewardRate).div(stakingPeriod)
        expect(userBalanceAfter).to.equal(userBalanceBefore.add(expectedReward))
        console.log("User balance after withdrawing rewards:", userBalanceAfter.toString())
        console.log("Expected reward:", expectedReward.toString())
    })

    it("should set reward rates", async function () {
        const newDailyRewardRate = ethers.utils.parseEther("0.2")
        const newWeeklyRewardRate = ethers.utils.parseEther("1.4")
        const newMonthlyRewardRate = ethers.utils.parseEther("6")

        await stakingContract.setRewardRates(
            newDailyRewardRate,
            newWeeklyRewardRate,
            newMonthlyRewardRate,
            { gasLimit: 3000000 }
        )
        console.log("Set new reward rates:", {
            daily: newDailyRewardRate.toString(),
            weekly: newWeeklyRewardRate.toString(),
            monthly: newMonthlyRewardRate.toString(),
        })

        expect(await stakingContract.dailyRewardRate({ gasLimit: 3000000 })).to.equal(
            newDailyRewardRate
        )
        expect(await stakingContract.weeklyRewardRate({ gasLimit: 3000000 })).to.equal(
            newWeeklyRewardRate
        )
        expect(await stakingContract.monthlyRewardRate({ gasLimit: 3000000 })).to.equal(
            newMonthlyRewardRate
        )
    })

    it("should revert if trying to stake when already staked", async function () {
        const amount = ethers.utils.parseEther("100")
        await stakingToken
            .connect(user)
            .approve(stakingContract.address, amount, { gasLimit: 3000000 })
        console.log("User approved staking contract to spend:", amount.toString())

        await stakingContract.connect(user).stake(amount, 1, { gasLimit: 3000000 }) // 1 for Weekly
        console.log("User staked tokens:", amount.toString(), "for Weekly period")

        await expect(
            stakingContract.connect(user).stake(amount, 1, { gasLimit: 3000000 })
        ).to.be.revertedWith("Already staked")
        console.log("Reverted staking when already staked")
    })

    it("should revert if trying to unstake before period ends", async function () {
        await expect(
            stakingContract.connect(user).unstake({ gasLimit: 3000000 })
        ).to.be.revertedWith("Staking period not yet ended")
        console.log("Reverted unstaking before period ends")
    })

    it("should revert if trying to withdraw rewards with none available", async function () {
        await expect(
            stakingContract.connect(user).withdrawRewards({ gasLimit: 3000000 })
        ).to.be.revertedWith("No rewards available")
        console.log("Reverted withdrawing rewards with none available")
    })
})
