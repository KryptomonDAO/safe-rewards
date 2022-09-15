import { BaseTransaction } from "@gnosis.pm/safe-apps-sdk";
import { ethers } from "ethers";

import { AssetTransfer, CollectibleTransfer } from "../parser/csvParser";
import { toWei } from "../utils";

import { erc1155Interface } from "./erc1155";
import { erc20Interface } from "./erc20";
import { erc721Interface } from "./erc721";
import { daoFacetInterface } from "./kmonft";

export function buildAssetTransfers(transferData: AssetTransfer[]): BaseTransaction[] {
  const txList: BaseTransaction[] = [];
  return txList;
}

export function buildCollectibleTransfers(transferData: CollectibleTransfer[]): BaseTransaction[] {
  const txList: BaseTransaction[] = transferData.map((transfer) => {
    if (transfer.token_type === "erc721") {
      return {
        to: transfer.tokenAddress,
        value: "0",
        data: erc721Interface.encodeFunctionData("safeTransferFrom", [
          transfer.from,
          transfer.receiver,
          transfer.tokenId,
        ]),
      };
    } else {
      return {
        to: transfer.tokenAddress,
        value: "0",
        //@ts-ignore
        data: daoFacetInterface.encodeFunctionData("mintItems", [
          transfer.receiver,
          [transfer.tokenId],
          [transfer.amount?.toFixed()],
        ]),
      };
    }
  });
  return txList;
}
