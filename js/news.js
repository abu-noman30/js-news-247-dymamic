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
    menuItemsList.innerHTML = `<button class="btn btn-ghost text-zinc-500" onclick='fetchNewsData("${category_id}","${category_name}")'>${category_name}</button>`;

    targetMenuBar.appendChild(menuItemsList);
  });
};

const fetchNewsData = async (category_id,category_name) => {
  try {
    let url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    let res = await fetch(url);
    let data = await res.json();
    displayCatagoryWiseNews(data.data,category_name);
  } catch (error) {
    console.log(error.stack);
  }
};

const displayCatagoryWiseNews = (newsData,category_name) => {
    // console.log(newsData);
    // console.log(category_name);

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
      _id,
      title,
      total_view,
      author: { name, published_date },
      thumbnail_url,
      details,
    } = news;

    const newsDiv = document.createElement('div');
      newsDiv.innerHTML = `<!-- card-news-1 -->
      
    <div class="card lg:card-side bg-base-100 shadow-xl my-6 p-4" onclick='fetchNewsDetailsData("${_id}")'>
    
      <figure>
        <img
          src="${thumbnail_url}"
          alt="Movie"
          class="rounded-lg h-48 min-w-full object-fill md:h-80 lg:h-full"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${title}</h2>
        <p class="text-neutral-400">${
          details.length > 200 ? details.slice(0, 200) + '...' : details
        }</p>
        <div class=" flex flex-wrap justify-center sm:justify-between items-center text-center">
          <div class="flex flex-col sm:flex-row items-center justify-center">
            <img
              src="https://unavatar.now.sh/twitter/itsmarkmead"
              alt="Mark Mead"
              class="w-16 h-16 rounded-full mx-auto"
            />
            <div class="mx-4 text-center ">
              <h2 class="font-semibold">${name ? name : 'No-Author'}</h2>
              <h3 class="text-slate-500">${
                published_date ? published_date.slice(0, 10) : 'Not-Available'
              }</h3>
            </div>
          </div>
          <h1>
            <i class="fa-regular fa-eye"></i>
            <span class="font-semibold">${total_view ? total_view : '00'}</span>
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
          <label for="my-modal-3" class="btn text-indigo-500 bg-white border-0 hover:bg-white"> <i class="fa-solid fa-arrow-right"></i></label>
           
          </button>
        </div>
      </div>
    </div>`;

    targetNewsContainer.appendChild(newsDiv);
  });
};

const fetchNewsDetailsData = async (news_id) => {
  try {
    let url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    let res = await fetch(url);
    let data = await res.json();
    displayNewsDetailsOnModal(data.data[0]);
  } catch (error) {
    console.log(error.stack);
  }
};

const displayNewsDetailsOnModal = (newsDetailsData) => {
    console.log(newsDetailsData);
    const { title, thumbnail_url, details, author: { name, published_date }, total_view } = newsDetailsData;
    
    const targetModalBody = document.querySelector('#modal-body');
    targetModalBody.innerHTML = `<div class="card card-compact w-full p-4 bg-base-100 shadow-xl">
    <figure>
      <img src="${thumbnail_url}" alt="Shoes" class="rounded-lg h-48 min-w-full object-fill md:h-80 lg:h-full" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">${title}</h2>
      <p class="text-neutral-400">${
        details.length > 200 ? details.slice(0, 200) + '...' : details
      }</p>
      
      <div class="flex  items-center justify-between">
        <div>
        <p class="text-xs">${name ? name : 'No-Author'}</p>
        <p class="text-xs">${
            published_date ? published_date.slice(0, 10) : 'Not-Available'
          }</p>
        </div>
        <div><p class="text-xs" >View: ${total_view ? total_view : '00'}</p></div>
      </div>
    </div>
  </div>`;


    
};

fetchMenuItemsData('');
