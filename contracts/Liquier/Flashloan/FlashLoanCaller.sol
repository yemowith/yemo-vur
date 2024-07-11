// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./FlashLoanContract.sol";

contract FlashLoanCaller is Ownable {
    using SafeERC20 for IERC20;

    FlashLoanContract private flashLoanContract;
    address public addressProvider;

    mapping(address => bool) public tokenRegistry;

    event TokenAdded(address indexed token);
    event TokenRemoved(address indexed token);

    constructor(address _addressProvider) Ownable(msg.sender) {
        addressProvider = _addressProvider;
        flashLoanContract = new FlashLoanContract(_addressProvider);
    }

    function addToken(address token) external onlyOwner {
        require(token != address(0), "Invalid token address");
        tokenRegistry[token] = true;
        emit TokenAdded(token);
    }

    function removeToken(address token) external onlyOwner {
        require(tokenRegistry[token], "Token not in registry");
        delete tokenRegistry[token];
        emit TokenRemoved(token);
    }

    function initiateFlashLoan(
        address token,
        uint256 amount,
        bytes calldata data
    ) external onlyOwner {
        require(tokenRegistry[token], "Token not registered");

        // Transfer the tokens to the FlashLoanContract if needed
        IERC20(token).safeTransfer(address(flashLoanContract), amount);

        // Call the requestFlashLoan function of FlashLoanContract
        flashLoanContract.requestFlashLoan(token, amount, data);
    }
}
