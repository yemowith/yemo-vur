// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import {Ownable, Initializable, AdminAble, Pausable} from "../abilities.sol"; // MngdC kontratının yolu doğru olmalıdır.

contract VaultIndexer is AdminAble {
    struct VaultInfo {
        uint256 id;
        address walletAddress;
        address pyAddress;
        address ownerAddress;
        bytes32 salt;
    }

    uint256 public nextVaultId = 1;
    mapping(uint256 => VaultInfo) public vaultInfos;

    event VaultAdded(
        uint256 indexed id,
        address indexed walletAddress,
        address indexed ownerAddress
    );

    function addVault(
        address _walletAddress,
        address _pyAddress,
        address _ownerAddress,
        bytes32 _salt
    ) public {
        uint256 currentId = nextVaultId++;
        vaultInfos[currentId] = VaultInfo(
            currentId,
            _walletAddress,
            _pyAddress,
            _ownerAddress,
            _salt
        );

        emit VaultAdded(currentId, _walletAddress, _ownerAddress);
    }

    function getVaultById(uint256 _id) public view returns (VaultInfo memory) {
        require(vaultInfos[_id].id != 0, "Vault does not exist.");
        return vaultInfos[_id];
    }
}
