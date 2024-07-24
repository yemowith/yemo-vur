// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

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
        require(_locked, "Lockable: locked");
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
