export function setupSPA(callback: () => void): void {
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest("[data-link]") as HTMLAnchorElement | null;

    if (link) {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (href) {
        history.pushState(null, "", href);
        callback();
      }
    }
  });
}
