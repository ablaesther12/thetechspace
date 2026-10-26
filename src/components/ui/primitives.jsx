import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

// ── Panel: white surface, hairline rule, optional registration ticks ─────────
export function Panel({ as: Tag = "div", ticks = false, className, children, ...props }) {
  return (
    <Tag
      className={cn(
        "rounded-xl border border-line bg-panel",
        ticks && "ticks",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

// ── Mono data label (status, day, path). Data only — never a heading kicker. ─
export function Mono({ className, children, ...props }) {
  return (
    <span className={cn("font-mono text-[12px] tracking-tight", className)} {...props}>
      {children}
    </span>
  );
}

// ── Status chip: a dot + mono label ──────────────────────────────────────────
const statusTone = {
  live: "bg-green-50 text-live ring-green-700/15",
  done: "bg-brand-soft text-brand ring-brand/15",
  next: "bg-white text-dim ring-line-strong",
};

export function Status({ tone = "done", children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 ring-1 ring-inset font-mono text-[11px] font-medium",
        statusTone[tone],
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "live" ? "bg-live" : tone === "done" ? "bg-brand" : "bg-line-strong"
        )}
      />
      {children}
    </span>
  );
}

// ── Buttons as links (every CTA navigates somewhere real) ────────────────────
const buttonStyles = {
  primary:
    "bg-brand text-white hover:bg-brand-bright shadow-[0_1px_0_rgb(255_255_255/0.25)_inset,0_8px_24px_-10px_rgb(109_40_217/0.7)]",
  secondary: "bg-panel text-ink ring-1 ring-inset ring-line-strong hover:ring-ink/40",
  ghostOnDark: "bg-white/5 text-white ring-1 ring-inset ring-white/20 hover:bg-white/10",
  light: "bg-white text-night hover:bg-white/90",
};

export function ButtonLink({ to, variant = "primary", arrow = false, className, children, ...props }) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold transition-colors duration-200",
        buttonStyles[variant],
        className
      )}
      {...props}
    >
      {children}
      {arrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
      )}
    </Link>
  );
}

// ── Section heading: display title + optional lede, no eyebrow ───────────────
export function SectionHeading({ id, title, lede, align = "left", className, children }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <h2 id={id} className="text-[2rem] sm:text-5xl font-bold leading-[1.05] text-ink">
        {title}
      </h2>
      {lede && <p className="mt-4 text-lg text-dim max-w-2xl leading-relaxed">{lede}</p>}
      {children}
    </div>
  );
}

// ── Page container ────────────────────────────────────────────────────────────
export function Container({ className, children }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}
