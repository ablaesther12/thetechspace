import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RouteErrorBoundary from "../components/RouteErrorBoundary";

// BrowserRouter keeps the previous scroll position between routes, so a
// footer link would land on the bottom of the next page. Reset on navigation,
// or jump to the #hash target when one is given.
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

const RootLayout = () => {
  const { pathname } = useLocation();
  return (
    <div className="site">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollManager />
      <Navbar />
      <main id="main">
        <RouteErrorBoundary resetKey={pathname}>
          <Suspense fallback={<div className="min-h-[80vh]" aria-busy="true" />}>
            <Outlet />
          </Suspense>
        </RouteErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
