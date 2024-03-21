import hre from "hardhat"
import { wt } from "./deployer"

async function main(): Promise<void> {
    // Kontratın adresi
    const emitterAddress: string = process.env.EMMITER_ADDRESS || ""
    const isTest = true
    console.log(`Emitter Address: ${emitterAddress}`)

    let ev: any = emitterAddress
        ? await hre.ethers.getContractAt("EventEmitter", emitterAddress)
        : null

    const tester = async () => {
        const { ev, tev } = await wt()
        // ethers.js aracılığıyla kontrata bağlan

        setInterval(async () => {
            console.log("Calling function every 10 seconds")
            // Example function call, replace with any actual function you need to call
            try {
                const tx = await tev.sendTestEvent("ExampleSub", "ExampleData")
                if (tx.hash) {
                    console.log("Transaction sent ")
                }
            } catch (error) {
                console.error("Error calling function", error)
            }
        }, 10000)
    }

    if (isTest) await tester()

    if (!ev) {
        throw new Error("EventEmitter contract not found")
    }

    // EventLog olayını dinle
    ev.on(
        "EventLog",
        (from: string, sub: string, time: number, data: string) => {
            console.log(
                `EventLog received: from=${from}, sub=${sub}, time=${time.toString()}, data=${data}`,
            )
        },
    )

    console.log("Listening for EventLog events...")
}

main().catch((error: Error) => {
    console.error(error)
    process.exitCode = 1
})
