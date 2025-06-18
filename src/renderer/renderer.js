const information = document.getElementById('info');
information.innerText = `This app is using Chrome (v${window.api.versions.chrome()}), Node.js (v${window.api.versions.node()}), and Electron (v${window.api.versions.electron()})`

document.getElementById('load').addEventListener('click', async () => {
    const cities = await window.api.getCities();
    const list = document.getElementById('city-list');
    list.innerHTML = '';
    cities.forEach(city => {
      const li = document.createElement('li');
      li.textContent = `${city.Name} (${city.CountryCode}) - Population: ${city.Population}`;
      list.appendChild(li);
    });
  });