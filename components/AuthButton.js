import { Button, Spinner } from "theme-ui";

const AuthButton = ({ isLoading, title, children, ...buttonProps }) => {
  return (
    <Button {...buttonProps}>
      {isLoading ? (
        <Spinner width="20" fill="white" className="animate-spin" />
      ) : (
        ""
      )}
      {children}
    </Button>
  );
};

export default AuthButton;
