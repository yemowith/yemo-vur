// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IOwnable {
    event OwnerChanged(address indexed oldOwner, address indexed newOwner);

    function owner() external view returns (address);
    function changeOwner(address _newOwner) external;
}

interface IInitializable {
    function initialized() external view returns (bool);
    function initialize() external;
}

interface IPausable {
    function paused() external view returns (bool);
    function pause() external;
    function unpause() external;
}

interface IAdminAble {
    event AdminStatusChanged(address indexed admin, bool status);
    event SuperAdminChanged(
        address indexed oldSuperAdmin,
        address indexed newSuperAdmin
    );

    function superAdmin() external view returns (address);
    function isAdmin(address _address) external view returns (bool);
    function isSuperAdmin(address _address) external view returns (bool);
    function addAdmin(address _admin) external;
    function removeAdmin(address _admin) external;
    function changeSuperAdmin(address _newSuperAdmin) external;
}

abstract contract Ownable {
    address public owner;

    event OwnerChanged(address indexed oldOwner, address indexed newOwner);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, 'Not the owner');
        _;
    }

    function changeOwner(address _newOwner) public onlyOwner {
        require(_newOwner != address(0), 'Invalid new owner address.');
        emit OwnerChanged(owner, _newOwner);
        owner = _newOwner;
    }
}

abstract contract Initializable {
    bool public initialized;

    modifier onlyInitialized() {
        require(initialized, 'Contract not initialized');
        _;
    }

    function initialize() public {
        require(!initialized, 'Contract already initialized');
        initialized = true;
    }
}

abstract contract Pausable is Ownable {
    bool public paused;

    modifier whenNotPaused() {
        require(!paused, 'Contract is paused');
        _;
    }

    function pause() public onlyOwner {
        paused = true;
    }

    function unpause() public onlyOwner {
        paused = false;
    }
}
abstract contract Lockable is Ownable {
    bool public locked;
    uint256 public lockDuration;
    uint256 public lockTime;

    modifier whenNotLocked() {
        require(!locked, 'Contract is locked');
        _;
    }

    modifier whenLockExpired() {
        require(
            !locked || block.timestamp >= lockTime + lockDuration,
            'Lock is active and duration has not expired'
        );
        _;
    }

    function lock() public onlyOwner {
        locked = true;
    }

    function lockWithDuration(uint256 _duration) public onlyOwner {
        require(!locked, 'Contract is already locked');
        locked = true;
        lockDuration = _duration;
        lockTime = block.timestamp;
    }

    function unlock() public onlyOwner whenLockExpired {
        locked = false;
    }
}

abstract contract AdminAble {
    mapping(address => bool) public admins;
    address public superAdmin;

    event AdminStatusChanged(address indexed admin, bool status);
    event SuperAdminChanged(
        address indexed oldSuperAdmin,
        address indexed newSuperAdmin
    );

    constructor() {
        superAdmin = msg.sender; // SuperAdmin başlangıçta kontratı oluşturan adres olarak ayarlanır.
    }

    modifier onlySuperAdmin() {
        require(msg.sender == superAdmin, 'Caller is not the superAdmin');
        _;
    }

    modifier onlyAdmin() {
        require(
            admins[msg.sender] || msg.sender == superAdmin,
            'Caller is not an admin or the superAdmin'
        );
        _;
    }

    function isSuperAdmin(address _address) public view returns (bool) {
        return _address == superAdmin;
    }

    function isAdmin(address _address) public view returns (bool) {
        return admins[_address] || _address == superAdmin; // SuperAdmin aynı zamanda bir admin olarak kabul edilir.
    }

    function addAdmin(address _admin) public onlySuperAdmin {
        require(_admin != address(0), 'Invalid admin address');
        require(!admins[_admin], 'Address is already an admin');
        admins[_admin] = true;
        emit AdminStatusChanged(_admin, true);
    }

    function removeAdmin(address _admin) public onlySuperAdmin {
        require(_admin != address(0), 'Invalid admin address');
        require(admins[_admin], 'Address is not an admin');
        admins[_admin] = false;
        emit AdminStatusChanged(_admin, false);
    }

    function changeSuperAdmin(address _newSuperAdmin) public onlySuperAdmin {
        require(_newSuperAdmin != address(0), 'Invalid new superAdmin address');
        emit SuperAdminChanged(superAdmin, _newSuperAdmin);
        superAdmin = _newSuperAdmin;
    }
}
