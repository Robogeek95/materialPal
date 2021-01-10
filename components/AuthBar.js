import { Box, Button, Flex, Link, Spinner, Text } from "theme-ui";
import { useAuth } from "../hooks/useAuth";
import Avatar from "react-avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faExternalLinkAlt,
  faExternalLinkSquareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Component } from "react";
import { useRouter } from "next/router";

const AuthBar = () => {
  const auth = useAuth();

  if (!auth.user) {
    return (
      <Box
        sx={{
          display: ["none", "flex", "flex"],
          columnGap: "15px",
          height: "50px",
          mx: "auto",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button as="a" href="/login" target="_self" variant="outlineRoundedLg">
          LogIn
        </Button>

        <Button as="a" href="/signup" target="_self" variant="roundedLg">
          SignUp
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: ["none", "flex", "flex"],
        columnGap: "15px",
        height: "50px",
        mx: "auto",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Button as="a" href="/upload" target="_self" variant="roundedLg">
        Upload
      </Button>

      <CustomDropDown auth={auth} />
    </Box>
  );
};

export default AuthBar;

class CustomDropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  auth = this.props.auth;

  user = this.props.auth.user;
  componentDidMount() {
    //Assign click handler to listen the click to close the dropdown when clicked outside
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    //Remove the listener
    document.removeEventListener("click", this.handleClickOutside);
  }

  //If click is outside the dropdown button or display area
  //Close the dropdown
  handleClickOutside(event) {
    // const { path } = event;
    // if (
    //   !path.includes(this.displayAreaRef) &&
    //   !path.includes(this.dropTogglerRef)
    // ) {
    //   this.setState({
    //     isOpen: false,
    //   });
    // }
  }

  //DropDown toggler
  toggleDropDown() {
    const { isOpen } = this.state;

    this.setState({
      isOpen: !isOpen,
    });
  }

  //To control component
  componentDidUpdate() {}

  signOut() {
    this.auth.signOut();
  }

  render() {
    const { label, children, color } = this.props;
    const { isOpen } = this.state;

    return (
      <>
        <Box
          onClick={this.toggleDropDown}
          ref={(ref) => (this.dropTogglerRef = ref)}
          sx={{ cursor: "pointer" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              name={`${this.user.fname} ${this.user.lname}`}
              email="azeezlukman95@gmail.com"
              size={45}
              //   githubHandle="robogeek95"
              round
            />
            <Text mx={[2]}>{this.user.fname}</Text>
            {isOpen ? (
              <FontAwesomeIcon icon={faCaretUp} />
            ) : (
              <FontAwesomeIcon icon={faCaretDown} />
            )}
          </Box>
        </Box>

        {isOpen && (
          <Box
            sx={{
              position: "absolute",
              backgroundColor: "gray100",
              // width: "100%",
              mt: [7],
              p: [4],
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "primary",
              borderRadius: "7px",
            }}
            ref={(ref) => (this.displayAreaRef = ref)}
          >
            {/* <Text> {`${this.user.fname} ${this.user.lname}`} </Text> */}
            <Text variant="lead">{`${this.user.email}`} </Text>

            <Link href="#" sx={{ textDecoration: "none" }}>
              <Box
                mt="2"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box>
                  <Text>Account Settings</Text>
                  <Text variant="smallText" color="dark300">
                    Manage your account
                  </Text>
                </Box>

                <Box>
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </Box>
              </Box>
            </Link>

            <Button mt={2} variant={"textButton"} onClick={this.signOut}>
              Sign out
            </Button>
          </Box>
        )}
      </>
    );
  }
}
