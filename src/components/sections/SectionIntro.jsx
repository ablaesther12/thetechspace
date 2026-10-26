// Section heading in the Shadcn Space block grammar: outline badge, display
// heading, optional lede. `align="split"` puts the lede beside the heading
// (blog-01 pattern); `center` stacks everything centred (team-01 / faq-01).
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ease = [0.21, 0.47, 0.32, 0.98];

export default function SectionIntro({ badge, title, lede, id, align = "center", className, children }) {
  if (align === "split") {
    return (
      <div className={cn("flex flex-col justify-between gap-6 lg:flex-row lg:items-end", className)}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="flex flex-col items-start gap-4"
        >
          {badge && <Badge variant="outline" className="h-7 px-3 text-sm font-normal">{badge}</Badge>}
          <h2 id={id} className="max-w-2xl text-3xl font-semibold text-foreground sm:text-5xl">{title}</h2>
        </motion.div>
        {lede && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            {lede}
          </motion.p>
        )}
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease }}
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-2xl items-center text-center" : "max-w-2xl items-start",
        className
      )}
    >
      {badge && <Badge variant="outline" className="h-7 px-3 text-sm font-normal">{badge}</Badge>}
      <h2 id={id} className="text-3xl font-semibold text-foreground sm:text-5xl">{title}</h2>
      {lede && <p className="text-base text-muted-foreground sm:text-lg">{lede}</p>}
      {children}
    </motion.div>
  );
}
