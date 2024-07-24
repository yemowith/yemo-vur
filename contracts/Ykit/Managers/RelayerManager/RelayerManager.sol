// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./../AccountManager/AccountManager.sol";

contract RelayerManager is Ownable {
    AccountManager accountManager;
    uint256 public nonce;
    mapping(bytes32 => bool) public executedTransactions;

    event TransactionExecuted(
        address indexed wallet,
        bool indexed success,
        bytes returnData,
        bytes32 signedHash
    );
    event Refund(
        address indexed wallet,
        address indexed refundAddress,
        address refundToken,
        uint256 refundAmount
    );

    constructor(address _accountManager) Ownable(payable(msg.sender)) {
        accountManager = AccountManager(_accountManager);
    }

    function execute(
        address wallet,
        bytes calldata data,
        uint256 gasPrice,
        uint256 gasLimit,
        address refundToken,
        address refundAddress
    ) external returns (bool) {
        uint256 startGas = gasleft();
        bytes32 signHash = getSignHash(
            wallet,
            data,
            nonce,
            gasPrice,
            gasLimit,
            refundToken,
            refundAddress
        );
        require(
            !executedTransactions[signHash],
            "Transaction already executed"
        );

        nonce++;
        executedTransactions[signHash] = true;

        (bool success, bytes memory returnData) = wallet.call(data);
        refund(
            wallet,
            startGas,
            gasPrice,
            gasLimit,
            refundToken,
            refundAddress
        );
        emit TransactionExecuted(wallet, success, returnData, signHash);
        return success;
    }

    function getSignHash(
        address wallet,
        bytes memory data,
        uint256 _nonce,
        uint256 gasPrice,
        uint256 gasLimit,
        address refundToken,
        address refundAddress
    ) public pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    "\x19Ethereum Signed Message:\n32",
                    keccak256(
                        abi.encodePacked(
                            wallet,
                            data,
                            _nonce,
                            gasPrice,
                            gasLimit,
                            refundToken,
                            refundAddress
                        )
                    )
                )
            );
    }

    function refund(
        address wallet,
        uint256 startGas,
        uint256 gasPrice,
        uint256 gasLimit,
        address refundToken,
        address refundAddress
    ) internal {
        uint256 gasConsumed = startGas - gasleft();
        uint256 refundAmount = gasConsumed * gasPrice;
        // Refund logic here, e.g., transfer tokens or ETH
        emit Refund(wallet, refundAddress, refundToken, refundAmount);
    }
}
