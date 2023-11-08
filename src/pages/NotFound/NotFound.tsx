import { ReactElement } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Message } from "../../components/Message";
import { Button } from "../../components/Button";

function NotFound(): ReactElement {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  function navigateBack(): void {
    navigate(`/?${searchParams.toString()}`);
    location.reload();
  }

  return (
    <Message message="Page not found (404)">
      <Button name="Back to main" onClick={navigateBack} />
    </Message>
  );
}

export default NotFound;
