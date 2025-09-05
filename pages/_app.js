// pages/_app.js
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div style={{ fontFamily: "Inter, Arial, sans-serif", background: "#fff" }}>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
