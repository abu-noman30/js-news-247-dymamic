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
  const targetMenuBar = document.querySelector('#menu-bar');

  menuItemsData.forEach((menuItem) => {
    const { category_id, category_name } = menuItem;

    const menuItemsList = document.createElement('li');
    menuItemsList.innerHTML = `<button class="btn btn-ghost text-zinc-500" onclick='fetchNewsData("${category_id}")'>${category_name}</button>`;

    targetMenuBar.appendChild(menuItemsList);
  });
};

const fetchNewsData = async (category_id) => {
  try {
    let url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    let res = await fetch(url);
    let data = await res.json();
    displayCatagoryWiseNews(data.data);
  } catch (error) {
    console.log(error.stack);
  }
};

const displayCatagoryWiseNews = (newsData) => {
  console.log(newsData);

    const targetNotFoundSec = document.querySelector('#not-found-section');
    const targetNewsContainer = document.querySelector('#news-container');
    targetNewsContainer.innerHTML = '';
    if (newsData.length === 0) {
    
        targetNotFoundSec.classList.remove('hidden');
        return;
    }
    targetNotFoundSec.classList.add('hidden');

    newsData.forEach((news) => {
      const {
        title,
        total_view,
        author: { name, published_date },
        thumbnail_url,
        image_url,
        details,
      } = news;

      const newsDiv = document.createElement('div');
      newsDiv.innerHTML = `<!-- card-news-1 -->
    <div class="card lg:card-side bg-base-100 shadow-xl my-6 p-4">
      <figure>
        <img
          src="${thumbnail_url}"
          alt="Movie"
          class="rounded-lg h-48 w-22 object-cover md:h-80 lg:h-full"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">New movie is released!</h2>
        <p>Click the button to watch on Jetflix app.</p>
        <p>Click the button to watch on Jetflix app.</p>
        <p>Click the button to watch on Jetflix app.</p>
        <div class=" flex flex-wrap justify-center sm:justify-between items-center text-center">
          <div class="flex flex-col sm:flex-row items-center justify-center">
            <img
              src="https://unavatar.now.sh/twitter/itsmarkmead"
              alt="Mark Mead"
              class="w-16 h-16 rounded-full mx-auto"
            />
            <div class="mx-4 text-center ">
              <h2 class="font-semibold">Name</h2>
              <h3 class="text-slate-500">Date</h3>
            </div>
          </div>
          <h1>
            <i class="fa-regular fa-eye"></i>
            <span class="font-semibold">1.5M</span>
          </h1>
          <div class="rating rating-sm">
            <input
              type="radio"
              name="rating-6"
              class="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-6"
              class="mask mask-star-2 bg-orange-400"
              checked
            />
            <input
              type="radio"
              name="rating-6"
              class="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-6"
              class="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-6"
              class="mask mask-star-2 bg-orange-400"
            />
          </div>
          <button class="text-indigo-500 ml-5 md:ml-0">
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>`;

      targetNewsContainer.appendChild(newsDiv);
    });
};

fetchMenuItemsData('');
