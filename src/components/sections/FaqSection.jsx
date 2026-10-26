// FAQ accordion — adapted from Shadcn Space faq-01 (shadcn/ui Accordion).
import { PlusIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SectionIntro from "./SectionIntro";

export default function FaqSection({ items, title = "Got questions? We've got answers.", badge = "FAQs", lede }) {
  return (
    <section aria-labelledby="faq-title" className="bg-background">
      <div className="mx-auto flex max-w-4xl flex-col gap-12 px-4 py-20 sm:px-6 md:py-28">
        <SectionIntro id="faq-title" badge={badge} title={title} lede={lede} />
        <Accordion type="single" collapsible className="flex w-full flex-col gap-4">
          {items.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
              className="group/item rounded-2xl border border-border bg-card px-6 py-5 transition-colors last:border-b data-[state=open]:bg-accent"
            >
              <AccordionTrigger className="cursor-pointer gap-4 p-0 text-left text-lg font-medium hover:no-underline [&>svg:last-child]:hidden">
                {faq.question}
                <PlusIcon className="size-5 shrink-0 text-primary transition-transform duration-200 group-data-[state=open]/item:rotate-45" aria-hidden="true" />
              </AccordionTrigger>
              <AccordionContent className="p-0 pt-3 text-base text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
