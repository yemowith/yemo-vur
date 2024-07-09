// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
/*
contract Relayer is Ownable, EIP712 {
    using ECDSA for bytes32;

    mapping(address => bool) public whitelistedRelayers;
    mapping(address => uint256) public nonces;
    mapping(bytes32 => bool) public executedTransactions;
    mapping(address => uint256) public gasRefunds;

    event RelayerWhitelisted(address indexed relayer);
    event RelayerBlacklisted(address indexed relayer);
    event Executed(
        address indexed user,
        address indexed relayer,
        address target,
        uint256 value,
        bytes data,
        uint256 gasUsed
    );
    event Refunded(address indexed user, uint256 value);

    bytes32 private constant EXECUTE_TYPEHASH =
        keccak256(
            "Execute(address user,address target,uint256 value,bytes data,uint256 nonce)"
        );

    constructor() EIP712("Relayer", "1") Ownable(msg.sender) {}

    modifier onlyWhitelisted() {
        require(whitelistedRelayers[msg.sender], "Relayer: not whitelisted");
        _;
    }

    function whitelistRelayer(address relayer) external onlyOwner {
        whitelistedRelayers[relayer] = true;
        emit RelayerWhitelisted(relayer);
    }

    function blacklistRelayer(address relayer) external onlyOwner {
        whitelistedRelayers[relayer] = false;
        emit RelayerBlacklisted(relayer);
    }

    function execute(
        address user,
        address target,
        uint256 value,
        bytes calldata data,
        bytes calldata signature
    ) external onlyWhitelisted {
        uint256 startGas = gasleft();
        uint256 nonce = nonces[user]++;
        bytes32 digest = _hashTypedDataV4(
            keccak256(
                abi.encode(
                    EXECUTE_TYPEHASH,
                    user,
                    target,
                    value,
                    keccak256(data),
                    nonce
                )
            )
        );
        address signer = digest.recover(signature);
        require(signer == user, "Relayer: invalid signature");

        bytes32 txHash = keccak256(
            abi.encodePacked(user, target, value, data, nonce)
        );
        require(
            !executedTransactions[txHash],
            "Relayer: transaction already executed"
        );

        (bool success, bytes memory returnData) = _execute(target, value, data);
        require(success, "Relayer: execution failed");

        executedTransactions[txHash] = true;

        uint256 gasUsed = startGas - gasleft();
        gasRefunds[user] = gasUsed * tx.gasprice;

        emit Executed(user, msg.sender, target, value, data, gasUsed);

        // Refund the gas cost of the previous transaction
        _refundGas(user);
    }

    function _execute(
        address target,
        uint256 value,
        bytes memory data
    ) internal returns (bool, bytes memory) {
        bool success;
        bytes memory returnData;

        assembly {
            let freeMemPtr := mload(0x40) // Load free memory pointer
            let dataLength := mload(data) // Load data length

            let dataStart := add(data, 0x20) // Start of data in memory (skip length word)

            // Call the target
            success := call(
                gas(), // Gas available
                target, // Target address
                value, // Ether value to send
                dataStart, // Start of input data
                dataLength, // Length of input data
                0, // No output data
                0 // No output data size
            )

            let returnSize := returndatasize() // Size of the returned data
            returnData := mload(0x40) // Allocate memory for return data
            mstore(0x40, add(returnData, returnSize)) // Update free memory pointer
            returndatacopy(returnData, 0, returnSize) // Copy return data to memory
        }

        return (success, returnData);
    }

    function _refundGas(address user) internal {
        uint256 refundAmount = gasRefunds[user];
        if (refundAmount > 0) {
            gasRefunds[user] = 0;
            (bool success, ) = user.call{value: refundAmount}("");
            require(success, "Relayer: refund failed");

            emit Refunded(user, refundAmount);
        }
    }

    function refund(address user, uint256 value) external onlyOwner {
        require(
            address(this).balance >= value,
            "Relayer: insufficient balance"
        );
        (bool success, ) = user.call{value: value}("");
        require(success, "Relayer: refund failed");

        emit Refunded(user, value);
    }

    function getNonce(address user) external view returns (uint256) {
        return nonces[user];
    }

    receive() external payable {}
}


*/
