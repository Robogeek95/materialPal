import React, { useEffect } from "react";
import { ThemeProvider } from "theme-ui";
import { useRouter } from "next/router";
import theme from "../lib/theme";

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
