// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Helpers
contract ownbl {
    address public ownr;
    constructor() {
        ownr = msg.sender;
    }
    modifier onlOwnr() {
        require(msg.sender == ownr, "Only owner can call this function");
        _;
    }
    function transferOwnrship(address newOwner) public onlOwnr {
        ownr = newOwner;
    }
}

contract Pausable is ownbl {
    bool private _paused;
    constructor() {
        _paused = false;
    }

    modifier whenNotPaused() {
        require(!_paused, "Pausable: paused");
        _;
    }

    modifier whenPaused() {
        require(_paused, "Pausable: not paused");
        _;
    }

    function paused() public view returns (bool) {
        return _paused;
    }

    function pause() public onlOwnr whenNotPaused {
        _paused = true;
    }

    function unpause() public onlOwnr whenPaused {
        _paused = false;
    }
}

contract Lockable is ownbl {
    bool private _locked;

    modifier whenNotLocked() {
        require(!_locked, "Lockable: locked");
        _;
    }

    modifier whenLocked() {
        require(_locked, "Lockable: not locked");
        _;
    }

    function locked() public view returns (bool) {
        return _locked;
    }

    function lock() public onlOwnr whenNotLocked {
        _locked = true;
    }

    function unlock() public onlOwnr whenLocked {
        _locked = false;
    }
}

contract HelprERC20 is ownbl {
    function approve(
        address spender,
        uint256 amount,
        address asset
    ) internal onlOwnr {
        IERC20(asset).approve(spender, amount);
    }

    function allowance(
        address owner,
        address spender,
        address asset
    ) internal view returns (uint256) {
        return IERC20(asset).allowance(owner, spender);
    }
}

