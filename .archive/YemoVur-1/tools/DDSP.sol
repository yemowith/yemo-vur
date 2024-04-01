// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.23;

contract DSNt {
    event LogNote(
        bytes4 indexed sig,
        address indexed guy,
        bytes32 indexed foo,
        bytes32 indexed bar,
        uint256 wad,
        bytes fax
    ) anonymous;

    modifier note() {
        bytes32 foo;
        bytes32 bar;
        uint256 wad;

        assembly {
            foo := calldataload(4)
            bar := calldataload(36)
            wad := callvalue()
        }

        _;

        emit LogNote(msg.sig, msg.sender, foo, bar, wad, msg.data);
    }
}

interface DSAthrt {
    function canCall(
        address src,
        address dst,
        bytes4 sig
    ) external view returns (bool);
}

contract DSAthEvnts {
    event LogSetAuthority(address indexed authority);
    event LogSetOwner(address indexed owner);
}

contract DSAth is DSAthEvnts {
    DSAthrt public authority;
    address public owner;

    constructor() public {
        owner = msg.sender;
        emit LogSetOwner(msg.sender);
    }

    function setOwner(address owner_) public auth {
        owner = owner_;
        emit LogSetOwner(owner);
    }

    function setAuthority(DSAthrt authority_) public auth {
        authority = authority_;
        emit LogSetAuthority(address(authority));
    }

    modifier auth() {
        require(isAuthorized(msg.sender, msg.sig), "ds-auth-unauthorized");
        _;
    }

    function isAuthorized(
        address src,
        bytes4 sig
    ) internal view returns (bool) {
        if (src == address(this)) {
            return true;
        } else if (src == owner) {
            return true;
        } else if (authority == DSAthrt(address(0))) {
            return false;
        } else {
            return authority.canCall(src, address(this), sig);
        }
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

interface IDDSP {
    function execute(
        address target,
        bytes memory data
    ) external payable returns (bytes memory res);
}

contract DDSP is DSAth, DSNt {
    DDSPCch public cache; // global cache for contracts

    constructor(address _cacheAddr) public {
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
    ) public payable auth note returns (bytes memory response) {
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
    function setCch(address _cacheAddr) public auth note returns (bool) {
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

    constructor() public {
        cache = new DDSPCch();
    }

    // deploys a new proxy instance
    // sets custom owner of proxy
    function build(address owner) external returns (address payable proxy) {
        proxy = payable(address(new DDSP(address(cache))));
        emit Created(msg.sender, owner, address(proxy), address(cache));
        DDSP(proxy).setOwner(owner);
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
