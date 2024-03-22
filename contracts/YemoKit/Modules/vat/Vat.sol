// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "../../Helpers/Onlntd.sol";
import "../../YemoKit.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface IVat {
    function deposit(address token, uint256 amount) external;
    function withdraw(address token, uint256 amount, address receiver) external;
    function withdrawWETH(uint256 amount) external;
    function init(address _owner, address _yk) external;
}

contract Vat is Onl {
    using SafeERC20 for IERC20;

    address public weth; // WETH address

    address public yka; // YemoKit address
    IYemoKit public yk = IYemoKit(yka); // WETH address

    constructor() {}

    function init(address _owner, address _yk) external returns (bool) {
        owner = _owner;
        yka = _yk;
        weth = yk.getWETH();
        intd = true;

        return true;
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
