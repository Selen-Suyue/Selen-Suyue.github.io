const PUBLICATION_CATEGORIES = {
  comprehension: 'Comprehension',
  imagination: 'Imagination',
  action: 'Action'
};

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

function showPublications(topic) {
  const buttons = document.querySelectorAll('.pub-button-container [data-filter]');
  const publications = document.querySelectorAll('.publication-card[data-topics]');

  buttons.forEach((button) => {
    const isActive = button.dataset.filter === topic;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  publications.forEach((publication) => {
    publication.hidden = !publicationMatchesFilter(publication, topic);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.publication-card[data-topics]').forEach(
    addPublicationCategoryDots
  );

  const firstPublication = document.querySelector('.publication-card[data-date]');
  const publicationParent = firstPublication && firstPublication.parentNode;

  if (publicationParent) {
    const publications = Array.from(
      document.querySelectorAll('.publication-card[data-date]')
    );

    publications
      .sort((a, b) => {
        const aIsWorldGuidance = a.querySelector('strong')?.textContent.startsWith('World Guidance:');
        const bIsWorldGuidance = b.querySelector('strong')?.textContent.startsWith('World Guidance:');

        if (aIsWorldGuidance !== bIsWorldGuidance) return aIsWorldGuidance ? -1 : 1;
        return b.dataset.date.localeCompare(a.dataset.date);
      })
      .forEach((publication) => publicationParent.insertBefore(
        publication,
        document.querySelector('script[src*="show_publications.js"]')
      ));
  }

  document.querySelectorAll('.pub-button-container [data-filter]').forEach((button) => {
    button.addEventListener('click', () => showPublications(button.dataset.filter));
  });

  showPublications('all');
});
