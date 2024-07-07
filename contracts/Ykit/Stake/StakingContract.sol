// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CustomPausable {
    bool private _paused;
    address private _pauser;

    event Paused(address account);
    event Unpaused(address account);

    constructor() {
        _paused = false;
        _pauser = msg.sender;
    }

    modifier whenNotPaused() {
        require(!_paused, "Pausable: paused");
        _;
    }

    modifier whenPaused() {
        require(_paused, "Pausable: not paused");
        _;
    }

    function paused() public view returns (bool) {
        return _paused;
    }

    function pause() external {
        require(msg.sender == _pauser, "Pausable: not pauser");
        _paused = true;
        emit Paused(msg.sender);
    }

    function unpause() external {
        require(msg.sender == _pauser, "Pausable: not pauser");
        _paused = false;
        emit Unpaused(msg.sender);
    }
}

contract CustomReentrancyGuard {
    bool private _locked;

    modifier nonReentrant() {
        require(!_locked, "ReentrancyGuard: reentrant call");
        _locked = true;
        _;
        _locked = false;
    }
}

contract StakingContract is Ownable, CustomPausable, CustomReentrancyGuard {
    IERC20 public stakingToken;

    enum StakingPeriod {
        Daily,
        Weekly,
        Monthly
    }

    struct Stake {
        uint256 amount;
        uint256 startTime;
        StakingPeriod period;
        bool staked;
    }

    uint256 public dailyRewardRate; // reward per token per day
    uint256 public weeklyRewardRate; // reward per token per week
    uint256 public monthlyRewardRate; // reward per token per month

    mapping(address => Stake) public stakes;
    mapping(address => uint256) public rewards;

    event Staked(address indexed user, uint256 amount, StakingPeriod period);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsWithdrawn(address indexed user, uint256 amount);

    constructor(
        address _stakingToken,
        uint256 _dailyRewardRate,
        uint256 _weeklyRewardRate,
        uint256 _monthlyRewardRate
    ) Ownable(msg.sender) {
        require(_stakingToken != address(0), "Invalid token address");
        stakingToken = IERC20(_stakingToken);
        dailyRewardRate = _dailyRewardRate;
        weeklyRewardRate = _weeklyRewardRate;
        monthlyRewardRate = _monthlyRewardRate;
    }

    function stake(
        uint256 amount,
        StakingPeriod period
    ) external whenNotPaused nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(!stakes[msg.sender].staked, "Already staked");

        require(
            stakingToken.transferFrom(msg.sender, address(this), amount),
            "Token transfer failed"
        );

        stakes[msg.sender] = Stake({
            amount: amount,
            startTime: block.timestamp,
            period: period,
            staked: true
        });

        emit Staked(msg.sender, amount, period);
    }

    function unstake() external whenNotPaused nonReentrant {
        Stake storage userStake = stakes[msg.sender];
        require(userStake.staked, "No active stake");
        require(
            block.timestamp >=
                userStake.startTime + getStakingDuration(userStake.period),
            "Staking period not yet ended"
        );

        uint256 amount = userStake.amount;
        userStake.amount = 0;
        userStake.staked = false;

        uint256 reward = calculateReward(msg.sender);
        rewards[msg.sender] += reward;

        require(
            stakingToken.transfer(msg.sender, amount),
            "Token transfer failed"
        );

        emit Unstaked(msg.sender, amount);
    }

    function withdrawRewards() external whenNotPaused nonReentrant {
        uint256 reward = rewards[msg.sender];
        require(reward > 0, "No rewards available");

        rewards[msg.sender] = 0;

        require(
            stakingToken.transfer(msg.sender, reward),
            "Reward transfer failed"
        );

        emit RewardsWithdrawn(msg.sender, reward);
    }

    function calculateReward(address user) public view returns (uint256) {
        Stake memory userStake = stakes[user];
        if (!userStake.staked) {
            return 0;
        }

        uint256 stakingDuration = getStakingDuration(userStake.period);
        uint256 stakedTime = block.timestamp - userStake.startTime;
        if (stakedTime < stakingDuration) {
            return 0;
        }

        uint256 rewardRate = getRewardRate(userStake.period);
        uint256 reward = (userStake.amount * rewardRate * stakedTime) /
            stakingDuration;

        return reward;
    }

    function getStakingDuration(
        StakingPeriod period
    ) internal pure returns (uint256) {
        if (period == StakingPeriod.Daily) {
            return 1 days;
        } else if (period == StakingPeriod.Weekly) {
            return 7 days;
        } else if (period == StakingPeriod.Monthly) {
            return 30 days;
        } else {
            return 0;
        }
    }

    function getRewardRate(
        StakingPeriod period
    ) internal view returns (uint256) {
        if (period == StakingPeriod.Daily) {
            return dailyRewardRate;
        } else if (period == StakingPeriod.Weekly) {
            return weeklyRewardRate;
        } else if (period == StakingPeriod.Monthly) {
            return monthlyRewardRate;
        } else {
            return 0;
        }
    }

    function setRewardRates(
        uint256 _dailyRewardRate,
        uint256 _weeklyRewardRate,
        uint256 _monthlyRewardRate
    ) external onlyOwner {
        dailyRewardRate = _dailyRewardRate;
        weeklyRewardRate = _weeklyRewardRate;
        monthlyRewardRate = _monthlyRewardRate;
    }
}
