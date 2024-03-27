// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {MngdC} from "../core/modifers/MngdC.sol";

contract VaultIndexer is MngdC {
    struct VaultInfo {
        uint256 id;
        address vaultAddress;
        string name;
        address owner; // Vault sahibinin adresi
    }

    uint256 public nextVaultId = 1;
    mapping(uint256 => VaultInfo) public vaultInfos;
    mapping(address => uint256) public vaultAddressToId;

    event VaultAdded(
        uint256 indexed id,
        address indexed vaultAddress,
        string name,
        address indexed owner
    );

    // Vault ekleme fonksiyonuna owner parametresi ekleniyor
    function addVault(
        address _vaultAddress,
        string memory _name,
        address _owner
    ) public {
        require(_vaultAddress != address(0), "Vault address cannot be zero");
        require(vaultAddressToId[_vaultAddress] == 0, "Vault already indexed");
        require(_owner != address(0), "Owner address cannot be zero");

        uint256 currentId = nextVaultId++;
        vaultInfos[currentId] = VaultInfo(
            currentId,
            _vaultAddress,
            _name,
            _owner
        );
        vaultAddressToId[_vaultAddress] = currentId;

        emit VaultAdded(currentId, _vaultAddress, _name, _owner);
    }

    function getVaultById(
        uint256 _id
    ) external view returns (VaultInfo memory) {
        require(vaultInfos[_id].id != 0, "Vault does not exist.");
        return vaultInfos[_id];
    }

    function getVaultByAddress(
        address _vaultAddress
    ) external view returns (VaultInfo memory) {
        uint256 id = vaultAddressToId[_vaultAddress];
        require(id != 0, "Vault does not exist.");
        return vaultInfos[id];
    }

    // Vault sahibi bilgisine erişim sağlayan bir fonksiyon
    function getVaultOwnerByAddress(
        address _vaultAddress
    ) external view returns (address) {
        uint256 id = vaultAddressToId[_vaultAddress];
        require(id != 0, "Vault does not exist.");
        return vaultInfos[id].owner;
    }
}
