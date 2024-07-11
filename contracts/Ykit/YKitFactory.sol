// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ContractFactory/ContractFactory.sol";
import "./Escrow/AdvancedEscrow.sol";
import "./Locker/AdvancedERC20Locker.sol";
import "./Locker/ETHLocker.sol";
import "./Stake/StakingContract.sol";
import "./Tokens/WrappedToken/ERC20WrappedToken.sol";
import "./Tokens/WrappedToken/WrappedTokenFactory.sol";
import "./Wallets/OffChain/OffChainMultiSigWallet.sol";
import "./Wallets/OnChain/OnChainMultiSigWallet.sol";

contract YKitFactory is Ownable {
    ContractFactory public _ContractFactory;
    AdvancedEscrow public _AdvancedEscrow;
    AdvancedERC20Locker public _AdvancedERC20Locker;
    ETHLocker public _ETHLocker;
    StakingContract public _StakingContract;
    WrappedTokenFactory public _WrappedTokenFactory;

    constructor() Ownable(msg.sender) {}

    function createNewContractFactory(
        address owner
    ) external returns (address) {
        require(owner != address(0), "Invalid owner address");

        ContractFactory newContractFactory = new ContractFactory();
        newContractFactory.transferOwnership(owner);

        _ContractFactory = newContractFactory;

        return address(newContractFactory);
    }

    function createNewAdvancedEscrow(
        address owner,
        address depositToken,
        uint256 minDepositAmount
    ) external returns (address) {
        require(owner != address(0), "Invalid owner address");
        require(depositToken != address(0), "Invalid token address");
        require(
            minDepositAmount > 0,
            "Minimum deposit amount must be greater than zero"
        );

        AdvancedEscrow newAdvancedEscrow = new AdvancedEscrow(
            depositToken,
            minDepositAmount
        );
        newAdvancedEscrow.transferOwnership(owner);

        _AdvancedEscrow = newAdvancedEscrow;

        return address(newAdvancedEscrow);
    }

    function createNewAdvancedERC20Locker(
        address owner,
        address token,
        address feeRecipient,
        uint256 penaltyFee
    ) external returns (address) {
        require(owner != address(0), "Invalid owner address");
        require(token != address(0), "Invalid token address");
        require(feeRecipient != address(0), "Invalid fee recipient address");
        require(penaltyFee <= 100, "Penalty fee must be between 0 and 100");

        AdvancedERC20Locker newAdvancedERC20Locker = new AdvancedERC20Locker(
            token,
            feeRecipient,
            penaltyFee
        );
        newAdvancedERC20Locker.transferOwnership(owner);

        _AdvancedERC20Locker = newAdvancedERC20Locker;

        return address(newAdvancedERC20Locker);
    }

    function createNewETHLocker(address owner) external returns (address) {
        require(owner != address(0), "Invalid owner address");

        ETHLocker newETHLocker = new ETHLocker();
        newETHLocker.transferOwnership(owner);

        return address(newETHLocker);
    }

    function createNewStakingContract(
        address owner,
        address stakingToken,
        uint256 dailyRewardRate,
        uint256 weeklyRewardRate,
        uint256 monthlyRewardRate
    ) external returns (address) {
        require(owner != address(0), "Invalid owner address");
        require(stakingToken != address(0), "Invalid staking token address");
        require(
            dailyRewardRate > 0,
            "Daily reward rate must be greater than zero"
        );
        require(
            weeklyRewardRate > 0,
            "Weekly reward rate must be greater than zero"
        );
        require(
            monthlyRewardRate > 0,
            "Monthly reward rate must be greater than zero"
        );

        StakingContract newStakingContract = new StakingContract(
            stakingToken,
            dailyRewardRate,
            weeklyRewardRate,
            monthlyRewardRate
        );
        newStakingContract.transferOwnership(owner);

        return address(newStakingContract);
    }

    function createNewERC20WrappedToken(
        address owner,
        string memory name,
        string memory symbol,
        uint8 decimals,
        IERC20 underlying
    ) external returns (address) {
        require(owner != address(0), "Invalid owner address");
        require(
            address(underlying) != address(0),
            "Invalid underlying token address"
        );

        ERC20WrappedToken newERC20WrappedToken = new ERC20WrappedToken();
        newERC20WrappedToken.initialize(name, symbol, decimals, underlying);
        newERC20WrappedToken.transferOwnership(owner);

        return address(newERC20WrappedToken);
    }

    function createNewWrappedTokenFactory(
        address owner,
        address wrappedTokenImplementation
    ) external returns (address) {
        require(owner != address(0), "Invalid owner address");
        require(
            wrappedTokenImplementation != address(0),
            "Invalid wrapped token implementation address"
        );

        WrappedTokenFactory newWrappedTokenFactory = new WrappedTokenFactory(
            wrappedTokenImplementation
        );
        newWrappedTokenFactory.transferOwnership(owner);

        return address(newWrappedTokenFactory);
    }

    function createNewOffChainMultiSigWallet(
        uint256 threshold,
        address[] memory owners
    ) external returns (address) {
        require(owners.length > 0, "Owners required");
        require(
            threshold > 0 && threshold <= owners.length,
            "Invalid threshold"
        );

        OffChainMultiSigWallet newOffChainMultiSigWallet = new OffChainMultiSigWallet(
                threshold,
                owners
            );

        return address(newOffChainMultiSigWallet);
    }

    function createNewOnChainMultiSigWallet(
        uint256 threshold,
        address[] memory owners
    ) external returns (address) {
        OnChainMultiSigWallet newOnChainMultiSigWallet = new OnChainMultiSigWallet(
                owners,
                threshold
            );

        return address(newOnChainMultiSigWallet);
    }
}
