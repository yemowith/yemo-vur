import assetList from "../assetList.json";
export interface Asset {
  symbol: string;
  addresses: { [key: string]: string };
  decimals: number;
}

export function getAssetAddress(
  symbol: string,
  network: string = "1"
): string | null {
  const asset = assetList.find((asset) => asset.symbol === symbol) as
    | Asset
    | undefined;

  if (asset && Object.prototype.hasOwnProperty.call(asset.addresses, network)) {
    const address = asset.addresses[network];
    console.log(`Address of ${symbol} on network ${network}:`, address);
    return address;
  } else {
    console.error(
      `Asset with symbol ${symbol} not found or not available on network ${network}.`
    );
    return null;
  }
}
