const PUBLICATION_CATEGORIES = {
  comprehension: 'Comprehension',
  imagination: 'Imagination',
  action: 'Action'
};

function addPublicationCategoryLabels(publication) {
  if (publication.querySelector('.pub-category-rail')) return;

  const topics = publication.dataset.topics.split(/\s+/).filter(Boolean);
  const rail = document.createElement('div');
  rail.className = 'pub-category-rail';
  rail.setAttribute('aria-label', `Categories: ${topics
    .map((topic) => PUBLICATION_CATEGORIES[topic])
    .filter(Boolean)
    .join(', ')}`);

  topics.forEach((topic) => {
    const label = PUBLICATION_CATEGORIES[topic];
    if (!label) return;

    const tag = document.createElement('span');
    tag.className = `pub-category-tag pub-category-tag--${topic}`;
    tag.textContent = label;
    tag.setAttribute('aria-hidden', 'true');
    rail.appendChild(tag);
  });

  if (rail.childElementCount) publication.prepend(rail);
}

function showPublications(topic) {
  const buttons = document.querySelectorAll('.pub-button[data-filter]');
  const publications = document.querySelectorAll('.publication-card[data-topics]');

  buttons.forEach((button) => {
    const isActive = button.dataset.filter === topic;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  publications.forEach((publication) => {
    const topics = publication.dataset.topics.split(/\s+/);
    publication.hidden = topic !== 'all' && !topics.includes(topic);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.publication-card[data-topics]').forEach(
    addPublicationCategoryLabels
  );

  const firstPublication = document.querySelector('.publication-card[data-date]');
  const publicationParent = firstPublication && firstPublication.parentNode;

  if (publicationParent) {
    const publications = Array.from(
      document.querySelectorAll('.publication-card[data-date]')
    );

    publications
      .sort((a, b) => b.dataset.date.localeCompare(a.dataset.date))
      .forEach((publication) => publicationParent.insertBefore(
        publication,
        document.querySelector('script[src$="show_publications.js"]')
      ));
  }

  document.querySelectorAll('.pub-button[data-filter]').forEach((button) => {
    button.addEventListener('click', () => showPublications(button.dataset.filter));
  });

  showPublications('all');
});
