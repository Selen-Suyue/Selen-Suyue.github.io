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
