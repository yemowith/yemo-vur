// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "contracts/YemoKit/Modules/vat/Vat.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import "../../Helpers/Onlntd.sol";
import "../../Helpers/DPLR.sol";
import "../../Helpers/PY.sol";
import "../../YemoKit.sol";

contract CreateVAT {
    /*
    address public yemoKitAddress;
    address public dplrAddress;
    address public pyAddress;
    IYemoKit yemoKit;
    IDPLR dplr;

    address public vatAddress;

    event VATCreated(address vatAddress);

    constructor(address _yemoKitAddress) {
        require(
            _yemoKitAddress != address(0),
            "YemoKit address cannot be zero"
        );
        yemoKitAddress = _yemoKitAddress;
        yemoKit = IYemoKit(_yemoKitAddress);
        dplrAddress = yemoKit.getDPLR();
        dplr = IDPLR(dplrAddress);
    }

    function _createVAT(address _o) internal {
        // Deploy PY using YemoKit
        pyAddress = yemoKit.dplyPY(_o);
        require(pyAddress != address(0), "Failed to deploy PY");

        bytes memory bytecode = abi.encodePacked(type(Vat).creationCode);

        // Deploy VAT using DPLR
        vatAddress = dplr.dply(bytecode, "VAT");

        // Initialize VAT
        IVat(vatAddress).init(pyAddress, yemoKitAddress);

        // Emit event with the new VAT address
        emit VATCreated(pyAddress);
    }

    function _setImpersonation(address _impersonation) internal {
        yemoKit.setImpersonation(_impersonation);
    }

    function createVAT(address _o) external returns (address, address) {
        _createVAT(_o);
        _setImpersonation(vatAddress);

        return (pyAddress, vatAddress);
    }

    ----------------
    */
}

interface IVATModule {
    function createVAT(string memory _key) external;
}

contract VATModule {
    /*
    address public yka; // YemoKit address
    IYemoKit public yk = IYemoKit(yka); // WETH addressxxw
    mapping(string => ICreateVAT) public createVATs;

    constructor(address _yka) {
        yka = _yka;
    }

    function createVAT(string memory _key, address _o) external {
        require(address(createVATs[_key]) == address(0), "VAT already created");
        createVATs[_key] = new CreateVAT(yka);
        createVATs[_key].createVAT();
        IVAT(createVATs[_key]).init(_o, yka);
    }

    */
}
