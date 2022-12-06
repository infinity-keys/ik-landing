import { URL_ORIGIN } from "./constants";
import { PuzzleApiResponse, Guess } from "./types";

export const ikApiUrlBase = new URL(`${URL_ORIGIN}/api/`);

// Client
export const puzzlePost = async ({
  puzzleId,
  code,
}: Guess): Promise<PuzzleApiResponse> => {
  const url = new URL(`check/code/${puzzleId}`, ikApiUrlBase);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });
  return await res.json();
};

export const formSubmit = async ({ data }: { data: unknown }) => {
  const url = new URL("submission", ikApiUrlBase);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};

export const deleteUser = async (jwt: string) => {
  const url = new URL("users", ikApiUrlBase);

  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jwt }),
  });

  return res;
};

export const checkIfClaimed = async (account: string, tokenId: number) => {
  const url = new URL("minter/check-claimed", ikApiUrlBase);
  url.searchParams.set("account", account);
  url.searchParams.set("tokenId", tokenId.toString());

  const response = await fetch(url);
  if (response.ok || response.status === 403) return await response.json();
  else throw await response.text();
};

export const verify = async (
  account: string,
  tokenId: number,
  chain: number
) => {
  //If pack (requires other NFTs) include gated, if single ignore
  const url = new URL("minter/verify", ikApiUrlBase);
  url.searchParams.set("account", account);
  url.searchParams.set("tokenId", tokenId.toString());
  url.searchParams.set("chainId", chain.toString());

  const response = await fetch(url);

  if (response.ok) {
    const { signature, claimedTokens } = await response.json();
    return { signature, claimedTokens };
  }

  throw await response.text();
};

export const walletAgeChecker = async (account: string, chainId: number) => {
  const url = new URL("minter/check-wallet-age", ikApiUrlBase);
  url.searchParams.set("account", account);
  url.searchParams.set("chainId", chainId.toString());

  const response = await fetch(url);
  if (response.ok) return await response.json();
  throw response.text();
};

export const nftChecker = async (
  account: string,
  chainId: number,
  contractAddress: string,
  tokenId: number,
  successRoute: string,
  finalStep: boolean
) => {
  const url = new URL("minter/check-nft", ikApiUrlBase);
  url.searchParams.set("account", account);
  url.searchParams.set("chainId", chainId.toString());
  url.searchParams.set("contractAddress", contractAddress);
  if (tokenId) url.searchParams.set("tokenId", tokenId.toString());
  url.searchParams.set("successRoute", successRoute);
  url.searchParams.set("finalStep", finalStep.toString());

  const response = await fetch(url);
  if (response.ok) return await response.json();
  return false;
};
