// Inner-page hero — a dark night band that continues the homepage hero.
// Inspo: Liveblocks / Basic Dept (dark field, bold left-aligned statement),
// Synthesis (mosaic visual). Built with shadcn/ui Breadcrumb + Badge.
import { Link } from "react-router";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ease = [0.22, 1, 0.36, 1];

export default function PageHeader({ crumb, badge, title, lede, actions, aside }) {
  return (
    <header className="dark relative isolate overflow-hidden bg-[#06040d] text-white">
      {/* atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-1/3 left-[8%] h-[560px] w-[760px] rounded-full bg-[radial-gradient(closest-side,rgb(124_58_237/0.5),transparent)] blur-2xl" />
        <div className="absolute right-[-10%] top-[20%] h-[420px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(217_70_239/0.18),transparent)] blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-32 sm:px-6 md:pb-24 md:pt-40 lg:grid-cols-[1.05fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          {crumb && (
            <Breadcrumb className="mb-6">
              <BreadcrumbList className="text-white/55">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className="hover:text-white"><Link to="/">Home</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white/90">{crumb}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          )}
          {badge && (
            <Badge variant="outline" className="mb-5 h-7 border-violet-300/30 bg-violet-500/10 px-3 font-normal text-violet-100">
              {badge}
            </Badge>
          )}
          <h1 className="text-4xl font-bold leading-[1.02] text-white sm:text-6xl">{title}</h1>
          {lede && <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/65">{lede}</p>}
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </motion.div>

        {aside && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
          >
            {aside}
          </motion.div>
        )}
      </div>
    </header>
  );
}
