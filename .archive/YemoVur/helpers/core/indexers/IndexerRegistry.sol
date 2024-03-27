// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IndexerRegistry {
    mapping(string => address) private indexers;

    event IndexerAdded(string indexed name, address indexed indexerAddress);
    event IndexerRemoved(string indexed name);

    // Indexer eklemek için
    function addIndexer(string memory name, address indexerAddress) public {
        require(indexerAddress != address(0), "Invalid indexer address");
        require(indexers[name] == address(0), "Indexer already exists");
        indexers[name] = indexerAddress;
        emit IndexerAdded(name, indexerAddress);
    }

    // Indexer kaldırmak için
    function removeIndexer(string memory name) public {
        require(indexers[name] != address(0), "Indexer does not exist");
        emit IndexerRemoved(name);
        delete indexers[name];
    }

    // Indexer adresini sorgulamak için
    function getIndexerAddress(
        string memory name
    ) public view returns (address) {
        require(indexers[name] != address(0), "Indexer does not exist");
        return indexers[name];
    }
}
