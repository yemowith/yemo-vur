// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

interface IDPLR {
    function ga(
        uint256 _salt,
        bytes memory bytecode
    ) external view returns (address);

    function dpl(
        uint256 _salt,
        bytes memory bytecode
    ) external returns (address);

    function gLdpld() external view returns (address);

    function mpy(address _a, string memory _p) external returns (address);

    function gldpldPy() external view returns (address);
}

interface IPY {
    function setimplt(address _implt) external;
}

contract OOwn {
    address public owner;
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor(address _owner) {
        owner = _owner;
    }

    function cngOwn(address _nOwn) external onlyOwner returns (bool) {
        owner = _nOwn;
        return true;
    }
}

// proxy contract
contract PY is OOwn {
    address public implt;

    constructor(address _owner) OOwn(_owner) {}

    fallback() external payable {
        address target = implt;
        require(target != address(0), "implt not setted");
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), target, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }

    receive() external payable {}

    function setimplt(address _implt) external onlyOwner {
        implt = _implt;
    }
}

// deploy contract by using create2
// ga to get address by salt and code
// dpl to deploy with salt and code
// mpy to deploy proxy with owner but without implt
// gLdpld to get last deployed address
// gLdpldPy to get last deployed Py(proxy) address
contract DPLR {
    address public ldpld;
    address public ldpldPy;

    function ga(
        uint256 _salt,
        bytes memory bytecode
    ) external view returns (address) {
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

    function _dpl(
        uint256 _salt,
        bytes memory bytecode
    ) internal returns (address) {
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

        ldpld = addr;

        return addr;
    }

    function dpl(uint256 _s, bytes memory _b) external returns (address) {
        return _dpl(_s, _b);
    }

    function mpy(address _a, string memory _p) external returns (address) {
        uint256 _salt = uint256(keccak256(abi.encodePacked(_p)));
        bytes memory _b = abi.encodePacked(
            type(PY).creationCode,
            abi.encode(_a)
        );
        ldpldPy = _dpl(_salt, _b);
        return ldpldPy;
    }

    function gLdpld() external view returns (address) {
        return ldpld;
    }

    function gldpldPy() external view returns (address) {
        return ldpldPy;
    }
}
