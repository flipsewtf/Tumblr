function getPostType(article) {
  const classList = article.classList;
  
  if (article.querySelector('.poll-post')) { // Check for polls
    return 'poll-post';
  }

  if (classList.contains('photo-post') || classList.contains('photoset-post')) {
    return 'photo-post'; // Handle photos and photosets 
  }

  if (classList.contains('link-post')) {
    return 'link-post'; // Check for link posts first before audio, because it breaks if it's the other way around
  }

  if (classList.contains('video-post')) {
    return 'video-post';
  }

  if (classList.contains('audio-post')) {
    return 'audio-post';
  }

  if (classList.contains('text-post')) {
    return 'text-post';
  }
  
  if (classList.contains('quote-post')) {
    return 'text-post';
  }
  
  if (classList.contains('chat-post')) {
    return 'text-post';
  }

  if (classList.contains('answer-post')) {
    return 'ask-post';
  }
  
  // Default for NPF or unknown post types, could also just be text-post but for debugging it's nice to have this until release
  return 'npf-post';
}

function updatePostIndicator(article, postType) {
  const indicator = article.querySelector('.post-type-indicator');
  if (indicator) {
    // Set the class for styling
    indicator.className = `post-type-indicator ${ postType }`;
  }
}

// Loop over articles and apply indicator
document.querySelectorAll('article.posts').forEach(article => {
  const postType = getPostType(article);
  console.log(`Post type found: ${ postType }`);
  updatePostIndicator(article, postType);
});
