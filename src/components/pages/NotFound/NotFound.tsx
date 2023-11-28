import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { Message } from "../../Message";
import { Button } from "../../Button";

function NotFound(): ReactElement {
  const navigate = useNavigate();

  function navigateBack(): void {
    navigate("/");
    location.reload();
  }

  return (
    <Message message="Page not found (404)">
      <Button name="Back to main" onClick={navigateBack} />
    </Message>
  );
}

export default NotFound;
