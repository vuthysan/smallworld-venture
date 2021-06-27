import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRouter } from "next/router";

function Layout({ children }) {
  const { route } = useRouter();

  return (
    <>
      <div>
        {route.includes("signin") || route.includes("signup") ? "" : <Navbar />}
        {children}
        <Footer />
      </div>
    </>
  );
}

export default Layout;
