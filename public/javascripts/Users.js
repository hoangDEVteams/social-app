document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/users")
    .then(res => res.json())
    .then(users => {
      const container = document.getElementById("user-list");
      users.forEach(user => {
        const card = document.createElement("div");
        card.className = "user-card";

        const fullName = `${user.name.first} ${user.name.middle || ""} ${user.name.last}`;
        const avatarUrl = user.profile?.picture?.startsWith("http")
          ? user.profile.picture
          : user.profile?.picture || "/images/default.jpg";

        card.innerHTML = `
          <img src="${avatarUrl}" alt="${fullName}" />
          <div class="user-info">
            <h3>${fullName}</h3>
            <p>${user.email}</p>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(err => {
      document.getElementById("user-list").innerHTML = "<p style='color: red;'>Lỗi khi tải danh sách người dùng.</p>";
      console.error("Lỗi tải user:", err);
    });
});
