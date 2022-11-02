import { NextPage } from "next";
import useSWR from "swr";

import Wrapper from "@components/wrapper";
import Seo from "@components/seo";
import { useEffect, useState } from "react";
import { buildTokenIdParams } from "@lib/utils";

const REFRESH_RATE = 1000 * 30;
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const MiamiPage: NextPage = () => {
  const [shouldRefresh, setShouldRefresh] = useState(true);
  const tokenIds = [0, 1, 45];
  const tokenIdsParams = buildTokenIdParams(tokenIds);

  const { data, error } = useSWR(
    "/api/minter/check-minted?" + tokenIdsParams,
    fetcher,
    {
      refreshInterval: shouldRefresh ? REFRESH_RATE : 0,
      revalidateOnFocus: shouldRefresh,
    }
  );

  useEffect(() => {
    // if all tokens have been minted, stop pinging the api
    const allMinted = data?.tokensMinted.every((b: boolean) => b);
    if (allMinted) setShouldRefresh(false);
  }, [data]);

  return (
    <Wrapper>
      <Seo title="Miami" />
      {/* <div className="text-center">{data && data[0].quote}</div> */}
    </Wrapper>
  );
};
export default MiamiPage;
