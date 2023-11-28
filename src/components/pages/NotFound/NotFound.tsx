import { ReactElement } from "react";
import { useRouter } from "next/router";
import { Message } from "../../Message";
import { Button } from "../../Button";

function NotFound(): ReactElement {
  const router = useRouter();

  function navigateBack(): void {
    router.push({
      pathname: "/",
      query: { limit: router.query.limit, page: router.query.page },
    });
  }

  return (
    <Message message="Page not found (404)">
      <Button name="Back to main" onClick={navigateBack} />
    </Message>
  );
}

export default NotFound;
