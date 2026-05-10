import { Link } from "react-router"

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-white px-4 text-black">
      <div className="flex flex-col items-center gap-8 text-center">
        <div className="flex items-center justify-center gap-1">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-blue-500 sm:h-24 sm:w-24">
            <div className="h-7 w-7 animate-eye-move rounded-full bg-black sm:h-8 sm:w-8" />
          </div>

          <div className="grid h-20 w-20 place-items-center rounded-full bg-blue-500 sm:h-24 sm:w-24">
            <div className="h-7 w-7 animate-eye-move rounded-full bg-black sm:h-8 sm:w-8" />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-medium capitalize text-blue-500 sm:text-4xl">
            Looks like you&apos;re lost
          </h1>
          <p className="mt-2 text-xl font-light sm:text-2xl">404 error</p>
        </div>

        <Link
          to="/"
          className="rounded-2xl border border-blue-500 px-6 py-3 text-base font-light capitalize shadow-[0px_7px_0px_-2px_#3b82f6] transition-all duration-300 hover:bg-blue-500 hover:text-white hover:shadow-none sm:px-8 sm:py-4"
          aria-label="back to home"
          title="back to home"
        >
          back to home
        </Link>
      </div>
    </main>
  );
}