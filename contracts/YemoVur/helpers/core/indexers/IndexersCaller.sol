// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITokenIndexer {
    function getTokenAddressById(uint256 _id) external view returns (address);
}

interface IIndexerRegistry {
    function getIndexerAddress(
        string memory name
    ) external view returns (address);
}

contract IndexersCaller {
    IIndexerRegistry public indexerRegistry;

    constructor(address _indexerRegistryAddress) {
        indexerRegistry = IIndexerRegistry(_indexerRegistryAddress);
    }

    // TokenIndexer'dan belirli bir ID için token adresini al
    function getTokenAddressById(
        uint256 tokenId
    ) public view returns (address) {
        address tokenIndexerAddress = indexerRegistry.getIndexerAddress(
            "TokenIndexer"
        );
        ITokenIndexer tokenIndexer = ITokenIndexer(tokenIndexerAddress);
        return tokenIndexer.getTokenAddressById(tokenId);
    }
}
