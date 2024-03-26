// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import {MngdC} from "../core/modifers/MngdC.sol";

contract TokenIndexer is MngdC {
    struct TokenInfo {
        uint256 id;
        string name;
        string symbol;
        uint256 totalSupply;
        address contractAddress;
        uint256 chainId;
    }

    uint256 public nextTokenId = 1; // ID'ler 1'den başlayarak artırılacak
    mapping(uint256 => TokenInfo) public tokenInfos; // Token ID'ye göre Token bilgileri
    mapping(string => uint256) private tokenNameToId; // Token adına göre Token ID'si

    // Yeni Token eklemek için güncellenmiş fonksiyon
    function addToken(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply,
        address _contractAddress,
        uint256 _chainId
    ) public {
        // ID otomatik olarak atanır ve artırılır
        uint256 currentId = nextTokenId++;
        tokenInfos[currentId] = TokenInfo(
            currentId,
            _name,
            _symbol,
            _totalSupply,
            _contractAddress,
            _chainId
        );
        tokenNameToId[_name] = currentId;
    }

    // Token ID ile Token bilgilerini sorgulamak için
    function getTokenById(uint256 _id) public view returns (TokenInfo memory) {
        require(tokenInfos[_id].id != 0, "Token does not exist.");
        return tokenInfos[_id];
    }

    // Token adı ile Token bilgilerini sorgulamak için
    function getTokenByName(
        string memory _name
    ) public view returns (TokenInfo memory) {
        uint256 id = tokenNameToId[_name];
        require(id != 0, "Token does not exist.");
        return tokenInfos[id];
    }
}
