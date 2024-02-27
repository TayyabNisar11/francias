import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }



  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/francais-et-vous/assets/images/fav.png" />
          <link href="https://kit-pro.fontawesome.com/releases/v5.13.0/css/pro.min.css" rel="stylesheet" />

          {/* Google tag (gtag.js) */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-17RW87JY20"></script>

          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-17RW87JY20');
            `,
            }}
          />
        </Head >
        <body>
          <Main />
          <NextScript />
          <div id="modal" />
        </body>
      </Html >
    );
  }
}

export default MyDocument;
