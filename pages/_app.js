import React, { useEffect } from "react";
import { ThemeProvider } from "theme-ui";
import { useRouter } from "next/router";
import theme from "../lib/theme";
import { AuthProvider } from "../hooks/useAuth";

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
