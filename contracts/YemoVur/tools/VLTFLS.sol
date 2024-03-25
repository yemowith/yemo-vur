// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";
import "../Ykit/imprt.sol";

interface IWETH2 {
    function deposit() external payable;
    function withdraw(uint256) external;

    function transfer(address dst, uint wad) external returns (bool);
}

interface IVLTFLS {
    function fn_RequestFlashLoan(
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
    function deposit(address token, uint256 amount) external;
    function withdraw(address token, uint256 amount, address receiver) external;
    function start(address token, uint256 amount) external;
}

abstract contract YF is FlashLoanSimpleReceiverBase {
    address payable owner;

    constructor(
        address _addressProvider
    ) FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_addressProvider)) {}

    function fn_RequestFlashLoan(address _token, uint256 _amount) public {
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

    //This function is called after your contract has received the flash loaned amount

    function aterFl(uint256 _amount) internal returns (bool) {
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

        aterFl(totalAmount);

        return true;
    }
}

contract VLTFLS is YF, WYK {
    event ERC20Deposited(
        address indexed token,
        address indexed sender,
        uint256 amount
    );
    event ERC20Withdrawn(
        address indexed token,
        address indexed receiver,
        uint256 amount
    );
    event FlashLoanStarted(address indexed token, uint256 amount);

    constructor(
        address _addressProvider,
        address _adrsb
    ) YF(_addressProvider) WYK(_adrsb) {
        adrsb = _adrsb;
    }

    receive() external payable {}

    // ERC20 token yatırma
    function deposit(address token, uint256 amount) external returns (bool) {
        require(
            IERC20(token).allowance(msg.sender, address(this)) >= amount,
            "Allowance not enough"
        );
        require(
            IERC20(token).transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        emit ERC20Deposited(token, msg.sender, amount);
        return true;
    }

    // ERC20 token çekme
    function withdraw(
        address token,
        uint256 amount,
        address receiver
    ) external returns (bool) {
        require(
            IERC20(token).allowance(msg.sender, address(this)) >= amount,
            "Allowance not enough"
        );
        require(IERC20(token).transfer(receiver, amount), "Transfer failed");
        emit ERC20Withdrawn(token, receiver, amount);
        return true;
    }

    // Flash loan başlatma
    function _bfrStrt(address _token, uint256 amount) internal returns (bool) {
        require(
            IERC20(_token).balanceOf(address(this)) > 0,
            "Allowance not enough"
        );
        /*
        uint256 _bba = IERC20(_token).balanceOf(address(this));
        uint256 _r = 0.0001  ether;
        if (_bba < _r) {
            IWETH2(WETH_).deposit{value: _r}();
        }
        */
        return true;
    }

    // Flash loan başlatma
    function start(address token, uint256 amount) external returns (bool) {
        _bfrStrt(token, amount);

        fn_RequestFlashLoan(token, amount);

        emit FlashLoanStarted(token, amount);
        return true;
    }
}
