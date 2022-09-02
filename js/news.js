const fetchMenuItemsData = async () => {
  try {
    let url = 'https://openapi.programming-hero.com/api/news/categories';
    let res = await fetch(url);
    let data = await res.json();

    displaymenuItems(data.data.news_category);
  } catch (error) {
    console.log(error.stack);
  }
};

const displaymenuItems = (menuItemsData) => {
  let catagoryNames = [];
  menuItemsData.forEach((menuItem) => {
    menuItem.category_name ? catagoryNames.push(menuItem.category_name) : '';
  });

  console.log(catagoryNames);
  const targetMenuBar = document.querySelector('#menu-bar');
  catagoryNames.forEach((catagoryName) => {
    const menuItemsList = document.createElement('li');
    menuItemsList.innerHTML = `<button class="btn btn-ghost text-zinc-500" onclick='handlerOnDisplayNews()'>${catagoryName}</button>`;

    targetMenuBar.appendChild(menuItemsList);
  });
};

const handlerOnDisplayNews = () => {
  console.log('handlerOnDisplayNews');
};

fetchMenuItemsData();
