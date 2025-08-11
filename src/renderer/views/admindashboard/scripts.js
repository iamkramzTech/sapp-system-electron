(async () => {
  const session = await window.api.getSession();

  if (!session) {
    window.location = '../userlogin/index.html';
  } else {
    document.getElementById('user-info').innerText =
      `Welcome ${session.name} (Role: ${session.role})`;
  }

  document.getElementById('logoutBtn').addEventListener('click', async () => {
    await window.api.logout();
    window.location = '../userlogin/index.html';
  });
})();
