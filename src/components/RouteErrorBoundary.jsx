import { Component } from "react";

// Catches render/load errors for a route so a failure shows a way out instead
// of a blank screen. Resets when the URL changes (`resetKey`).
export default class RouteErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidUpdate(prev) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  componentDidCatch(error, info) {
    console.error("Route failed to render:", error, info?.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <section role="alert" className="flex min-h-[70vh] items-center justify-center bg-canvas px-4 pt-32 pb-20">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold text-ink">This page didn't load</h1>
          <p className="mt-3 text-dim">
            Something went wrong while loading this page, often because the site was just updated.
            Reloading usually fixes it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-bright"
            >
              Reload page
            </button>
            <a href="/" className="rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-ink hover:border-ink">
              Go home
            </a>
          </div>
        </div>
      </section>
    );
  }
}
