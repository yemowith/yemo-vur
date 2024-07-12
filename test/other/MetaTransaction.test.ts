import { expect } from "chai"
import { ethers } from "hardhat"
import { MetaTransaction, MockContract } from "../../typechain-types"
import { Contract } from "ethers"

describe("MetaTransaction", function () {
    let metaTransaction: Contract
    let mockContract: Contract
    let owner: any
    let relayer: any
    let user: any

    beforeEach(async function () {
        ;[owner, relayer, user] = await ethers.getSigners()

        console.log("Deploying MetaTransaction contract...")
        const MetaTransactionFactory = await ethers.getContractFactory("MetaTransaction", owner)
        metaTransaction = (await MetaTransactionFactory.deploy()) as MetaTransaction
        await metaTransaction.deployed()
        console.log("MetaTransaction contract deployed at:", metaTransaction.address)

        console.log("Deploying MockContract...")
        const MockContractFactory = await ethers.getContractFactory("MockContract", owner)
        mockContract = (await MockContractFactory.deploy()) as MockContract
        await mockContract.deployed()
        console.log("MockContract deployed at:", mockContract.address)
    })

    it("should execute meta transaction", async function () {
        console.log("Fetching nonce for user...")
        const nonce = await metaTransaction.nonces(user.address)
        console.log("Nonce fetched:", nonce.toString())

        console.log("Encoding function data for mockFunction...")
        const functionSignature = mockContract.interface.encodeFunctionData("mockFunction", [42])
        console.log("Function signature encoded:", functionSignature)

        console.log("Creating message hash...")
        const messageHash = ethers.utils.solidityKeccak256(
            ["uint256", "address", "bytes"],
            [nonce, metaTransaction.address, functionSignature]
        )
        console.log("Message hash created:", messageHash)

        console.log("Signing message hash...")
        const signature = await user.signMessage(ethers.utils.arrayify(messageHash))
        const { r, s, v } = ethers.utils.splitSignature(signature)
        console.log("Signature:", { r, s, v })

        console.log("Checking relayer balance...")
        const relayerBalance = await ethers.provider.getBalance(relayer.address)
        console.log("Relayer balance:", ethers.utils.formatEther(relayerBalance), "ETH")

        const gasLimit = 1000000 // Manuel olarak belirlenen gas limiti
        console.log("Manually set gas limit:", gasLimit)

        console.log("Executing meta transaction...")
        try {
            const tx = await metaTransaction.executeMetaTransaction(
                user.address,
                functionSignature,
                r,
                s,
                v,
                {
                    gasLimit: gasLimit,
                }
            )
            const receipt = await tx.wait()
            console.log("Transaction executed. Receipt:")
            console.log(receipt)

            // İşlemin başarılı olup olmadığını kontrol edin
            const events = receipt.events?.filter((x) => {
                return x.event == "MetaTransactionExecuted"
            })
            expect(events).to.not.be.undefined
            // @ts-ignore
            expect(events.length).to.be.greaterThan(0)
            console.log("Meta transaction executed and event emitted successfully.")
        } catch (error) {
            console.error("Transaction failed:", error)
        }
    })
})
