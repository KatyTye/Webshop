let categoryItems;

window.addEventListener("DOMContentLoaded", () => {
  getItembyCategory('Bærbar', 'bærbar-container');
  getItembyCategory('telefon', 'telefon-container');
});

function getItembyCategory(category, containerId) {
  fetch('/json/items.json')
    .then(response => response.json())
    .then(data => {
      categoryItems = data.filter(item => item.kategorier.includes(category));
      console.log(`Category: ${category}`, categoryItems);

      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`Element with ID "${containerId}" not found.`);
        return;
      }

      categoryItems.forEach((item) => {
        container.innerHTML += `
          <a href="produkt.html?show=${item.id}">
            <img src="${item.billdekilder[0]}" alt="${item.navn || 'Produkt'}">
          </a>`;
      });
    })
    .catch(error => {
      console.error('Error fetching JSON:', error);
    });
}
