function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white py-10 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-zinc-500 sm:flex-row">
        <p className="font-medium text-zinc-700 dark:text-zinc-300">DocVault</p>
        <p className="text-center sm:text-left">
          Secure document sharing for orgs, teams, and privacy-first workflows.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
