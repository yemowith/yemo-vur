// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../Helper/Ownable.sol";

interface IYEncoder {
    function encode(
        bytes memory data,
        bytes32 additionalParam
    ) external view returns (bytes memory);
    function decode(
        bytes memory encodedData,
        bytes32 additionalParam
    ) external view returns (bytes memory);
    function validateEncodedData(
        bytes memory encodedData,
        bytes memory originalData,
        bytes32 additionalParam
    ) external view returns (bool);
}

contract YEncoder is Ownable {
    bytes32 internal _salt;

    function _encode(
        bytes memory data,
        bytes32 additionalParam
    ) internal view returns (bytes memory) {
        require(data.length > 0, "Data cannot be empty");
        return abi.encodePacked(_salt, additionalParam, data);
    }

    function _decode(
        bytes memory encodedData,
        bytes32 additionalParam
    ) internal view returns (bytes memory) {
        require(
            encodedData.length > 32,
            "Encoded data is too short to contain salt and additional parameters"
        );

        bytes32 extractedSalt;
        assembly {
            extractedSalt := mload(add(encodedData, 32))
        }

        require(
            keccak256(abi.encodePacked(extractedSalt, additionalParam)) ==
                _salt,
            "Invalid encoding parameters"
        );

        bytes memory decodedData = new bytes(encodedData.length - 32);
        for (uint256 i = 32; i < encodedData.length; i++) {
            decodedData[i - 32] = encodedData[i];
        }
        return decodedData;
    }

    function _validateEncodedData(
        bytes memory encodedData,
        bytes memory originalData,
        bytes32 additionalParam
    ) internal view returns (bool) {
        bytes memory decodedData = _decode(encodedData, additionalParam);

        if (keccak256(decodedData) != keccak256(originalData)) {
            return false;
        }

        bytes32 validationHash = keccak256(
            abi.encodePacked(decodedData, additionalParam)
        );
        return validationHash == _salt;
    }

    function encode(
        bytes memory data,
        bytes32 additionalParam
    ) external view returns (bytes memory) {
        return _encode(data, additionalParam);
    }

    function decode(
        bytes memory encodedData,
        bytes32 additionalParam
    ) external view returns (bytes memory) {
        return _decode(encodedData, additionalParam);
    }

    function validateEncodedData(
        bytes memory encodedData,
        bytes memory originalData,
        bytes32 additionalParam
    ) external view returns (bool) {
        return _validateEncodedData(encodedData, originalData, additionalParam);
    }
}
