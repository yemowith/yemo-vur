// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

interface IFA {
    function getAddress(
        uint256 _salt,
        bytes calldata bytecode
    ) external view returns (address);
    function deploy(
        uint256 _salt,
        bytes calldata bytecode
    ) external returns (address);
}

interface IDPLR {
    function deploy(
        bytes memory bytecode,
        string memory _saltCode
    ) external returns (address);

    function updateLastAddress(uint256 _salt, bytes memory bytecode) external;

    function getFromLastAddress(
        uint256 _saltCode
    ) external view returns (address);

    function getLastAddress() external view returns (address);

    function changeCode(string memory name) external;
}

// This is the older way of doing it using assembly
contract FA {
    // 2. Compute the address of the contract to be deployed
    // NOTE: _salt is a random number used to create an address
    function getAddress(
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

    function deploy(
        uint256 _salt,
        bytes memory bytecode
    ) external returns (address) {
        address addr;
        /* solhint-disable no-inline-assembly */
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

        return addr;
    }
}

// deployer contract
contract DPLR {
    string public DEFAULT_CODE = "Yemo";
    address public FAA;
    mapping(uint256 => address) public createdContracts;
    address public lasttAddress;
    uint256 private nonce = 0;

    constructor() {
        FAA = address(new FA());
    }

    function _codeSalt(string memory _code) public pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(_code)));
    }

    function checkFAA() internal returns (address) {
        if (FAA == address(0)) {
            FAA = address(new FA());
        }
        return FAA;
    }

    function deploy(
        bytes memory bytecode,
        string memory _saltCode
    ) external returns (address) {
        uint256 _salt = makeSalt(_codeSalt(_saltCode));
        IFA(FAA).deploy(_salt, bytecode);
        lasttAddress = IFA(FAA).getAddress(_salt, bytecode);
        createdContracts[_codeSalt(_saltCode)] = lasttAddress;
        return lasttAddress;
    }

    function updateLastAddress(uint256 _salt, bytes memory bytecode) internal {
        lasttAddress = IFA(FAA).getAddress(_salt, bytecode);
    }

    function getFromLastAddress(
        uint256 _saltCode
    ) public view returns (address) {
        return createdContracts[_saltCode];
    }

    function makeSalt(uint256 _code) public view returns (uint256) {
        return uint256(keccak256(abi.encodePacked(_code, _code, nonce)));
    }

    function getLastAddress() public view returns (address) {
        return lasttAddress;
    }

    function changeCode(string memory name) public {
        DEFAULT_CODE = name;
    }
}
