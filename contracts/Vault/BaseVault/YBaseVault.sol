// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract YBaseVault is Ownable {
    address public mainAsset;
    mapping(address => uint256) public balances;
    mapping(address => uint256) public totalDeposited;
    mapping(address => uint256) public totalWithdrawn;
    mapping(address => uint256) public totalBorrowed;
    mapping(address => uint256) public totalRepaid;

    uint256 public totalDeposits;
    uint256 public totalWithdrawals;
    uint256 public totalBorrows;
    uint256 public totalRepayments;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event Borrowed(address indexed user, uint256 amount);
    event Repaid(address indexed user, uint256 amount);

    constructor(address _mainAsset) {
        mainAsset = _mainAsset;
    }

    function approve(address spender, uint256 amount) internal onlyOwner {
        IERC20(mainAsset).approve(spender, amount);
    }

    function allowance(
        address owner,
        address spender
    ) internal view returns (uint256) {
        return IERC20(mainAsset).allowance(owner, spender);
    }

    function deposit(uint256 amount) internal {
        _beforeDeposit(msg.sender, amount);
        require(
            IERC20(mainAsset).transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        balances[msg.sender] += amount;
        totalDeposited[msg.sender] += amount;
        totalDeposits += amount;
        emit Deposited(msg.sender, amount);
        _afterDeposit(msg.sender, amount);
    }

    function withdraw(uint256 amount) internal {
        _beforeWithdraw(msg.sender, amount);
        require(balances[msg.sender] >= amount, "Insufficient balance");
        require(
            IERC20(mainAsset).balanceOf(address(this)) >= amount,
            "Contract balance is insufficient"
        );
        balances[msg.sender] -= amount;
        totalWithdrawn[msg.sender] += amount;
        totalWithdrawals += amount;
        require(
            IERC20(mainAsset).transfer(msg.sender, amount),
            "Transfer failed"
        );
        emit Withdrawn(msg.sender, amount);
        _afterWithdraw(msg.sender, amount);
    }

    function borrow(uint256 amount) internal onlyOwner {
        _beforeBorrow(msg.sender, amount);
        require(
            IERC20(mainAsset).balanceOf(address(this)) >= amount,
            "Contract balance is insufficient"
        );
        require(
            IERC20(mainAsset).transfer(msg.sender, amount),
            "Transfer failed"
        );
        totalBorrowed[msg.sender] += amount;
        totalBorrows += amount;
        emit Borrowed(msg.sender, amount);
        _afterBorrow(msg.sender, amount);
    }

    function _repay(uint256 amount) internal {
        _beforeRepay(msg.sender, amount);
        require(
            totalBorrowed[msg.sender] >= amount,
            "Repay amount exceeds borrowed amount"
        );
        require(
            IERC20(mainAsset).transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        totalRepaid[msg.sender] += amount;
        totalRepayments += amount;
        emit Repaid(msg.sender, amount);
        _afterRepay(msg.sender, amount);
    }
    function _beforeDeposit(address user, uint256 amount) internal virtual {}
    function _afterDeposit(address user, uint256 amount) internal virtual {}
    function _beforeWithdraw(address user, uint256 amount) internal virtual {}
    function _afterWithdraw(address user, uint256 amount) internal virtual {}
    function _beforeBorrow(address user, uint256 amount) internal virtual {}
    function _afterBorrow(address user, uint256 amount) internal virtual {}
    function _beforeRepay(address user, uint256 amount) internal virtual {}
    function _afterRepay(address user, uint256 amount) internal virtual {}
}
