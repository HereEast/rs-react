import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { Home } from "../src/components/pages/Home";
import { LIMIT, MIN_PAGE } from "../src/constants";

function Index(): ReactElement {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && !router.query.limit && !router.query.page) {
      router.push({
        pathname: "/",
        query: {
          limit: LIMIT,
          page: MIN_PAGE,
        },
      });
    }
  }, [router, router.isReady]);

  return <Home />;
}

export default Index;
