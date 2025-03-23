const posts = [];

function submitPost() {
  const content = document.getElementById('postContent').value.trim();
  if (!content) return;

  const post = {
    author: 'Người dùng demo',
    content,
    createdAt: new Date().toLocaleString()
  };

  posts.unshift(post);
  renderPosts();
  document.getElementById('postContent').value = '';
}

function renderPosts() {
  const postContainer = document.getElementById('posts');
  postContainer.innerHTML = '';
  posts.forEach(p => {
    const el = document.createElement('div');
    el.className = 'post';
    el.innerHTML = `
      <h4>${p.author} <span style="font-size: 12px; color: gray;">(${p.createdAt})</span></h4>
      <p>${p.content}</p>
    `;
    postContainer.appendChild(el);
  });
}