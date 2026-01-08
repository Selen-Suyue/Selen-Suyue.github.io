function showPublications(type) {
  // Update button states
  const allButtons = document.querySelectorAll('.pub-button');
  allButtons.forEach(button => button.classList.remove('active'));
  
  if (type === 'all') {
    document.querySelector('.pub-button:first-child').classList.add('active');
  } else {
    document.querySelector('.pub-button:nth-child(2)').classList.add('active');
  }
  
  // Show/hide publications based on type
  const allPubs = document.querySelectorAll('.publication-card');
  allPubs.forEach(pub => {
    if (type === 'all') {
      pub.style.display = 'flex';
    } else if (type === 'featured') {
      if (pub.classList.contains('featured')) {
        pub.style.display = 'flex';
      } else {
        pub.style.display = 'none';
      }
    }
  });
}