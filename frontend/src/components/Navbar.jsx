import AuthGroup from "./AuthGroup";
import { Show } from "@clerk/react";
import { Link } from "react-router";

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

        {/* Center: Hyperlinks*/}
        <Show when="signed-in">
          <div className="flex gap-5">
            <Link to="/documents">Documents</Link>
            <Link to="/upload">Upload</Link>
          </div>
        </Show>

        {/* Right: Auth */}
        <AuthGroup />
      </nav>
    </header>
  );
}

export default Navbar;
