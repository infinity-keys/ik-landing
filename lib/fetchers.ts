import { PuzzleApiResponse, Guess } from "./types";

// Client
export const puzzlePost = async ({
  puzzleId,
  code,
}: Guess): Promise<PuzzleApiResponse> => {
  const res = await fetch(`/api/check/code/${puzzleId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });
  return await res.json();
};

export const formSubmit = async ({ data }: { data: unknown }) => {
  const res = await fetch("/api/submission", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res;
};

export const checkIfClaimed = async (account: string, tokenId: number) => {
  // const url = `/api/minter/check-claimed?account=${account}&tokenId=${tokenId?.toString()}`;
  const url = new URL("/api/minter/check-claimed", window.location.origin);
  url.searchParams.set("account", account);
  url.searchParams.set("tokenId", tokenId.toString());

  const response = await fetch(url);
  if (response.ok) return (await response.json()).claimed;
  else throw await response.text();
};

export const verify = async (
  account: string,
  tokenId: number,
  chain: number,
  gatedIds: number[]
) => {
  // const gatedIdsString = `&${gatedIds.map((id) => `gatedIds=${id}`).join("&")}`;
  //If pack (requires other NFTs) include gated, if single ignore
  // const url = `/api/minter/verify?account=${account}&tokenId=${tokenId.toString()}&chainId=${chain.toString()}${
  //   gatedIds.length ? gatedIdsString : ""
  // }`;
  const url = new URL("/api/minter/verify", window.location.origin);
  url.searchParams.set("account", account);
  url.searchParams.set("tokenId", tokenId.toString());
  url.searchParams.set("chainId", chain.toString());
  gatedIds.forEach((id) => url.searchParams.append("gatedIds", id.toString()));

  const response = await fetch(url);
  if (response.ok) {
    const { signature } = await response.json();
    return signature;
  }

  throw await response.text();
};
