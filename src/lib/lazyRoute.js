import { lazy } from "react";

// React.lazy with recovery for stale code-split chunks.
//
// After a deploy (or when the Vite dev server re-optimises dependencies), a
// tab that loaded the old index can request chunk files that no longer exist,
// and the import rejects with "Failed to fetch dynamically imported module".
// Reload once to pick up the fresh build; if it still fails, rethrow so the
// route error boundary shows a recovery message instead of a blank page.
const RELOAD_FLAG = "tts:chunk-reload";

export function lazyRoute(importer) {
  return lazy(async () => {
    try {
      const mod = await importer();
      sessionStorage.removeItem(RELOAD_FLAG);
      return mod;
    } catch (error) {
      const alreadyReloaded = sessionStorage.getItem(RELOAD_FLAG) === "1";
      if (!alreadyReloaded) {
        sessionStorage.setItem(RELOAD_FLAG, "1");
        window.location.reload();
        // Keep Suspense pending while the page reloads.
        return new Promise(() => {});
      }
      sessionStorage.removeItem(RELOAD_FLAG);
      throw error;
    }
  });
}
