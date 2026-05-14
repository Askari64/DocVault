import { Show, SignUpButton } from "@clerk/react";
import { Sparkles } from "lucide-react";
import { Link } from "react-router";

import AuthAppLink from "@/components/AuthAppLink";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ShineBorder } from "@/components/ui/shine-border";
import { Button } from "@/components/ui/button";
import {
  bentoFeatures,
  marqueeItems,
  pricingPlans,
  productFeatures,
} from "@/data/landingPageData.jsx";

import Footer from "@/components/Footer";

const heroLinkButtonClass =
  "inline-flex h-11 items-center justify-center rounded-xl border border-zinc-700 bg-transparent px-6 text-sm font-medium text-zinc-100 transition hover:bg-white/10 hover:text-white";

function LandingPage() {
  return (
    <main className="min-h-svh">
      <section className="relative isolate overflow-hidden border-b border-white/10 bg-zinc-950 text-zinc-50">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.35),transparent)]"
          aria-hidden
        />
        <DotPattern
          glow={false}
          className="text-zinc-600/35 mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,#000_40%,transparent)]"
        />

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 pb-24 pt-28 text-center md:pt-32">
          <div className="relative mb-8 inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-300">
            <ShineBorder
              borderWidth={1}
              duration={18}
              shineColor={["#38bdf8", "#a78bfa", "#38bdf8"]}
            />
            <Sparkles
              className="relative z-10 size-3.5 text-sky-400"
              aria-hidden
            />
            <span className="relative z-10">
              Organizational document sharing · private by default
            </span>
          </div>

          <h1 className="relative z-10 max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl md:leading-[1.08]">
            The workspace where{" "}
            <AnimatedGradientText
              speed={1}
              colorFrom="#38bdf8"
              colorTo="#c084fc"
              className="font-semibold motion-reduce:animate-none"
            >
              orgs onboard
            </AnimatedGradientText>{" "}
            and teams keep files in one trusted vault
          </h1>

          <p className="relative z-10 mt-6 max-w-2xl text-pretty text-base text-zinc-400 sm:text-lg">
            DocVault is a multi-tenant document sharing SaaS. Organizations come
            aboard through Clerk, members collaborate inside their tenant, and
            every upload or download stays authenticated—no anonymous links, no
            accidental leakage across org lines.
          </p>

          <div className="relative z-10 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Show when="signed-out">
              <SignUpButton mode="modal">
                <ShimmerButton
                  type="button"
                  background="linear-gradient(135deg, #18181b 0%, #27272a 100%)"
                  shimmerColor="#e4e4e7"
                  className="motion-reduce:animate-none h-11 px-8 text-sm font-semibold shadow-lg shadow-black/30"
                >
                  Start for free
                </ShimmerButton>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <Button
                asChild
                size="lg"
                className="h-11 rounded-xl bg-white text-zinc-900 hover:bg-zinc-100"
              >
                <Link to="/upload">Go to uploader</Link>
              </Button>
            </Show>
            <AuthAppLink to="/documents" className={heroLinkButtonClass}>
              View document library
            </AuthAppLink>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 rounded-xl border-zinc-700 bg-transparent text-zinc-100 hover:bg-white/10 hover:text-white"
            >
              <Link to={{ pathname: "/", hash: "features" }}>
                Explore features
              </Link>
            </Button>
          </div>

          <div className="relative z-10 mt-16 w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 px-2 py-3">
            <Marquee pauseOnHover className="[--duration:52s]">
              {marqueeItems.map((label) => (
                <span
                  key={label}
                  className="mx-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-400"
                >
                  <span className="size-1.5 rounded-full bg-linear-to-r from-sky-400 to-violet-400" />
                  {label}
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="scroll-mt-20 border-b bg-zinc-50 py-20 dark:bg-zinc-950"
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-violet-600 dark:text-violet-400">
              Platform capabilities
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
              Built for{" "}
              <span className="bg-linear-to-r from-violet-600 to-sky-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-sky-400">
                multi-tenant trust
              </span>
            </h2>
            <p className="mt-3 text-pretty text-zinc-600 dark:text-zinc-400">
              Whether you are running a consultancy with separate client orgs or
              a university cohort with isolated teams, DocVault keeps uploads,
              browsing, and downloads scoped to the right people.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {productFeatures.map(
              ({ icon: FeatureIcon, title, description }) => (
                <div
                  key={title}
                  className="group rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm transition-transform duration-300 will-change-transform hover:-translate-y-0.5 dark:border-white/10 dark:bg-zinc-900/60 motion-reduce:transform-none"
                >
                  <div className="mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">
                    <FeatureIcon className="size-5" aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {description}
                  </p>
                </div>
              ),
            )}
          </div>

          <div className="mt-20">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                How it comes together
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                A bento layout highlighting the flows your evaluators care
                about—onboarding, sharing, uploads, and privacy.
              </p>
            </div>
            <BentoGrid className="lg:auto-rows-[24rem]">
              {bentoFeatures.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="scroll-mt-20 border-b bg-white py-24 dark:bg-zinc-950"
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-sky-600 dark:text-sky-400">
              Pricing
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-4xl">
              Simple plans in USD
            </h2>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">
              Start free, graduate when your org needs more seats, storage, and
              support. Numbers shown are placeholders for your MCA billing
              story—wire them to Stripe or Clerk Billing when you are ready.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex flex-col overflow-hidden rounded-3xl border bg-zinc-50/80 p-8 dark:bg-zinc-900/50 ${
                  plan.highlighted
                    ? "border-transparent shadow-xl shadow-violet-500/10 ring-1 ring-violet-500/30"
                    : "border-zinc-200 dark:border-white/10"
                }`}
              >
                {plan.highlighted ? (
                  <ShineBorder
                    borderWidth={2}
                    duration={20}
                    shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B", "#38bdf8"]}
                  />
                ) : null}
                <div className="relative z-10 flex flex-1 flex-col">
                  <div className="flex items-baseline justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-300">
                        {plan.name}
                      </p>
                      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                        {plan.blurb}
                      </p>
                    </div>
                    {plan.highlighted ? (
                      <span className="rounded-full bg-violet-600/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-200">
                        Popular
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-6 flex items-end gap-1">
                    <span className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                      {plan.priceLabel}
                    </span>
                    <span className="pb-1 text-sm text-zinc-500">
                      {plan.period}
                    </span>
                  </div>
                  <ul className="mt-8 flex-1 space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                    {plan.features.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-violet-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10">
                    <SignUpButton mode="modal">
                      <Button
                        type="button"
                        size="lg"
                        className={`w-full rounded-xl ${
                          plan.highlighted
                            ? "bg-violet-600 text-white hover:bg-violet-500"
                            : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                        }`}
                      >
                        {plan.cta}
                      </Button>
                    </SignUpButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-zinc-950 py-24 text-zinc-50">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(56,189,248,0.12),transparent_55%)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 p-10 shadow-2xl shadow-black/40 md:p-14">
            <ShineBorder
              borderWidth={1}
              duration={22}
              shineColor={["#22d3ee", "#818cf8", "#22d3ee"]}
            />
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Bring your next organization on board today
              </h2>
              <p className="mt-3 text-zinc-400">
                Sign in, pick the right org context, and move
                straight into uploads or your document library. Guests never get
                a silent pass—membership is always enforced.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                <Show when="signed-out">
                  <SignUpButton mode="modal">
                    <ShimmerButton
                      type="button"
                      borderRadius="0.75rem"
                      background="linear-gradient(135deg, #fafafa 0%, #e4e4e7 100%)"
                      shimmerColor="#ffffff"
                      className="motion-reduce:animate-none h-11 px-8 text-sm font-semibold text-zinc-900"
                    >
                      Create your workspace
                    </ShimmerButton>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <>
                    <Button
                      asChild
                      size="lg"
                      className="h-11 rounded-xl bg-white text-zinc-900 hover:bg-zinc-100"
                    >
                      <Link to="/documents">Open my documents</Link>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      className="text-zinc-300 hover:bg-white/10 hover:text-white"
                    >
                      <Link to="/upload">Upload a file</Link>
                    </Button>
                  </>
                </Show>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default LandingPage;
