import AuthGroup from "./AuthGroup";

function Navbar() {
  return (
    <header className="w-full border-b bg-gray-100">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Left: Logo / Brand */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold tracking-tight">DocVault</span>
        </div>

        {/* Right: Auth */}
        <AuthGroup />
      </nav>
    </header>
  );
}

export default Navbar;
