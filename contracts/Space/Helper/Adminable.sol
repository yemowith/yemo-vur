// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Ownable.sol";

contract Adminable is Ownable {
    address public superAdmin;

    event SuperAdminChanged(
        address indexed oldSuperAdmin,
        address indexed newSuperAdmin
    );

    constructor() {
        superAdmin = msg.sender;
    }

    modifier onlySuperAdmin() {
        require(msg.sender == superAdmin, "Caller is not the superAdmin");
        _;
    }

    function changeSuperAdmin(address newSuperAdmin) external onlySuperAdmin {
        require(
            newSuperAdmin != address(0),
            "New superAdmin address cannot be null"
        );
        emit SuperAdminChanged(superAdmin, newSuperAdmin);
        superAdmin = newSuperAdmin;
    }
}
