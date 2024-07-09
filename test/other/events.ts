import { ethers } from "hardhat"
import { deploy } from "../../utils/tools"
import { Contract } from "ethers"
import { YemoKit, IYemoKit } from "../../utils/clients/yk"

let yemoKitContract: Contract
let yemoKit: IYemoKit
let TestEventSender: Contract

describe("Deploy kit", function () {
    let deployer: any

    this.beforeAll(async function () {
        // get owner (first account)
        ;[deployer] = await ethers.getSigners()
        yemoKitContract = (await deploy("YemoKit", [deployer.address])).contract
        await yemoKitContract.init()
        yemoKit = await YemoKit(yemoKitContract.address)
    })

    it("stream events from", async function () {
        TestEventSender = (await deploy("TestEventSender", [yemoKit.eemt.address])).contract

        setInterval(async () => {
            console.log("Calling function every 10 seconds")
            // Example function call, replace with any actual function you need to call
            try {
                const tx = await TestEventSender.sendTestEvent("ExampleSub", "ExampleData")
                if (tx.hash) {
                    console.log("Transaction sent ")
                }
            } catch (error) {
                console.error("Error calling function", error)
            }
        }, 10000)

        yemoKit.eemt.on("EventLog", (from: string, sub: string, time: number, data: string) => {
            console.log(
                `EventLog received: from=${from}, sub=${sub}, time=${time.toString()}, data=${data}`
            )
        })
        console.log("Listening for EventLog events...")
    })
})
