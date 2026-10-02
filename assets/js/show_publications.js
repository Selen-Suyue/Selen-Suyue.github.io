const PUBLICATION_CATEGORIES = {
  understanding: 'Understanding',
  generation: 'Generation',
  action: 'Action'
};

const WORKS_PAGE_SIZE = 15;
let worksFilter = 'all';
let worksPage = 1;

function worksPageNumbers(total, current) {
  const pages = new Set([1, total]);
  const start = Math.max(1, Math.min(current - 2, total - 4));
  for (let page = start; page <= Math.min(total, start + 4); page++) {
    pages.add(page);
  }
  return Array.from(pages).sort((a, b) => a - b);
}

function renderWorksPagination(totalItems) {
  const pagination = document.getElementById('works-pagination');
  if (!pagination) return;
  const totalPages = Math.ceil(totalItems / WORKS_PAGE_SIZE);
  pagination.replaceChildren();
  pagination.hidden = totalPages <= 1;
  pagination.dataset.filter = worksFilter;
  if (pagination.hidden) return;

  function addButton(label, page, ariaLabel, disabled = false) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'works-pagination__button';
    button.textContent = label;
    button.dataset.page = page;
    button.disabled = disabled;
    button.setAttribute('aria-label', ariaLabel);
    button.setAttribute('aria-controls', 'works-list');
    if (label === String(worksPage)) button.setAttribute('aria-current', 'page');
    button.addEventListener('click', () => {
      if (page === worksPage) return;
      worksPage = page;
      showPublications(worksFilter, false);
      const current = pagination.querySelector('[aria-current="page"]');
      if (current) current.focus({ preventScroll: true });
      const filters = document.querySelector('.pub-button-container');
      if (filters) filters.scrollIntoView({
        block: 'start',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    });
    pagination.appendChild(button);
  }

  addButton('‹', worksPage - 1, 'Previous page of works', worksPage === 1);
  let previous = 0;
  worksPageNumbers(totalPages, worksPage).forEach((page) => {
    if (previous && page - previous > 1) {
      const gap = document.createElement('span');
      gap.className = 'works-pagination__gap';
      gap.textContent = '…';
      gap.setAttribute('aria-hidden', 'true');
      pagination.appendChild(gap);
    }
    addButton(String(page), page, `Page ${page} of ${totalPages}`);
    previous = page;
  });
  addButton('›', worksPage + 1, 'Next page of works', worksPage === totalPages);

  const count = document.createElement('span');
  count.className = 'works-pagination__count';
  count.setAttribute('role', 'status');
  count.textContent = `${(worksPage - 1) * WORKS_PAGE_SIZE + 1}–${Math.min(worksPage * WORKS_PAGE_SIZE, totalItems)} / ${totalItems}`;
  pagination.appendChild(count);
}

function addPublicationCategoryDots(publication) {
  if (publication.querySelector('.pub-category-dots')) return;

  const topics = publication.dataset.topics.split(/\s+/).filter(Boolean);
  const dots = document.createElement('div');
  dots.className = 'pub-category-dots';
  dots.setAttribute('aria-label', `Categories: ${topics
    .map((topic) => PUBLICATION_CATEGORIES[topic])
    .filter(Boolean)
    .join(', ')}`);

  topics.forEach((topic) => {
    const label = PUBLICATION_CATEGORIES[topic];
    if (!label) return;

    const dot = document.createElement('span');
    dot.className = `pub-category-dot pub-category-dot--${topic}`;
    dot.setAttribute('aria-hidden', 'true');
    dots.appendChild(dot);
  });

  if (dots.childElementCount) publication.prepend(dots);
}

function publicationMatchesFilter(publication, filter) {
  if (filter === 'all') return true;
  if (filter === 'first') return publication.classList.contains('first-author');
  if (filter === 'selected') return publication.classList.contains('featured');

  const topics = publication.dataset.topics.split(/\s+/);
  return topics.includes(filter);
}

function showPublications(topic, resetPage = true) {
  worksFilter = topic;
  if (resetPage) worksPage = 1;
  const buttons = document.querySelectorAll('.pub-button-container [data-filter]');
  const publications = Array.from(document.querySelectorAll('#works-list .publication-card[data-topics]'));
  const matching = publications.filter((publication) => publicationMatchesFilter(publication, topic));
  worksPage = Math.max(1, Math.min(worksPage, Math.ceil(matching.length / WORKS_PAGE_SIZE)));
  const visible = new Set(matching.slice((worksPage - 1) * WORKS_PAGE_SIZE, worksPage * WORKS_PAGE_SIZE));

  buttons.forEach((button) => {
    const isActive = button.dataset.filter === topic;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  publications.forEach((publication) => {
    publication.hidden = !visible.has(publication);
  });
  renderWorksPagination(matching.length);
}

// Add class="pinned" in the card markup, or call setPublicationPinned(card).
function setPublicationPinned(publication, pinned = true) {
  publication.classList.toggle('pinned', pinned);
  sortPublications();
  showPublications(worksFilter, false);
}

function sortPublications() {
  const publicationParent = document.getElementById('works-list');

  if (publicationParent) {
    const publications = Array.from(
      publicationParent.querySelectorAll('.publication-card[data-topics]')
    );

    publications
      .sort((a, b) => {
        const aPinned = a.classList.contains('pinned');
        const bPinned = b.classList.contains('pinned');

        if (aPinned !== bPinned) return aPinned ? -1 : 1;
        return (b.dataset.date || '').localeCompare(a.dataset.date || '');
      })
      .forEach((publication) => publicationParent.appendChild(publication));
  }

}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.publication-card[data-topics]').forEach(
    addPublicationCategoryDots
  );
  sortPublications();

  document.querySelectorAll('.pub-button-container [data-filter]').forEach((button) => {
    button.addEventListener('click', () => showPublications(button.dataset.filter));
  });

  showPublications('all');
});
