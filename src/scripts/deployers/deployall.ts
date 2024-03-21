import { ethers } from "hardhat";
import { getChainId } from "../../../utils/tools";
import AddresHelperDeployer from "./common/AddresHelperDeployer";
import {
  addressHelperSDK,
  getAddress,
  getOrDeploy,
} from "../../../utils/stores/addressesStore";

async function all() {
  const chainId = (await getChainId()).chainIdStr;
  const encodeCode = (code: string, chainId: string) =>
    ethers.utils.defaultAbiCoder.encode(["string", "string"], [code, chainId]);
  const AddressHelper = await getOrDeploy(
    "AddressesHelpers",
    chainId,
    AddresHelperDeployer
  );

  const sdk = await addressHelperSDK(AddressHelper);
  await sdk?.syncAddresses();
}

all().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
