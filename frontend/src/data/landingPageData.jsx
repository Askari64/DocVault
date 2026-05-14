import { FileTextIcon } from "@radix-ui/react-icons";
import {
  Building2,
  Download,
  LayoutGrid,
  Lock,
  Share2,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

import { Marquee } from "@/components/ui/marquee";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

const sampleFiles = [
  { name: "Q1-Board-pack.pdf", tag: "Executive" },
  { name: "customer-dpa.docx", tag: "Legal" },
  { name: "product-specs.md", tag: "Product" },
  { name: "finance-model.xlsx", tag: "Finance" },
  { name: "design-system.fig", tag: "Design" },
  { name: "infra-runbook.pdf", tag: "Engineering" },
];

export const marqueeItems = [
  "Multi-tenant workspaces",
  "Org onboarding with Clerk",
  "Private team libraries",
  "Controlled downloads",
  "No public link sprawl",
  "Built for regulated teams",
];

export const productFeatures = [
  {
    icon: Building2,
    title: "Organizations, not folders",
    description:
      "Each organization gets its own boundary. Switch contexts without logging out—ideal for agencies, campuses, and holding companies.",
  },
  {
    icon: Users,
    title: "Team rooms that stay private",
    description:
      "Members collaborate inside a single tenant. Documents never leak across org lines; visibility follows membership, not guesswork.",
  },
  {
    icon: Share2,
    title: "Share with intent",
    description:
      "Uploads land in a shared vault the whole team can browse. Pair with your own policies for who can upload, delete, or download.",
  },
  {
    icon: Download,
    title: "Downloads you can audit",
    description:
      "Every file is listed with size and timestamps so teams know what moved. Pull originals when you need evidence, not surprises.",
  },
  {
    icon: Lock,
    title: "Zero anonymous access",
    description:
      "DocVault is built on authenticated sessions. Anonymous links are out of scope—your surface area stays small and intentional.",
  },
  {
    icon: Zap,
    title: "Fast path from sign-in to file",
    description:
      "Clerk-powered sign-in, then straight to upload or your document list. No labyrinth of settings before work begins.",
  },
];

export const pricingPlans = [
  {
    id: "free",
    name: "Free",
    blurb: "Prove the workflow with a small crew.",
    price: 0,
    priceLabel: "$0",
    period: "per org / month",
    features: [
      "1 organization workspace",
      "Up to 5 active members",
      "5 GB pooled storage",
      "Standard upload & download",
      "Email support (best effort)",
    ],
    cta: "Start on Free",
    highlighted: false,
  },
  {
    id: "team",
    name: "Team",
    blurb: "For departments shipping documents weekly.",
    price: 10,
    priceLabel: "$10",
    period: "per org / month",
    features: [
      "Everything in Free",
      "Up to 25 members",
      "250 GB pooled storage",
      "Priority upload pipelines",
      "Audit-friendly activity exports",
      "Chat support within 1 business day",
    ],
    cta: "Choose Team",
    highlighted: true,
  },
  {
    id: "business",
    name: "Business",
    blurb: "For regulated orgs that cannot compromise.",
    price: 20,
    priceLabel: "$20",
    period: "per org / month",
    features: [
      "Everything in Team",
      "Unlimited members",
      "1 TB storage + expansion packs",
      "Dedicated success manager",
      "Custom data retention windows",
      "Uptime-backed SLA (99.9%)",
    ],
    cta: "Choose Business",
    highlighted: false,
  },
];

export const bentoFeatures = [
  {
    Icon: Building2,
    name: "Spin up organizations in minutes",
    description:
      "Provision a new org, invite admins, and attach teams without rebuilding your stack. DocVault maps cleanly to Clerk organizations.",
    href: "/upload",
    cta: "Open secure uploader",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div
        className="absolute inset-0 translate-y-8 scale-95 opacity-90 transition duration-500 group-hover:translate-y-5 group-hover:scale-100"
        aria-hidden>
        <div className="absolute inset-10 rounded-3xl border border-neutral-200/70 bg-linear-to-br from-indigo-500/15 via-transparent to-sky-500/20 dark:border-white/10 dark:from-indigo-400/25 dark:to-sky-400/10" />
        <div className="absolute left-14 top-20 h-28 w-[55%] rounded-2xl border border-neutral-200/70 bg-white/85 shadow-sm dark:border-white/10 dark:bg-neutral-900/85" />
        <div className="absolute bottom-16 right-12 flex items-center gap-2 rounded-full border border-neutral-200/80 bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-600 dark:border-white/15 dark:bg-neutral-900/90 dark:text-neutral-200">
          <span className="size-2 rounded-full bg-emerald-400" />
          Org verified
        </div>
      </div>
    ),
  },
  {
    Icon: Users,
    name: "Membership-aware sharing",
    description:
      "Only people inside the active organization see the vault. Switch orgs from Clerk and the library reshapes instantly—no stale copies.",
    href: "/documents",
    cta: "Browse my library",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div
        className="absolute inset-0 flex items-center justify-center opacity-80 transition duration-500 group-hover:opacity-100"
        aria-hidden>
        <div className="grid w-[70%] grid-cols-2 gap-3">
          {["Product", "Finance", "Legal", "Ops"].map((team) => (
            <div
              key={team}
              className="rounded-xl border border-neutral-200/70 bg-white/80 px-3 py-2 text-xs font-semibold text-neutral-700 shadow-sm dark:border-white/10 dark:bg-neutral-900/80 dark:text-neutral-100">
              {team}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    Icon: FileTextIcon,
    name: "Uploads teams can trust",
    description:
      "Drag files in, watch progress, and know they landed in the right tenant. Perfect for contracts, research packets, and creative deliverables.",
    href: "/upload",
    cta: "Launch uploader",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:40s] mask-[linear-gradient(to_top,transparent_35%,#000_100%)]">
        {sampleFiles.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-36 cursor-default overflow-hidden rounded-xl border p-3",
              "border-neutral-950/10 bg-neutral-950/3 dark:border-white/10 dark:bg-white/6"
            )}>
            <figcaption className="text-xs font-medium text-neutral-800 dark:text-neutral-100">
              {f.name}
            </figcaption>
            <p className="mt-1 text-[10px] uppercase tracking-wide text-neutral-500">{f.tag}</p>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: LayoutGrid,
    name: "Library clarity at a glance",
    description:
      "Every document stays indexed with size and timestamps. Jump between list and detail flows without losing where you were.",
    href: "/documents",
    cta: "View documents",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div
        className="absolute inset-0 translate-y-6 scale-95 opacity-90 transition duration-500 group-hover:translate-y-4 group-hover:scale-100"
        aria-hidden>
        <div className="absolute inset-8 rounded-2xl border border-neutral-200/80 bg-linear-to-br from-violet-500/15 via-transparent to-sky-500/20 dark:border-white/10 dark:from-violet-400/20 dark:to-sky-400/10" />
        <div className="absolute left-12 top-16 h-24 w-[65%] rounded-lg border border-neutral-200/60 bg-white/80 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-neutral-900/80" />
        <div className="absolute bottom-20 right-14 h-14 w-[40%] rounded-md border border-dashed border-neutral-300/80 dark:border-white/15" />
      </div>
    ),
  },
  {
    Icon: ShieldCheck,
    name: "Private by default",
    description:
      "Authentication is enforced on every route. Downloads only flow to signed-in members of the active organization—no anonymous hotlinks.",
    href: "/documents",
    cta: "See the vault",
    className: "col-span-3",
    background: (
      <div
        className="absolute inset-0 flex items-center justify-center opacity-40 transition-opacity duration-500 group-hover:opacity-70"
        aria-hidden>
        <div className="h-48 w-48 rounded-full bg-linear-to-tr from-emerald-400/30 via-cyan-400/20 to-indigo-500/30 blur-3xl" />
        <DotPattern
          width={22}
          height={22}
          cx={1}
          cy={1}
          cr={1}
          glow={false}
          className="text-neutral-400/50 mask-[radial-gradient(300px_circle_at_center,white,transparent)]"
        />
      </div>
    ),
  },
];
