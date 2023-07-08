import { CreatePasswordForm } from "features/create-password";
import { useParams } from "react-router-dom";

export const CreatePasswordPage = () => {
  const { resetCode } = useParams<{ resetCode?: string }>();

  if (!resetCode) {
    return <p>invalid reset key</p>;
  }

  return (
    <div>
      <CreatePasswordForm resetCode={resetCode} />
    </div>
  );
};
