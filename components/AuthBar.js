import { Box, Button, Flex, Grid, Link, Spinner, Text } from "theme-ui";
import { useAuth } from "../hooks/useAuth";
import Avatar from "react-avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faExternalLinkAlt,
  faExternalLinkSquareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Component, useRef, useState } from "react";
import { useRouter } from "next/router";
import BarModal from "./barModal";

const AuthBar = () => {
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const displayAreaRef = useRef(null);

  if (!auth.user) {
    return (
      <Box
        sx={{
          columnGap: "15px",
          // height: "50px",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Grid
          columns={2}
          sx={{ height: "50px", display: ["none", "none", "none", "grid"] }}
          gap={[3]}
        >
          <Button
            as="a"
            href="/login"
            target="_self"
            variant="outlineRoundedLg"
          >
            LogIn
          </Button>
          <Button as="a" href="/signup" target="_self" variant="roundedLg">
            SignUp
          </Button>
        </Grid>

        <Box
          id="authBox"
          sx={{
            display: ["block", "block", "block", "none"],
            cursor: "pointer",
          }}
          onClick={() => setOpen(true)}
        >
          <Avatar
            email="azeezlukman95@gmail.com"
            size={40}
            //   githubHandle="robogeek95"
            round
          />
        </Box>

        <BarModal
          isOpen={open}
          displayAreaRef={displayAreaRef}
          parentRef={boxRef}
          onClose={() => setOpen(false)}
          parentID="authBox"
        >
          {/* <ModalAuth
            onClose={() => setOpen(false)}
            reference={displayAreaRef}
          />
           */}
          <Box
            ref={displayAreaRef}
            sx={{
              boxShadow: "picker",
              position: "absolute",
              bg: "gray100",
              borderRadius: "default",
              p: 4,
              mt: 4,
              right: "30px",
            }}
          >
            <Button
              as="a"
              href="/login"
              target="_self"
              variant="outlineRoundedLg"
              mr={3}
            >
              LogIn
            </Button>
            <Button as="a" href="/signup" target="_self" variant="roundedLg">
              SignUp
            </Button>
          </Box>
        </BarModal>
      </Box>
    );
  }

  return (
    <Flex
      sx={{
        columnGap: "15px",
        height: "50px",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <Button
        sx={{ display: ["none", null, null, "flex"] }}
        as="a"
        href="/materials/upload"
        target="_self"
        variant="roundedLg"
      >
        Upload
      </Button>

      <CustomDropDown auth={auth} />
    </Flex>
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
            <Box
              sx={{
                display: ["none", null, null, "flex"],
                alignItems: "center",
              }}
            >
              <Text mx={[2]}>{this.user.fname}</Text>
              <Box sx={{ width: "20px" }}>
                {isOpen ? (
                  <FontAwesomeIcon icon={faCaretUp} />
                ) : (
                  <FontAwesomeIcon icon={faCaretDown} />
                )}
              </Box>
            </Box>
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
            <Button
              sx={{ display: ["flex", null, null, "none"] }}
              as="a"
              href="/materials/upload"
              target="_self"
              variant="roundedLg"
              mb={3}
            >
              Upload
            </Button>

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

                <Box sx={{ width: "20px" }}>
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
