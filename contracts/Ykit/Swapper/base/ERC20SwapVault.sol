// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract Pausable is Ownable {
    event Paused(address account);
    event Unpaused(address account);

    bool private _paused;

    constructor() {
        _paused = false;
    }

    function paused() public view virtual returns (bool) {
        return _paused;
    }

    modifier whenNotPaused() {
        require(!paused(), "Pausable: paused");
        _;
    }

    modifier whenPaused() {
        require(paused(), "Pausable: not paused");
        _;
    }

    function pause() public virtual onlyOwner whenNotPaused {
        _paused = true;
        emit Paused(msg.sender);
    }

    function unpause() public virtual onlyOwner whenPaused {
        _paused = false;
        emit Unpaused(msg.sender);
    }
}

contract ERC20SwapVault is Ownable, Pausable {
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

    function deposit(address token, uint256 amount) external whenNotPaused {
        require(amount > 0, "Amount must be greater than 0");
        require(
            token == address(baseToken) || token == address(quoteToken),
            "Invalid token"
        );

        if (token == address(baseToken)) {
            uint256 allowance = baseToken.allowance(msg.sender, address(this));
            require(allowance >= amount, "Check the token allowance");
            require(
                baseToken.transferFrom(msg.sender, address(this), amount),
                "Token transfer failed"
            );
            baseDeposits[msg.sender] += amount;
        } else {
            uint256 allowance = quoteToken.allowance(msg.sender, address(this));
            require(allowance >= amount, "Check the token allowance");
            require(
                quoteToken.transferFrom(msg.sender, address(this), amount),
                "Token transfer failed"
            );
            quoteDeposits[msg.sender] += amount;
        }

        emit Deposited(msg.sender, token, amount);
    }

    function withdraw(address token, uint256 amount) external whenNotPaused {
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
