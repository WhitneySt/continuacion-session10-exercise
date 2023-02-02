import "../styles/style.scss";
import {
  getAllMovies,
  getMoreRated,
  getRecents,
  searchMovie,
} from "./services";
import {
  buttonNext,
  buttonPrevius,
  buttonSearch,
  inputSearch,
  menuAll,
  menuFavorites,
  menuRated,
  menuRecent,
  renderImages,
  renderMovies,
} from "./UI";

let page = 1;
let status = "all";

document.addEventListener("DOMContentLoaded", async () => {
  const movies = await getAllMovies(page);
  renderImages();
  renderMovies(movies.results);
  disabledButtons();
});

const changeStatus = async () => {
  disabledButtons();
  const text = inputSearch.value;
  let movies;
  switch (status) {
    case "all":
      movies = await getAllMovies(page);
      break;

    case "search":
      movies = await searchMovie(text, page);
      break;

    case "rated":
      movies = await getMoreRated(page);
      break;

    case "recent":
      movies = await getRecents(page);
      break;

    // case "favorites":
    //   // movies = await getRecents(page);
    //   break;
    
    default:
      movies = await getAllMovies(page);
      break;
  }
  renderMovies(movies.results);
}

buttonNext.addEventListener("click", async () => {
  if (page < 500) {
    page++;
  }
  changeStatus();
});

buttonPrevius.addEventListener("click", async () => {
  if (page > 1) {
    page--;
  }
  changeStatus();
});

const disabledButtons = () => {
  if (page === 1) {
    buttonPrevius.classList.add("paginator__disabled");
  } else if (page > 1) {
    buttonPrevius.classList.remove("paginator__disabled");
  }

  if (page === 500) {
    buttonNext.classList.add("paginator__disabled");
  } else if (page < 500) {
    buttonNext.classList.remove("paginator__disabled");
  }
};

const deleteClassActive = (idElement) => {
  Array.from(navHeader.children).forEach(element => {
    if (idElement !== element.id) {
      element.classList.remove('menu__item-active');
    }else {
      element.classList.add('menu__item-active')
    }
  });
}

buttonSearch.addEventListener("click", async () => {
  page = 1;
  const text = inputSearch.value;
  const data = await searchMovie(text, page);
  renderMovies(data.results);
  status = "search";
});

menuAll.addEventListener("click", async () => {
  deleteClassActive('menuAll');
  status = "all";
  page = 1;
  const data = await getAllMovies(page);
  renderMovies(data.results);
});

menuRated.addEventListener("click", async () => {
  deleteClassActive('menuRated');
  status = "rated";
  page = 1;
  const data = await getMoreRated(page);
  renderMovies(data.results);
});

menuRecent.addEventListener("click", async () => {
  deleteClassActive('menuRecent');
  status = "recent";
  page = 1;
  const data = await getRecents(page);
  renderMovies(data.results);
});

menuFavorites.addEventListener("click", async () => {
  deleteClassActive("menuFavorites");
  status = "favorites";
  console.log('Ir a fav');
  // page = 1;
  // const data = await getRecents(page);
  // renderMovies(data.results);
});

