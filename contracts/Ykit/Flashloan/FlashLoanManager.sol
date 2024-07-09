// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";

interface IWETH {
    function deposit() external payable;
    function withdraw(uint256) external;
    function transfer(address dst, uint wad) external returns (bool);
}

interface IFlashLoan {
    function requestFlashLoan(
        address _token,
        uint256 _amount,
        bytes memory params
    ) external;
    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external returns (bool);
    function depositToken(address token, uint256 amount) external;
    function withdrawToken(
        address token,
        uint256 amount,
        address receiver
    ) external;
    function initiateFlashLoan(address token, uint256 amount) external;
}

abstract contract FlashLoanReceiver is FlashLoanSimpleReceiverBase {
    address payable owner;

    constructor(
        address _addressProvider
    ) FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_addressProvider)) {}

    function requestFlashLoan(address _token, uint256 _amount) public {
        address receiverAddress = address(this);
        address asset = _token;
        uint256 amount = _amount;
        uint16 referralCode = 0;

        bytes memory params;

        POOL.flashLoanSimple(
            receiverAddress,
            asset,
            amount,
            params,
            referralCode
        );
    }

    function afterFlashLoan(uint256 _amount) internal virtual returns (bool) {
        return true;
    }

    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        uint256 totalAmount = amount + premium;

        if (
            IERC20(asset).allowance(address(this), address(POOL)) < totalAmount
        ) {
            IERC20(asset).approve(address(POOL), totalAmount);
        }

        afterFlashLoan(totalAmount);

        return true;
    }
}

contract FlashLoanManager is FlashLoanReceiver {
    address weth;
    event TokenDeposited(
        address indexed token,
        address indexed sender,
        uint256 amount
    );
    event TokenWithdrawn(
        address indexed token,
        address indexed receiver,
        uint256 amount
    );
    event FlashLoanInitiated(address indexed token, uint256 amount);

    constructor(
        address _addressProvider,
        address _weth
    ) FlashLoanReceiver(_addressProvider) {
        weth = _weth;
    }

    receive() external payable {}

    function depositToken(
        address token,
        uint256 amount
    ) external returns (bool) {
        require(
            IERC20(token).allowance(msg.sender, address(this)) >= amount,
            "Allowance not enough"
        );
        require(
            IERC20(token).transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        emit TokenDeposited(token, msg.sender, amount);
        return true;
    }

    function withdrawToken(
        address token,
        uint256 amount,
        address receiver
    ) external returns (bool) {
        require(
            IERC20(token).allowance(msg.sender, address(this)) >= amount,
            "Allowance not enough"
        );
        require(IERC20(token).transfer(receiver, amount), "Transfer failed");
        emit TokenWithdrawn(token, receiver, amount);
        return true;
    }

    function beforeFlashLoanStart(
        address _token,
        uint256 amount
    ) internal returns (bool) {
        require(
            IERC20(_token).balanceOf(address(this)) > 0,
            "Balance not enough"
        );

        uint256 balance = IERC20(_token).balanceOf(address(this));
        uint256 requiredBalance = 0.01 ether;
        if (balance < requiredBalance) {
            IWETH(weth).deposit{value: requiredBalance}();
        }

        return true;
    }

    function afterFlashLoan(
        uint256 _amount
    ) internal pure override returns (bool) {
        return true;
    }

    function initiateFlashLoan(
        address token,
        uint256 amount
    ) external returns (bool) {
        beforeFlashLoanStart(token, amount);
        requestFlashLoan(token, amount);
        emit FlashLoanInitiated(token, amount);
        return true;
    }
}
