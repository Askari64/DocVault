import { Show, SignUpButton } from "@clerk/react";
import {  Sparkles } from "lucide-react";
import { Link } from "react-router";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { BorderBeam } from "@/components/ui/border-beam";
import { DotPattern } from "@/components/ui/dot-pattern";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Button } from "@/components/ui/button";

import { marqueeItems, bentoFeatures } from "@/data/landingPageData.jsx";




function LandingPage() {
  return (
    <main className="min-h-svh">
      <section className="relative overflow-hidden border-b border-white/10 bg-zinc-950 text-zinc-50">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.35),transparent)]"
          aria-hidden
        />
        <DotPattern
          glow
          className="text-zinc-600/40 mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent)]"
        />

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 pb-24 pt-28 text-center md:pt-32">
          <div className="relative mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-md">
            <BorderBeam size={60} duration={10} colorFrom="#38bdf8" colorTo="#a78bfa" borderWidth={1} />
            <Sparkles className="size-3.5 text-sky-400" aria-hidden />
            <span>DocVault · document management for modern teams</span>
          </div>

          <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl md:leading-[1.08]">
            Store, find, and ship files from{" "}
            <AnimatedGradientText
              speed={1.1}
              colorFrom="#38bdf8"
              colorTo="#c084fc"
              className="font-semibold">
              one calm vault
            </AnimatedGradientText>
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base text-zinc-400 sm:text-lg">
            DocVault is the lightweight front door to your documents—upload with confidence, browse with clarity,
            and keep everything aligned with the rest of your MCA project stack.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Show when="signed-out">
              <SignUpButton mode="modal">
                <ShimmerButton
                  type="button"
                  borderRadius="0.75rem"
                  background="linear-gradient(135deg, #18181b 0%, #27272a 100%)"
                  shimmerColor="#e4e4e7"
                  className="h-11 px-8 text-sm font-semibold shadow-lg shadow-black/30">
                  Start for free
                </ShimmerButton>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-xl bg-white text-zinc-900 hover:bg-zinc-100">
                <Link to="/upload">Go to uploader</Link>
              </Button>
            </Show>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 rounded-xl border-zinc-700 bg-transparent text-zinc-100 hover:bg-white/10 hover:text-white">
              <Link to="#features">See features</Link>
            </Button>
          </div>

          <div className="mt-16 w-full max-w-3xl rounded-2xl border border-white/10 bg-white/3 px-2 py-3 backdrop-blur-sm">
            <Marquee pauseOnHover className="[--duration:32s]">
              {marqueeItems.map((label) => (
                <span
                  key={label}
                  className="mx-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-400">
                  <span className="size-1.5 rounded-full bg-linear-to-r from-sky-400 to-violet-400" />
                  {label}
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      <section id="features" className="scroll-mt-20 border-b bg-zinc-50 py-20 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-violet-600 dark:text-violet-400">
              Why DocVault
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
              Everything you need to keep files{" "}
              <span className="bg-linear-to-r from-violet-600 to-sky-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-sky-400">
                under control
              </span>
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              A focused surface for uploads, browsing, and downloads—wired to your existing backend and Clerk
              authentication.
            </p>
          </div>

          <BentoGrid className="lg:auto-rows-[24rem]">
            {bentoFeatures.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </section>

      <section className="relative overflow-hidden bg-zinc-950 py-24 text-zinc-50">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(56,189,248,0.12),transparent_55%)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 p-10 shadow-2xl shadow-black/40 backdrop-blur-md md:p-14">
            <BorderBeam size={100} duration={12} colorFrom="#22d3ee" colorTo="#818cf8" />
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Ready to centralize your documents?
            </h2>
            <p className="mt-3 text-zinc-400">
              Create an account in moments, then head straight to the uploader or your document list.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Show when="signed-out">
                <SignUpButton mode="modal">
                  <ShimmerButton
                    type="button"
                    borderRadius="0.75rem"
                    background="linear-gradient(135deg, #fafafa 0%, #e4e4e7 100%)"
                    shimmerColor="#ffffff"
                    className="h-11 px-8 text-sm font-semibold text-zinc-900">
                    Create your workspace
                  </ShimmerButton>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <>
                  <Button
                    asChild
                    size="lg"
                    className="h-11 rounded-xl bg-white text-zinc-900 hover:bg-zinc-100">
                    <Link to="/documents">Open my documents</Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    className="text-zinc-300 hover:bg-white/10 hover:text-white">
                    <Link to="/upload">Upload a file</Link>
                  </Button>
                </>
              </Show>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200 bg-white py-10 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-zinc-500 sm:flex-row">
          <p className="font-medium text-zinc-700 dark:text-zinc-300">DocVault</p>
          <p>Built for your MCA final semester project.</p>
        </div>
      </footer>
    </main>
  );
}

export default LandingPage;
