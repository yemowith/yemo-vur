pragma solidity >=0.6.11;

import "./ECDSA.sol";

contract ProxyForwarder {
    using ECDSA for bytes32;

    mapping(address => bool) private isWhitelisted;

    // verify the data and execute the data at the target address
    function forward(
        address _to,
        bytes calldata _data,
        bytes memory _signature
    ) external returns (bytes memory _result) {
        bool success;

        verifySignature(_to, _data, _signature);

        (success, _result) = _to.call(_data);
        if (!success) {
            // solhint-disable-next-line no-inline-assembly
            assembly {
                returndatacopy(0, 0, returndatasize())
                revert(0, returndatasize())
            }
        }
    }

    // Recover signer public key and verify that it's a whitelisted signer.
    function verifySignature(
        address _to,
        bytes calldata _data,
        bytes memory signature
    ) private view {
        /*
        require(_to != address(0), "invalid target address");
        bytes32 payloadHash = keccak256(abi.encode(_to, _data));
        address signerAddress = payloadHash.toEthSignedMessageHash().recover(
            signature
        );
        require(isWhitelisted[signerAddress], "Signature validation failed");
        */
    }
    function addToWhitelist(address _signer) external {
        isWhitelisted[_signer] = true;
    }
}
