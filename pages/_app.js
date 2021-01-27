import React, { useEffect } from "react";
import { ThemeProvider } from "theme-ui";
import { useRouter } from "next/router";
import theme from "../lib/theme";
import { AuthProvider } from "../hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";
import "../styles/styles.css";
import Head from "next/head";

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <>
      <div>
        <Head>
          <title>Test</title>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/instantsearch.css@7/themes/algolia-min.css"
          />
        </Head>
      </div>

      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
};

export default App;
