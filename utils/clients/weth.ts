import { ethers } from "hardhat";
import { fromEther } from "../tools";
import { BigNumber } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

const IYWETH = "contracts/utils/interfaces/tokens/IYWETH.sol:IYWETH";

const toWETH = async (
  signer: SignerWithAddress,
  amount: BigNumber,
  wethAddress: string
): Promise<any> => {
  // Implement deposit function logic here
  try {
    const weth = await ethers.getContractAt(IYWETH, wethAddress);
    const depositResult = await weth.deposit({ value: amount });
    const depositReceipt = await depositResult.wait();
    console.log(
      `WETH deposit transaction hash: ${depositReceipt.transactionHash}`
    );
    return depositReceipt.transactionHash;
  } catch (error) {
    console.error("Error depositing WETH:", error);
    return null;
  }
};

const fromWETH = async (
  signer: SignerWithAddress,
  amount: BigNumber,
  wethAddress: string
): Promise<any> => {
  // Implement withdraw function logic here
  try {
    const weth = await ethers.getContractAt(IYWETH, wethAddress);
    const withdrawResult = await weth.withdraw(amount);
    const withdrawReceipt = await withdrawResult.wait();
    console.log(
      `WETH withdraw transaction hash: ${withdrawReceipt.transactionHash}`
    );
    return withdrawReceipt.transactionHash;
  } catch (error) {
    console.error("Error withdrawing WETH:", error);
    return null;
  }
};

export { toWETH, fromWETH };
