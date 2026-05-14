import { useEffect } from "react";
import { useLocation } from "react-router";

/**
 * Scrolls to top when the path changes without a hash; when a hash is present,
 * scrolls that section into view (e.g. landing #features, #pricing).
 */
export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace(/^#/, "");
      if (!id) return;

      const run = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };

      requestAnimationFrame(() => requestAnimationFrame(run));
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash, key]);

  return null;
}
