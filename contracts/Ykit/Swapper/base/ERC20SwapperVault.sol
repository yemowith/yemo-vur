// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20Vault is Ownable {
    IERC20 public baseToken;
    IERC20 public quoteToken;

    mapping(address => uint256) public baseDeposits;
    mapping(address => uint256) public quoteDeposits;

    event Deposited(
        address indexed user,
        address indexed token,
        uint256 amount
    );
    event Withdrawn(
        address indexed user,
        address indexed token,
        uint256 amount
    );

    constructor(address _baseToken, address _quoteToken) Ownable(msg.sender) {
        require(
            _baseToken != address(0) && _quoteToken != address(0),
            "Invalid token address"
        );
        baseToken = IERC20(_baseToken);
        quoteToken = IERC20(_quoteToken);
    }

    function deposit(address token, uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(
            token == address(baseToken) || token == address(quoteToken),
            "Invalid token"
        );

        if (token == address(baseToken)) {
            require(
                baseToken.transferFrom(msg.sender, address(this), amount),
                "Token transfer failed"
            );
            baseDeposits[msg.sender] += amount;
        } else {
            require(
                quoteToken.transferFrom(msg.sender, address(this), amount),
                "Token transfer failed"
            );
            quoteDeposits[msg.sender] += amount;
        }

        emit Deposited(msg.sender, token, amount);
    }

    function withdraw(address token, uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(
            token == address(baseToken) || token == address(quoteToken),
            "Invalid token"
        );

        if (token == address(baseToken)) {
            require(baseDeposits[msg.sender] >= amount, "Insufficient balance");
            baseDeposits[msg.sender] -= amount;
            require(
                baseToken.transfer(msg.sender, amount),
                "Token transfer failed"
            );
        } else {
            require(
                quoteDeposits[msg.sender] >= amount,
                "Insufficient balance"
            );
            quoteDeposits[msg.sender] -= amount;
            require(
                quoteToken.transfer(msg.sender, amount),
                "Token transfer failed"
            );
        }

        emit Withdrawn(msg.sender, token, amount);
    }

    function getDeposit(
        address token,
        address user
    ) external view returns (uint256) {
        if (token == address(baseToken)) {
            return baseDeposits[user];
        } else if (token == address(quoteToken)) {
            return quoteDeposits[user];
        } else {
            return 0;
        }
    }
}
