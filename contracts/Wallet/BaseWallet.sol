// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.3;

/**
 * @title BaseWallet
 * @notice Simple modular wallet that authorises modules to call its invoke() method.
 * @author Julien Niset - <julien@argent.xyz>
 */
contract BaseWallet {
    /*
    // The owner
    address public owner;

    mapping(address => address) public override authorised;

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    function addModule(address _module) external onlyOwner {
        require(_module != address(0), "Module address cannot be null");
        modules.push(_module);
    }

    function removeModule(address _module) external onlyOwner {
        require(_module != address(0), "Module address cannot be null");
        for (uint i = 0; i < modules.length; i++) {
            if (modules[i] == _module) {
                modules[i] = modules[modules.length - 1];
                modules.pop();
                break;
            }
        }
    }

    function isModuleEnabled(address _module) external view returns (bool) {
        for (uint i = 0; i < modules.length; i++) {
            if (modules[i] == _module) {
                return true;
            }
        }
        return false;
    }

    event Invoked(
        address indexed module,
        address indexed target,
        uint indexed value,
        bytes data
    );
    event Received(uint indexed value, address indexed sender, bytes data);
    event OwnerChanged(address owner);

    function init(address _owner, address _factory) external {}

    function setOwner(address _newOwner) external override {
        require(_newOwner != address(0), "BW: address cannot be null");
        owner = _newOwner;
        emit OwnerChanged(_newOwner);
    }

    function invoke(
        address _target,
        uint _value,
        bytes calldata _data
    ) external returns (bytes memory _result) {
        bool success;
        (success, _result) = _target.call{value: _value}(_data);
        if (!success) {
            // solhint-disable-next-line no-inline-assembly
            assembly {
                returndatacopy(0, 0, returndatasize())
                revert(0, returndatasize())
            }
        }
        emit Invoked(msg.sender, _target, _value, _data);
    }


    fallback() external payable {
        address module = isModuleEnabled(msg.sender);
        (msg.sig);
        // solhint-disable-next-line no-inline-assembly
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := staticcall(gas(), module, 0, calldatasize(), 0, 0)
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

    */
}
