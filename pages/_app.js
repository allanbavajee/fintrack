// pages/_app.js
import Layout from "../components/Layout";
import "../styles/globals.css"; // si tu as des styles globaux

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
