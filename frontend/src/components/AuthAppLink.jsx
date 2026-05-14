import { forwardRef } from "react";
import { SignInButton, useUser } from "@clerk/react";
import { Link } from "react-router";

import { cn } from "@/lib/utils";

/**
 * Navigates to in-app routes when signed in; opens Clerk sign-in (modal) when signed out.
 * Post-auth redirect is configured globally on ClerkProvider (documents).
 */
const AuthAppLink = forwardRef(function AuthAppLink(
  { to, className, children, ...props },
  ref
) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <span
        ref={ref}
        className={cn(className, "inline-flex cursor-default items-center gap-1 opacity-50")}
        aria-busy="true"
        {...props}>
        {children}
      </span>
    );
  }

  if (isSignedIn) {
    return (
      <Link ref={ref} to={to} className={className} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <SignInButton mode="modal">
      <button ref={ref} type="button" className={className} {...props}>
        {children}
      </button>
    </SignInButton>
  );
});

export default AuthAppLink;
