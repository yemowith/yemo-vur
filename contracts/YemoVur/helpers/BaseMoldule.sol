// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract BaseMoldule {
    address public owner;
    bool public paused;

    mapping(address => uint256) private etherBalances;
    mapping(address => mapping(address => uint256)) private tokenBalances; // Kullanıcı adresi -> (Token adresi -> Bakiye)

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "The contract is paused.");
        _;
    }

    constructor() {
        owner = msg.sender;
        paused = false;
    }

    function depositEther() public payable whenNotPaused {
        require(msg.value > 0, "Deposit amount must be greater than zero.");
        etherBalances[msg.sender] += msg.value;
    }

    function withdrawEther(uint256 amount) public whenNotPaused {
        require(amount <= etherBalances[msg.sender], "Insufficient balance.");
        etherBalances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function depositToken(
        address tokenAddress,
        uint256 amount
    ) public whenNotPaused {
        require(amount > 0, "Deposit amount must be greater than zero.");
        IERC20 token = IERC20(tokenAddress);
        require(
            token.transferFrom(msg.sender, address(this), amount),
            "Token transfer failed."
        );
        tokenBalances[msg.sender][tokenAddress] += amount;
    }

    function withdrawToken(
        address tokenAddress,
        uint256 amount
    ) public whenNotPaused {
        require(
            amount <= tokenBalances[msg.sender][tokenAddress],
            "Insufficient balance."
        );
        IERC20 token = IERC20(tokenAddress);
        require(token.transfer(msg.sender, amount), "Token transfer failed.");
        tokenBalances[msg.sender][tokenAddress] -= amount;
    }

    function balanceOfEther(address account) public view returns (uint256) {
        return etherBalances[account];
    }

    function balanceOfToken(
        address account,
        address tokenAddress
    ) public view returns (uint256) {
        return tokenBalances[account][tokenAddress];
    }

    function pause() public onlyOwner {
        paused = true;
    }

    function unpause() public onlyOwner {
        paused = false;
    }

    receive() external payable {
        depositEther();
    }
}
