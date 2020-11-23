import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Box } from "theme-ui";

class MaterialModal extends Component {
  state = { show: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <>
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            bg: "red",
          }}
        ></Box>
      </>   
    );
  }
}

export default MaterialModal;