contract YProxy is ownbl, Pausable {
    address public implementation;

    event Received(uint indexed value, address indexed sender, bytes data);

    constructor(address _owner) {
        ownr = payable(_owner);
    }

    fallback() external payable whenNotPaused {
        address target = implementation;
        require(target != address(0), "Implementation not setted");
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

    receive() external payable {
        emit Received(msg.value, msg.sender, "");
    }

    function setImplementation(address _implementation) external onlOwnr {
        implementation = _implementation;
    }
}

// Vaults
contract N12Vlt is ownbl, Pausable, Lockable {
    mapping(address => uint256) public balances;
    address public mainAsset;
    constructor(address _mainAsset) {
        mainAsset = _mainAsset;
    }

    function deposit(
        uint256 amount
    ) external whenNotPaused whenNotLocked onlOwnr {
        require(
            IERC20(mainAsset).transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        balances[msg.sender] += amount;
    }

    function withdraw(
        uint256 amount
    ) external whenNotPaused whenNotLocked onlOwnr {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        require(
            IERC20(mainAsset).balanceOf(address(this)) >= amount,
            "Contract balance is insufficient"
        );
        balances[msg.sender] -= amount;
        require(
            IERC20(mainAsset).transfer(msg.sender, amount),
            "Transfer failed"
        );
    }
}

contract N12Wlt is ownbl {
    function _execute(
        address target,
        bytes memory data
    ) internal returns (bytes memory) {
        (bool success, bytes memory result) = target.call(data);
        require(success, "Execution failed");
        return result;
    }

    function execute(
        address target,
        bytes memory data
    ) external returns (bytes memory) {
        return _execute(target, data);
    }

    function multiExecute(
        address[] memory targets,
        bytes[] memory data
    ) external returns (bytes[] memory) {
        require(
            targets.length == data.length,
            "Targets and data length mismatch"
        );
        bytes[] memory results = new bytes[](targets.length);
        for (uint256 i = 0; i < targets.length; i++) {
            results[i] = _execute(targets[i], data[i]);
        }
        return results;
    }

    function call(
        address target,
        bytes memory data
    ) external returns (bytes memory) {
        (bool success, bytes memory result) = target.call(data);
        require(success, "Call failed");
        return result;
    }

    function callStatic(
        address target,
        bytes memory data
    ) external view returns (bytes memory) {
        (bool success, bytes memory result) = target.staticcall(data);
        require(success, "Static call failed");
        return result;
    }

    function invokeCall(
        address target,
        string memory signature,
        bytes memory data
    ) external returns (bytes memory) {
        bytes memory callData = abi.encodeWithSignature(signature, data);
        (bool success, bytes memory result) = target.call(callData);
        require(success, "Call failed");
        return result;
    }
}

contract DDSPCch {
    mapping(bytes32 => address) cache;

    function read(bytes memory _code) public view returns (address) {
        bytes32 hash = keccak256(_code);
        return cache[hash];
    }

    function write(bytes memory _code) public returns (address target) {
        assembly {
            target := create(0, add(_code, 0x20), mload(_code))
            switch iszero(extcodesize(target))
            case 1 {
                // throw if contract failed to deploy
                revert(0, 0)
            }
        }
        bytes32 hash = keccak256(_code);
        cache[hash] = target;
    }
}

contract DDSP is ownbl {
    DDSPCch public cache; // global cache for contracts

    constructor(address _cacheAddr) {
        setCch(_cacheAddr);
    }

    // If you want the contract to accept plain Ether transactions without calling a function:
    receive() external payable {}

    // If you need a fallback for calls to non-existent functions:
    fallback() external payable {}

    // use the proxy to execute calldata _data on contract _code
    function execute(
        bytes memory _code,
        bytes memory _data
    ) public payable returns (address target, bytes memory response) {
        target = cache.read(_code);
        if (target == address(0)) {
            // deploy contract & store its address in cache
            target = cache.write(_code);
        }

        bytes memory tempResponse = execute(target, _data);
        response = tempResponse;
    }

    function execute(
        address _target,
        bytes memory _data
    ) public payable returns (bytes memory response) {
        require(_target != address(0), "ds-proxy-target-address-required");

        // call contract in current context
        assembly {
            let succeeded := delegatecall(
                sub(gas(), 5000),
                _target,
                add(_data, 0x20),
                mload(_data),
                0,
                0
            )
            let size := returndatasize()

            response := mload(0x40)
            mstore(
                0x40,
                add(response, and(add(add(size, 0x20), 0x1f), not(0x1f)))
            )
            mstore(response, size)
            returndatacopy(add(response, 0x20), 0, size)

            switch iszero(succeeded)
            case 1 {
                // throw if delegatecall failed
                revert(add(response, 0x20), size)
            }
        }
    }

    //set new cache
    function setCch(address _cacheAddr) public returns (bool) {
        require(_cacheAddr != address(0), "ds-proxy-cache-address-required");
        cache = DDSPCch(_cacheAddr); // overwrite cache
        return true;
    }
}

contract DDSPF {
    event Created(
        address indexed sender,
        address indexed owner,
        address proxy,
        address cache
    );
    mapping(address => bool) public isProxy;
    mapping(address => address) public proxies;
    DDSPCch public cache;

    constructor() {
        cache = new DDSPCch();
    }

    // deploys a new proxy instance
    // sets custom owner of proxy
    function build(address owner) external returns (address payable proxy) {
        proxy = payable(address(new DDSP(address(cache))));
        emit Created(msg.sender, owner, address(proxy), address(cache));
        DDSP(proxy).transferOwnrship(owner);
        isProxy[proxy] = true;
        proxies[owner] = proxy;

        return proxy;
    }

    // Function to get proxy address for a given owner
    function getProxy(address owner) external view returns (address) {
        require(isProxy[proxies[owner]], "No proxy exists for this owner");
        return proxies[owner];
    }
}

contract N12 is DDSPF {
    N12Wlt public wallet;
    constructor() {
        wallet = new N12Wlt();
    }

    mapping(address => address[]) public userVaults;
    mapping(address => address[]) public userWallets;

    function generateN12Vlt(address _mainAsset) external returns (address) {
        N12Vlt vault = new N12Vlt(_mainAsset);
        vault.transferOwnrship(msg.sender);
        userVaults[msg.sender].push(address(vault));
        return address(vault);
    }

    function generateMultiN12Wlt(
        uint256 count
    ) external returns (address[] memory) {
        require(count > 0, "Count must be greater than 0");
        address[] memory wallets = new address[](count);
        for (uint256 i = 0; i < count; i++) {
            N12Wlt wallet = new N12Wlt();
            wallet.transferOwnrship(msg.sender);
            wallets[i] = address(wallet);
            userWallets[msg.sender].push(address(wallet));
        }
        return wallets;
    }

    function getUserVaults(
        address user
    ) external view returns (address[] memory) {
        return userVaults[user];
    }
}
