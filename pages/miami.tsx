import { NextPage } from "next";
import useSWR from "swr";

import Wrapper from "@components/wrapper";
import Seo from "@components/seo";
import { useEffect, useState } from "react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const MiamiPage: NextPage = () => {
  const [count, setCount] = useState(0);

  const { data, error } = useSWR("/api/gottacheckemall", fetcher, {
    refreshInterval: count < 4 ? 2000 : 0,
    revalidateOnFocus: count < 4,
  });

  useEffect(() => {
    setCount((c) => c + 1);
  }, [data]);

  return (
    <Wrapper>
      <Seo title="Miami" />
      <p>{count}</p>
      <div className="text-center">{data && data[0].quote}</div>
    </Wrapper>
  );
};
export default MiamiPage;
