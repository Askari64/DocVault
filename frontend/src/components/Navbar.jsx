import { Show } from "@clerk/react";
import AuthAppLink from "./AuthAppLink";
import AuthGroup from "./AuthGroup";
import { Link } from "react-router";

const landingHash = (id) => ({ pathname: "/", hash: id });

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/70">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Left: Logo / Brand */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="text-xl font-semibold tracking-tight text-foreground transition hover:opacity-80">
            DocVault
          </Link>
        </div>

        <div className="flex max-w-full flex-1 flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-muted-foreground sm:gap-x-6 sm:text-sm">
          <Show when="signed-out">
            <>
              <Link to={landingHash("features")} className="transition hover:text-foreground">
                Features
              </Link>
              <Link to={landingHash("pricing")} className="transition hover:text-foreground">
                Pricing
              </Link>
            </>
          </Show>
          <Show when="signed-in">
            <>
              <AuthAppLink to="/documents" className="transition hover:text-foreground">
                Documents
              </AuthAppLink>
              <AuthAppLink to="/upload" className="transition hover:text-foreground">
                Upload
              </AuthAppLink>
            </>
          </Show>
        </div>

        {/* Right: Auth */}
        <AuthGroup />
      </nav>
    </header>
  );
}

export default Navbar;
