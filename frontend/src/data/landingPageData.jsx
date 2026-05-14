import { FileTextIcon } from "@radix-ui/react-icons";
import { LayoutGrid, ShieldCheck } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";

const sampleFiles = [
  { name: "invoice_q1.pdf", tag: "Finance" },
  { name: "design-handoff.fig", tag: "Design" },
  { name: "dataset_export.csv", tag: "Data" },
  { name: "contract-draft.docx", tag: "Legal" },
  { name: "release-notes.md", tag: "Product" },
];

export const marqueeItems = [
  "Upload anything",
  "Clerk auth",
  "Organized library",
  "Fast downloads",
  "Built for teams",
  "Modern stack",
];

export const bentoFeatures = [
  {
    Icon: FileTextIcon,
    name: "Upload in seconds",
    description:
      "Drag-and-drop uploads with clear progress. DocVault keeps your pipeline moving from draft to done.",
    href: "/upload",
    cta: "Open uploader",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:24s] mask-[linear-gradient(to_top,transparent_35%,#000_100%)]">
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
    name: "A library that stays tidy",
    description:
      "Browse every document in one calm surface. Filters, dates, and quick actions without the clutter.",
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
    name: "Private by design",
    description:
      "Authentication powered by Clerk. Your vault stays yours—no noisy defaults, no surprise sharing.",
    href: "/upload",
    cta: "Get started",
    className: "col-span-3",
    background: (
      <div
        className="absolute inset-0 flex items-center justify-center opacity-40 transition-opacity duration-500 group-hover:opacity-70"
        aria-hidden>
        <div className="h-48 w-48 rounded-full bg-linear-to-tr from-emerald-400/30 via-cyan-400/20 to-indigo-500/30 blur-3xl" />
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className="text-neutral-400/50 mask-[radial-gradient(300px_circle_at_center,white,transparent)]"
        />
      </div>
    ),
  },
];