import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import React from "react";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import theme from "../theme";
import Header from "../components/Header";

import SEO from "../next-seo.config";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <link rel="icon" href="/favicon.ico" />
        <title>Ladl</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <React.StrictMode>
        <ChakraProvider resetCSS theme={theme}>
          <ColorModeProvider
            value="light"
            options={{
              initialColorMode: "light",
              useSystemColorMode: true,
            }}
          >
            <Header />
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
          </ColorModeProvider>
        </ChakraProvider>
      </React.StrictMode>
    </>
  );
}
