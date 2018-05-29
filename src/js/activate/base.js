const getElementsByIds = () => {
  return new Proxy({}, { get: (_, id) => document.getElementById(id) });
};

export const {
  searchForm,
  searchField,
  resultsContainer,
  resultsList,
  resultsPages,
  recipeContainer,
  shoppingList,
  likesField,
  likesList,
} = getElementsByIds();

export const renderLoadingEffect = (parentElement) => {
  const loadingEffect = `
    <div class="loader" data-loader>
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  parentElement.insertAdjacentHTML('afterbegin', loadingEffect);
};

export const clearLoadingEffect = () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};
