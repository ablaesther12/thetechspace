// Planned admin section — shadcn/ui Empty, following Shadcn Space empty-state-02.
import { Link } from "react-router";
import { ArrowLeft, Check } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

export default function ComingSoon({ icon: Icon, title, description, features = [] }) {
    return (
        <div className="mx-auto max-w-3xl py-6">
            <Card className="rounded-2xl">
                <CardContent>
                    <Empty className="border-0 p-6 sm:p-10">
                        <EmptyHeader className="max-w-md gap-3">
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                                <EmptyMedia variant="icon" className="size-14 rounded-2xl bg-primary text-primary-foreground [&_svg:not([class*='size-'])]:size-6">
                                    <Icon />
                                </EmptyMedia>
                            </motion.div>
                            <Badge variant="outline" className="h-6 border-amber-300 bg-amber-50 px-2.5 font-normal text-amber-800">In development</Badge>
                            <EmptyTitle className="text-2xl font-semibold">{title}</EmptyTitle>
                            <EmptyDescription className="text-base">{description}</EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent className="max-w-xl">
                            {features.length > 0 && (
                                <ul className="grid w-full gap-x-8 gap-y-3 text-left sm:grid-cols-2">
                                    {features.map((feat) => (
                                        <li key={feat} className="flex items-start gap-2.5 text-sm text-foreground/85">
                                            <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <Button asChild variant="outline" className="mt-4 rounded-full">
                                <Link to="/admin"><ArrowLeft /> Back to overview</Link>
                            </Button>
                        </EmptyContent>
                    </Empty>
                </CardContent>
            </Card>
        </div>
    );
}
