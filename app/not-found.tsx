import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="section-shell not-found-page">
      <p className="eyebrow">404</p>
      <h1>This page is not in the system.</h1>
      <p>The route may have moved, or the case study is not part of the selected portfolio.</p>
      <div className="not-found-actions">
        <Button asChild variant="accent"><Link href="/"><ArrowLeft size={18} /> Back to portfolio</Link></Button>
        <Link href="/work" className="text-link">Case studies <ArrowRight size={15} aria-hidden="true" /></Link>
        <Link href="/resume" className="text-link">Resume <ArrowRight size={15} aria-hidden="true" /></Link>
      </div>
    </div>
  );
}
