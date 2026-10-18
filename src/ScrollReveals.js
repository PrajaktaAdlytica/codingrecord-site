import { useEffect } from 'react';

// Complement the authored cinematic scenes; never animate their interactive frames.
export function useScrollReveals(path, motion) {
  useEffect(() => {
    if (!motion) return;
    const selector = [
      '.section-title', '.module-row', '.provenance-grid>div', '.gate-summary',
      '.content-page .editorial-copy>*', '.content-page .detail-row',
      '.content-page .source-list>a', '.content-page .paper-card',
      '.content-page .gates>div', '.content-page .callout',
      '.content-page .legal-paragraph', '.content-page .ia-grid>article',
      '.content-page .ia-completion>section>h2',
      '.content-page .ia-completion>section>p',
      '.content-page .ia-completion>h2', '.content-page .session-list>li',
      '.metric-primary', '.metric-grid>div', '.comparison-table>div'
    ].join(',');
    const nodes = [...document.querySelectorAll(selector)].filter(n =>
      !n.closest('.module-gallery,.route-scene,.case-scene,.demo-page,.page-intro') &&
      !n.parentElement.closest(selector)
    );
    const directions = ['bottom', 'left', 'right', 'top'];
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        // Reset only once fully outside: no threshold jitter on tall paragraphs.
        entry.target.classList.toggle('is-in-view', entry.isIntersecting);
      }
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
    nodes.forEach((node, i) => {
      node.dataset.reveal = directions[i % directions.length];
      node.style.setProperty('--reveal-delay', `${(i % 3) * 65}ms`);
      observer.observe(node);
    });
    return () => {
      observer.disconnect();
      nodes.forEach(node => {
        delete node.dataset.reveal;
        node.classList.remove('is-in-view');
        node.style.removeProperty('--reveal-delay');
      });
    };
  }, [path, motion]);
}
