 function sendMessage() {
    const username = document.getElementById('chat-username').value.trim();
    const message = document.getElementById('chat-message').value.trim();
    const box = document.getElementById('chat-messages');
    if (!username || !message) return alert('Nhập tên và tin nhắn!');

    const item = document.createElement('div');
    item.textContent = `${username}: ${message}`;
    box.appendChild(item);

    document.getElementById('chat-message').value = '';
    box.scrollTop = box.scrollHeight;
  }