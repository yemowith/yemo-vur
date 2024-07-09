// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CustomReentrancyGuard {
    bool private _locked;

    modifier nonReentrant() {
        require(!_locked, "ReentrancyGuard: reentrant call");
        _locked = true;
        _;
        _locked = false;
    }
}

contract AdvancedEscrow is ERC721, Ownable, CustomReentrancyGuard {
    IERC20 public depositToken;
    uint256 public nextTokenId;
    uint256 public minDepositAmount;

    struct VaultItem {
        address owner;
        uint256 amount;
    }

    mapping(uint256 => VaultItem) private vault;
    mapping(address => uint256) private userDeposits;
    mapping(uint256 => string) private tokenMetadata;

    event Deposited(
        address indexed user,
        uint256 indexed tokenId,
        uint256 amount
    );
    event Redeemed(
        address indexed user,
        uint256 indexed tokenId,
        uint256 amount
    );
    event EmergencyWithdrawn(address indexed owner, uint256 amount);
    event MinDepositAmountChanged(uint256 newMinDepositAmount);

    constructor(
        address _depositToken,
        uint256 _minDepositAmount
    ) ERC721("EscrowNFT", "eNFT") Ownable(msg.sender) {
        require(_depositToken != address(0), "Invalid token address");
        depositToken = IERC20(_depositToken);
        minDepositAmount = _minDepositAmount;
    }

    function deposit(
        uint256 amount,
        string memory metadata
    ) external nonReentrant returns (uint256) {
        require(amount >= minDepositAmount, "Amount below minimum deposit");

        // Check if the contract has enough allowance to transfer the tokens
        uint256 allowance = depositToken.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");

        // Transfer tokens from the user to the contract
        require(
            depositToken.transferFrom(msg.sender, address(this), amount),
            "Token transfer failed"
        );

        uint256 tokenId = nextTokenId++;
        _mint(msg.sender, tokenId);
        tokenMetadata[tokenId] = metadata;

        vault[tokenId] = VaultItem({owner: msg.sender, amount: amount});

        userDeposits[msg.sender] += amount;

        emit Deposited(msg.sender, tokenId, amount);

        return tokenId;
    }

    function redeem(uint256 tokenId) external nonReentrant {
        require(ownerOf(tokenId) == msg.sender, "Caller is not the owner");

        VaultItem storage item = vault[tokenId];
        require(item.owner == msg.sender, "Not the original depositor");

        uint256 amount = item.amount;

        // Approve the contract to transfer tokens back to the user
        require(
            depositToken.approve(address(this), amount),
            "Token approve failed"
        );
        require(
            depositToken.transfer(msg.sender, amount),
            "Token transfer failed"
        );

        userDeposits[msg.sender] -= amount;

        _burn(tokenId);
        delete vault[tokenId];
        delete tokenMetadata[tokenId];

        emit Redeemed(msg.sender, tokenId, amount);
    }

    function emergencyWithdraw() external onlyOwner {
        uint256 contractBalance = depositToken.balanceOf(address(this));
        require(
            depositToken.transfer(owner(), contractBalance),
            "Token transfer failed"
        );

        emit EmergencyWithdrawn(owner(), contractBalance);
    }

    function getVaultItem(
        uint256 tokenId
    ) external view returns (address owner, uint256 amount) {
        VaultItem storage item = vault[tokenId];
        return (item.owner, item.amount);
    }

    function balanceOfDeposits(address user) external view returns (uint256) {
        return userDeposits[user];
    }

    function setMinDepositAmount(uint256 _minDepositAmount) external onlyOwner {
        minDepositAmount = _minDepositAmount;
        emit MinDepositAmountChanged(_minDepositAmount);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return tokenMetadata[tokenId];
    }
}
