// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract YemoToken is ERC20, Ownable {
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply,
        address owner
    ) ERC20(name_, symbol_) {
        _mint(owner, initialSupply);
        transferOwnership(owner);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public onlyOwner {
        _burn(from, amount);
    }
}

interface IEEMT {
    // Event definition
    event EventLog(address indexed from, string sub, uint256 time, string data);

    // Function to emit an event
    function emitEvent(
        string memory sub,
        string memory data
    ) external returns (bool);

    // Function to receive event requests
    function receiveEventRequest(
        string memory sub,
        string memory data
    ) external returns (bool);
}

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

interface IInstaIndex {
    function build(
        address _owner,
        uint256 _accountVersion,
        address _origin
    ) external returns (address _account);
}
interface IDSA {
    function cast(
        string[] calldata _targetNames,
        bytes[] calldata _datas,
        address _origin
    ) external payable returns (bytes32);
}

abstract contract BVat {
    receive() external payable {}

    // Deposit ERC20 tokens
    function deposit(address token, uint256 amount) external {
        require(
            IERC20(token).allowance(msg.sender, address(this)) >= amount,
            "Allowance not enough"
        );
        IERC20(token).transferFrom(msg.sender, address(this), amount);
    }

    // Withdraw ERC20 tokens
    function withdraw(
        address token,
        uint256 amount,
        address receiver
    ) external {
        require(
            IERC20(token).allowance(msg.sender, address(this)) >= amount,
            "Allowance not enough"
        );
        IERC20(token).transfer(receiver, amount);
    }
}

abstract contract OOwn {
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

abstract contract YK {
    address public dplr;
    address public ddsp;
    address public eemt;

    constructor(address _dplr, address _ddsp, address _eemt) {
        dplr = _dplr;
        ddsp = _ddsp;
        eemt = _eemt;
    }
}

contract INSTA is BVat {
    address public AppFcA;
    // this address is only of mainnet.
    IInstaIndex public AppFc;
    string public defaultAccountCode = "A";
    address public appOwner;
    struct Account {
        address accnrAdrs;
        address owner;
        string code;
        uint256 accountVersion;
    }
    mapping(string => Account) public accounts;

    constructor(address _AppFcA, address _owner) {
        AppFcA = _AppFcA;
        IInstaIndex AppFc = IInstaIndex(AppFcA);
        appOwner = _owner;
    }

    function getAccount(
        string memory _code
    ) public view returns (Account memory) {
        return accounts[_code];
    }

    function getAccount() public view returns (Account memory) {
        return accounts[defaultAccountCode];
    }

    function nacct(
        address _owner,
        string memory _code,
        uint256 _accountVersion
    ) public returns (Account memory) {
        address _account = AppFc.build(_owner, _accountVersion, address(0));
        accounts[_code] = Account(_account, _owner, _code, _accountVersion);
        return accounts[_code];
    }

    function mkaccnt(string memory _code) external returns (Account memory) {
        return nacct(appOwner, _code, 2);
    }

    function transTAccnt(
        string memory _accnt,
        address token,
        uint256 amount
    ) external {
        address accnt = accounts[_accnt].accnrAdrs;
        if (IERC20(token).allowance(address(this), accnt) < amount) {
            IERC20(token).approve(accnt, amount);
        }
        IERC20(token).transferFrom(address(this), address(this), amount);
    }

    function cast(address _owner) external {}
}

abstract contract MKRTMPLT {
    function _mktkn(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply,
        address owner,
        address dplr
    ) internal {
        uint256 _salt = uint256(keccak256(abi.encodePacked("Y")));
        bytes memory _b = abi.encodePacked(
            type(YemoToken).creationCode,
            abi.encode(name_, symbol_, initialSupply, owner)
        );
        IDPLR(dplr).dpl(_salt, _b);
    }
}

contract YemoVault is YK, BVat, INSTA, MKRTMPLT, OOwn {
    constructor(
        address _owner,
        address _dplr,
        address _ddsp,
        address _eemt,
        address appfa
    ) OOwn(_owner) YK(_dplr, _ddsp, _eemt) INSTA(appfa, _owner) {}

    function optnY() external {
        _mktkn("YMT", "YMT", 1000 ether, owner, dplr);
    }
}
