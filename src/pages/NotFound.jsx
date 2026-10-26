import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 pt-32 pb-20 bg-canvas">
      <div className="max-w-md text-center">
        <p className="font-display text-7xl font-extrabold text-brand">404</p>
        <h1 className="mt-4 text-3xl font-bold text-ink">This page doesn't exist</h1>
        <p className="mt-3 text-dim">
          The link may be broken or the page may have moved. Head back home or tell us what you were looking for.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-bright transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-ink hover:border-ink transition-colors"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
