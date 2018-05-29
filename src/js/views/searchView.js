import { searchField, resultsList, resultsPages } from '../activate/base';

export const getInput = () => {
  return searchField.value;
};

export const clearInput = () => {
  searchField.value = '';
};

export const clearResults = () => {
  resultsList.innerHTML = '';
  resultsPages.innerHTML = '';
};

export const highlightSelected = (id) => {
  const resultsArray = Array.from(document.querySelectorAll('.results__link'));
  resultsArray.forEach((element) => {
    element.classList.remove('results__link--active');
  });

  document.querySelector(`.results__link[href*="#${id}"]`).classList.add('results__link--active');
};

export const limitRecipeTitle = (title, limit = 30) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((accumulator, currentValue) => {
      if ((accumulator + currentValue.length) <= limit) {
        newTitle.push(currentValue);
      }
      return accumulator + currentValue.length;
    }, 0);
    return `${newTitle.join(' ')}...`;
  }
  return title;
};

const renderRecipe = (recipe) => {
  const markup = `
  <li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
  </li>
  `;
  resultsList.insertAdjacentHTML('beforeend', markup);
};

const createButton = (page, type) => {
  return `
    <button class="btn-inline results__btn--${type}" data-go-to-page="${type === 'prev' ? page - 1 : page + 1}">
      <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
      </svg>
    </button>
  `;
};

const renderButtons = (page, numberOfResults, resultsPerPage) => {
  const pages = Math.ceil(numberOfResults / resultsPerPage);
  let button;
  if (page === 1 && pages > 1) {
    button = createButton(page, 'next');
  } else if (page < pages) {
    button = `
      ${createButton(page, 'prev')}
      ${createButton(page, 'next')}
    `;
  } else if (page === pages && pages > 1) {
    button = createButton(page, 'prev');
  }
  resultsPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resultsPerPage = 6) => {
  const start = (page - 1) * resultsPerPage;
  const end = page * resultsPerPage;
  recipes.slice(start, end).forEach(renderRecipe);

  renderButtons(page, recipes.length, resultsPerPage);
};
