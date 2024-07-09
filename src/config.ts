const configs = {
    contracts: {
        ContractFactory: "0x4E88cda20CaB92d64e115b83212cf93E8D200c8c",
    },
}

function contractOf(key: string): string | undefined {
    return configs.contracts[key]
}

export { contractOf, configs }
