const configs = {
    contracts: {
        YProxy: "0x7A9dEB5a2756df40F79CEDa67f1F0378Af4dDD4d",
        YExecutor: "0xabAaa67034033F913Ea94b565c538a2D4D95a048",
        YDeployer: "0x44aa4A034676270DbD2803f139b6114369B636cF",
        YEncoder: "0x8C58525F44c91FfF3972eB024Ea547B1F919a916",
    },
}

function contractOf(key: string): string | undefined {
    return configs.contracts[key]
}

export { contractOf, configs }
