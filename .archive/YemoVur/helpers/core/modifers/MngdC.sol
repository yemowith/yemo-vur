// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library OwnershipHelpers {
    function isOwner(
        address _owner,
        address _sender
    ) internal pure returns (bool) {
        return _sender == _owner;
    }

    function isAdmin(
        mapping(address => bool) storage _admins,
        address _sender
    ) internal view returns (bool) {
        return _admins[_sender];
    }
}

contract MngdC {
    using OwnershipHelpers for address;

    address public owner;
    mapping(address => bool) public admins;
    bool public paused;

    event OwnerChanged(address indexed oldOwner, address indexed newOwner);
    event AdminStatusChanged(address indexed admin, bool status);

    constructor() {
        owner = msg.sender;
        paused = false;
    }

    modifier onlyOwner() {
        require(owner.isOwner(msg.sender), "Not the owner");
        _;
    }

    modifier onlyOwnerOrAdmin() {
        require(
            owner.isOwner(msg.sender) ||
                OwnershipHelpers.isAdmin(admins, msg.sender),
            "Not authorized"
        );
        _;
    }

    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }

    function addAdmin(address _admin) public onlyOwnerOrAdmin {
        require(_admin != address(0), "Invalid address");
        admins[_admin] = true;
        emit AdminStatusChanged(_admin, true);
    }

    function removeAdmin(address _admin) public onlyOwnerOrAdmin {
        require(_admin != address(0), "Invalid address");
        admins[_admin] = false;
        emit AdminStatusChanged(_admin, false);
    }

    function changeOwner(address _newOwner) public onlyOwner {
        require(_newOwner != address(0), "Invalid new owner address.");
        emit OwnerChanged(owner, _newOwner);
        owner = _newOwner;
    }

    function changeAdminStatus(
        address _admin,
        bool _status
    ) public onlyOwnerOrAdmin {
        require(_admin != address(0), "Invalid admin address.");
        admins[_admin] = _status;
        emit AdminStatusChanged(_admin, _status);
    }

    function pause() public onlyOwnerOrAdmin {
        paused = true;
    }

    function unpause() public onlyOwnerOrAdmin {
        paused = false;
    }
}
