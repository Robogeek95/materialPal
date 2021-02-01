import React, { Component } from "react";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/core";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  IconButton,
  Image,
  Input,
  Link,
  Text,
} from "theme-ui";
import theme from "../lib/theme";
import ScrollLock from "react-scrolllock";
import NextLink from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import AuthBar from "./AuthBar";
import SearchBox from "./searchBox";

const rgbaBgColor = (props, opacity) =>
  `rgba(
    ${props.bgColor[0]},
    ${props.bgColor[1]},
    ${props.bgColor[2]},
    ${opacity}
  )`;

const unfixed = (props) =>
  !props.unfixed &&
  css`
    position: absolute;
    top: 0;
  `;
// const bg = (props) =>
//   props.dark
//     ? css`
//         -webkit-backdrop-filter: saturate(90%) blur(20px);
//         backdrop-filter: saturate(90%) blur(20px);
//       `
//     : css`
//         -webkit-backdrop-filter: saturate(180%) blur(20px);
//         backdrop-filter: saturate(180%) blur(20px);
//       `
const fixed = (props) =>
  (props.scrolled || props.toggled || props.fixed) &&
  css`
    position: fixed;
    background-color: ${rgbaBgColor(props, 0.96875)};
    border-bottom: 1px solid rgba(48, 48, 48, 0.125);
    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
      background-color: ${props.transparent
        ? "transparent"
        : rgbaBgColor(props, 0.75)};
      -webkit-backdrop-filter: saturate(180%) blur(20px);
      backdrop-filter: saturate(180%) blur(20px);
      /* {bg}; to support dark mode later */
    }
  `;

const Root = styled(Box)`
  ${unfixed};
  width: 100%;
  z-index: 1000;
  ${fixed};
  @media print {
    display: none;
  }
`;

const hoverColor = (name) =>
  ({
    white: "smoke",
    smoke: "muted",
    muted: "slate",
    slate: "black",
    black: "slate",
    primary: "error",
  }[name] || "black");

const slide = keyframes({
  from: { transform: "translateY(-25%)", opacity: 0 },
  to: { transform: "translateY(0)", opacity: 1 },
});

const layout = (props) =>
  props.isMobile
    ? css`
        display: ${props.toggled ? "flex" : "none"};
        flex-direction: column;
        overflow-y: auto;
        text-align: left;
        height: 100vh;
        @media (prefers-reduced-motion: no-preference) {
          animation: ${slide} 0.25s ease-in;
        }
        a {
          color: ${theme.colors[props.dark ? "white" : "black"]} !important;
          margin: 0 auto;
          height: 64px;
          font-weight: bold;
          font-size: ${theme.fontSizes[2]}px;
          width: 100%;
          max-width: 18rem;
          &:not(:last-child) {
            border-bottom: 1px solid rgba(48, 48, 48, 0.125);
          }
          @media screen and (max-width: 22em) {
            max-width: 16rem;
          }
        }
      `
    : css`
        @media (min-width: 56em) {
          display: flex;
        }
        a {
          font-size: ${theme.fontSizes[1]}px;
          text-transform: uppercase;
          &:hover {
            color: ${theme.colors[hoverColor(props.color)]};
          }
        }
      `;

// const layout2
const NavBar = styled(Box)`
  display: none;
  ${layout};
  a {
    font-size: ${theme.fontSizes[3]}px;
    margin-left: ${theme.space[3]}px;
    padding: ${theme.space[3]}px;
    text-decoration: none;
    @media (min-width: 56em) {
      color: ${(props) => theme.colors[props.color] || props.color};
    }
  }
`;

const Bar = css`
  a {
    font-size: ${theme.fontSizes[1]}px;
    text-transform: uppercase;
    &:hover {
    }
  }
`;

const Navigation = (props) => (
  <NavBar role="navigation" {...props}>
    <Link href="#" children="About " />
    <Link href="#" children="Contact" />
  </NavBar>
);

const ToggleContainer = styled(Flex)`
  align-items: center;
  justify-content: center;
  min-height: 44px;
  cursor: pointer;
  user-select: none;
  margin-left: auto;
  @media (min-width: 56em) {
    display: none;
  }
`;

class Header extends Component {
  state = {
    scrolled: false,
    toggled: false,
  };

  static defaultProps = {
    color: "white",
  };

  componentDidMount() {
    this.bindScroll(true);
    if (typeof window !== "undefined") {
      const mobileQuery = window.matchMedia("(max-width: 48em)");
      mobileQuery.addListener(() => {
        this.setState({ mobile: true, toggled: false });
      });
    }
  }

  componentWillUnmount = () => {
    this.bindScroll(false);
  };

  bindScroll = (add) => {
    if (typeof window !== "undefined" && !this.props.unfixed) {
      window[add ? "addEventListener" : "removeEventListener"](
        "scroll",
        this.onScroll
      );
    }
  };

  onScroll = () => {
    const newState = window.scrollY >= 16;
    const { scrolled: oldState } = this.state;

    if (newState !== oldState) {
      this.setState({ scrolled: newState });
    }
  };

  handleToggleMenu = () => {
    this.setState((state) => ({ toggled: !state.toggled }));
  };

  render() {
    const { color, fixed, bgColor, dark, ...props } = this.props;
    const { mobile, scrolled, toggled } = this.state;
    const baseColor = scrolled ? "dark500" : "dark400";
    const toggleColor = scrolled ? "dark500" : "dark400";

    return (
      <Root
        {...props}
        key="nav"
        fixed={fixed}
        scrolled={scrolled}
        toggled={toggled}
        dark={dark}
        bgColor={bgColor || (dark ? [32, 34, 36] : [255, 255, 255])}
        as="header"
      >
        <Container
          sx={{
            // display: ["flex", "flex", null, "block"],
            alignItems: "center",
            py: 2,
          }}
        >
          <Grid
            columns={["auto auto auto auto", null, null, "0.5fr  1fr 0.5fr"]}
            sx={{ alignItems: "center" }}
          >
            <Flex sx={{ alignItems: "center" }}>
              <Link sx={{ cursor: "pointer" }} href="/">
                <Image src="/materialpal.svg" />
              </Link>

              <Navigation
                sx={{ display: ["none", "none", "none", "flex"] }}
                color={props.color}
                as="nav"
              />
            </Flex>
            <Box>
              <SearchBox />
            </Box>

            {/* authBtn */}
            <Box
              sx={{
                alignItems: "center",
                justifyContent: "center",
                justifySelf: "end",
              }}
            >
              <AuthBar />
            </Box>

            <ToggleContainer
              color={toggleColor}
              onClick={this.handleToggleMenu}
              sx={{ width: "20px" }}
            >
              <FontAwesomeIcon icon={toggled ? faTimes : faBars} />
            </ToggleContainer>
          </Grid>
        </Container>
        <Navigation
          as="nav"
          aria-hidden={!mobile}
          isMobile
          toggled={toggled}
          color={baseColor}
          dark={dark}
        />
        {toggled && <ScrollLock />}
      </Root>
    );
  }
}

export default Header;
