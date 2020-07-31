import { css, Global } from "@emotion/core"
import Document, { Head, Html, Main, NextScript } from "next/document"

const GlobalStyles = () => (
  <Global
    styles={css`
      :root {
        --light: #f7f7f7;
        --dark: #1a1a1a;
        --med: #808080;
        --interactive: rgb(0, 150, 255);
        --interactive-alpha: rgb(0, 150, 255, 0.25);
        --focus: #f3bf4e;
        --danger: rgb(227, 61, 38);
        --safety: #579d1f;
        --warning: #e4b500;

        --foreground: var(--light);
        --background: var(--dark);

        --fontStack: "Inter", -apple-system, system-ui, BlinkMacSystemFont,
          sans-serif;
        --mega-size: 20vmin;
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --foreground: var(--light);
          --background: var(--dark);
        }
      }

      ::selection {
        background-color: var(--interactive-alpha);
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        position: relative;
      }

      html {
        font: 100%/1.25 var(--fontStack);
        color: var(--foreground);
        background-color: var(--background);
        font-variant-numeric: tabular-nums;
        height: -webkit-fill-available;
      }

      body,
      #__next {
        min-height: 100vh;
      }

      @supports (-webkit-touch-callout: none) {
        body,
        #__next {
          min-height: fill-available;
        }
      }

      #__next {
        display: flex;
      }
    `}
  />
)

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@xz/fonts@1/serve/inter.css"
          />

          <link rel="shortcut icon" href="/images/timer-favicon.png" />
        </Head>
        <body>
          <GlobalStyles />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
