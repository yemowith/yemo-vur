// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "../../Onlntd.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Vat is Onlntd {
    using SafeERC20 for IERC20;

    address public owner;
    address public yk; // YemoKit address
    address public weth;

    constructor() {}

    function init(address _owner, address _yk, address _weth) external {
        owner = _owner;
        yk = _yk;
        weth = _weth;
        intd = true;
    }

    // Deposit ETH and wrap it to WETH
    receive() external payable {
        //require(msg.sender == tx.origin, "Only EOA allowed");
        IWETH(weth).deposit{value: msg.value}();
    }

    // Deposit ERC20 tokens
    function deposit(address token, uint256 amount) external {
        require(token != weth, "WETH cannot be deposited directly");
        require(
            IERC20(token).allowance(msg.sender, address(this)) >= amount,
            "Allowance not enough"
        );
        IERC20(token).transferFrom(msg.sender, address(this), amount);
    }

    // Withdraw ERC20 tokens
    function withdraw(
        address token,
        uint256 amount,
        address receiver
    ) external {
        require(token != weth, "Use unwrap function to withdraw WETH");
        require(
            IERC20(token).allowance(msg.sender, address(this)) >= amount,
            "Allowance not enough"
        );
        IERC20(token).transfer(receiver, amount);
    }

    // Withdraw WETH and unwrap it to ETH
    function withdrawWETH(uint256 amount) external {
        require(
            IERC20(weth).allowance(address(this), address(weth)) >= amount,
            "Allowance not enough"
        );
        IWETH(weth).withdraw(amount);
        payable(msg.sender).transfer(amount);
    }
}

interface IWETH {
    function deposit() external payable;
    function withdraw(uint256) external;
}
