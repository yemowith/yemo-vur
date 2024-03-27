// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable, AdminAble, IOwnable, IAdminAble} from "../abilities.sol";

interface IModuleRegistry is IOwnable, IAdminAble {
    // ModuleInfo yapısı dışarıdan erişilemez, bu yüzden ilgili bilgileri döndüren fonksiyonları tanımlayabiliriz.
    event ModuleAdded(
        uint256 indexed id,
        string indexed code,
        address indexed moduleAddress
    );
    event ModuleRemoved(uint256 indexed id, string indexed code);

    function addModule(
        string calldata code,
        string calldata name,
        string calldata groupName,
        bool isInternal,
        address moduleAddress
    ) external;

    function removeModule(string calldata code) external;

    // Struct döndüremeyeceğimiz için, ModuleInfo bilgilerini döndüren ayrı fonksiyonlar gerekebilir.
    function getModuleById(
        uint256 id
    )
        external
        view
        returns (
            uint256,
            string memory,
            string memory,
            string memory,
            bool,
            address
        );

    function getModuleByCode(
        string calldata code
    )
        external
        view
        returns (
            uint256,
            string memory,
            string memory,
            string memory,
            bool,
            address
        );
}

contract ModuleRegistry is Ownable, AdminAble {
    struct ModuleInfo {
        uint256 id; // Modül için benzersiz bir ID
        string code;
        string name;
        string groupName;
        bool isInternal;
        address moduleAddress;
    }

    uint256 private nextModuleId = 1; // Otomatik ID ataması için sayaç
    mapping(uint256 => ModuleInfo) public modulesById; // ID'ye göre modül bilgileri
    mapping(string => uint256) private moduleIdByCode; // Kod'a göre modül ID'si

    event ModuleAdded(
        uint256 indexed id,
        string indexed code,
        address indexed moduleAddress
    );
    event ModuleRemoved(uint256 indexed id, string indexed code);

    // Yeni bir modül eklemek için fonksiyon
    function addModule(
        string memory code,
        string memory name,
        string memory groupName,
        bool isInternal,
        address moduleAddress
    ) public {
        require(moduleAddress != address(0), "Invalid module address");
        require(moduleIdByCode[code] == 0, "Module already exists");

        uint256 moduleId = nextModuleId++;
        modulesById[moduleId] = ModuleInfo(
            moduleId,
            code,
            name,
            groupName,
            isInternal,
            moduleAddress
        );
        moduleIdByCode[code] = moduleId;

        emit ModuleAdded(moduleId, code, moduleAddress);
    }

    // Bir modülü kaldırmak için fonksiyon
    function removeModule(string memory code) public {
        uint256 moduleId = moduleIdByCode[code];
        require(moduleId != 0, "Module does not exist");

        emit ModuleRemoved(moduleId, code);

        delete modulesById[moduleId];
        delete moduleIdByCode[code];
    }

    // Bir modülün bilgilerini ID'ye göre sorgulamak için fonksiyon
    function getModuleById(uint256 id) public view returns (ModuleInfo memory) {
        require(
            id < nextModuleId && modulesById[id].moduleAddress != address(0),
            "Module does not exist"
        );
        return modulesById[id];
    }

    // Bir modülün bilgilerini koduna göre sorgulamak için fonksiyon
    function getModuleByCode(
        string memory code
    ) public view returns (ModuleInfo memory) {
        uint256 id = moduleIdByCode[code];
        require(id != 0, "Module does not exist");
        return getModuleById(id);
    }
}
