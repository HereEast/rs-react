import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { Message } from "../../components/Message";
import { Button } from "../../components/Button";

function NotFound(): ReactElement {
  const navigate = useNavigate();

  function navigateBack(): void {
    navigate("/");
    // location.reload();
  }

  return (
    <Message message="Page not found (404)">
      <Button name="Back to main" onClick={navigateBack} />
    </Message>
  );
}

export default NotFound;
