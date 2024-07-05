// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import {YProxy} from "./YProxy.sol";
import "../Helper/Ownable.sol";

interface IYDeployer {
    function getAddress(
        uint256 _salt,
        bytes memory bytecode
    ) external view returns (address);

    function deploy(
        uint256 _salt,
        bytes memory bytecode
    ) external returns (address);

    function getLastDeployed() external view returns (address);

    function deployProxy(
        address _a,
        string memory _p
    ) external returns (address);

    function getLastDeployedProxy() external view returns (address);
}

contract YDeployer is Ownable {
    address public lastDeployedProxy;
    address public lastDeployedProxyPy;

    constructor() {
        owner = msg.sender;
    }

    function getAddress(
        uint256 _salt,
        bytes memory bytecode
    ) external view returns (address) {
        // renamed from ga
        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0xff),
                address(this),
                _salt,
                keccak256(bytecode)
            )
        );

        // NOTE: cast last 20 bytes of hash to address
        return address(uint160(uint256(hash)));
    }

    function _deploy(
        uint256 _salt,
        bytes memory bytecode
    ) internal returns (address) {
        // renamed from _dpl
        address addr;

        assembly {
            addr := create2(
                callvalue(), // wei sent with current call
                // Actual code starts after skipping the first 32 bytes
                add(bytecode, 0x20),
                mload(bytecode), // Load the size of code contained in the first 32 bytes
                _salt // Salt from function arguments
            )

            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }

        lastDeployedProxy = addr;

        return addr;
    }

    function deploy(
        uint256 _s,
        bytes memory _b
    ) external onlyOwner returns (address) {
        // renamed from dpl
        return _deploy(_s, _b);
    }

    function _deployProxy(
        address owner,
        string memory proxyName
    ) internal onlyOwner returns (address) {
        uint256 salt = uint256(keccak256(abi.encodePacked(proxyName)));
        bytes memory bytecode = abi.encodePacked(
            type(YProxy).creationCode,
            abi.encode(owner)
        );
        lastDeployedProxy = _deploy(salt, bytecode);
        return lastDeployedProxy;
    }

    function deployProxy(
        address owner,
        string memory proxyName
    ) external onlyOwner returns (address) {
        return _deployProxy(owner, proxyName);
    }

    function getLastDeployed() external view onlyOwner returns (address) {
        return lastDeployedProxy;
    }

    function getLastDeployedProxy() external view onlyOwner returns (address) {
        return lastDeployedProxyPy;
    }
}
