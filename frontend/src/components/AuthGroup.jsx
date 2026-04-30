import {
  Show,
  SignInButton,
  SignUpButton,
  OrganizationSwitcher,
  UserButton,
} from "@clerk/react";

function AuthGroup() {
  return (
    <div className="flex items-center gap-3">
      {/* Signed Out */}
      <Show when="signed-out">
        <div className="flex items-center gap-3">
          <SignInButton mode="modal">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="px-4 py-2 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </Show>

      {/* Signed In */}
      <Show when="signed-in">
        <div className="flex items-center gap-3">
          <div>
            <OrganizationSwitcher
              appearance={{
                elements: {
                  rootBox: "border rounded-lg px-2 py-1 bg-red shadow-sm",
                },
              }}
            />
          </div>

          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-9 h-9",
              },
            }}
          />
        </div>
      </Show>
    </div>
  );
}

export default AuthGroup;
