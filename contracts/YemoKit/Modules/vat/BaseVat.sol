// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "../../Helpers/Onlntd.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface IBaseVat {
    function deposit(address token, uint256 amount) external;
    function withdraw(address token, uint256 amount, address receiver) external;
    function withdrawWETH(uint256 amount) external;
}

contract BaseVat {
    using SafeERC20 for IERC20;

    address public weth; // WETH address

    // Deposit ETH and wrap it to WETH
    receive() external payable {}

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
}

interface IWETH {
    function deposit() external payable;
    function withdraw(uint256) external;
}
