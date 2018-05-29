import { Fraction } from 'fractional';
import { recipeContainer } from '../activate/base';

export const clearRecipe = () => {
  recipeContainer.innerHTML = '';
};

const formatCount = (count) => {
  if (count) {
    const [integer, decimal] = count.toString().split('.').map(element => parseInt(element, 10));
    if (!decimal) { 
      return count; 
    } if (integer === 0) {
      const fr = new Fraction(count);
      return `${fr.numerator}/${fr.denominator}`;
    }
    const fr = new Fraction(count - integer);
    return `${integer} ${fr.numerator}/${fr.denominator}`;
  }
  return '?';
};

const createIngredient = (ingredient) => {
  return `
  <li class="recipe__item">
    <svg class="recipe__icon">
        <use href="img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__count">${formatCount(ingredient.count)}</div>
    <div class="recipe__ingredient">
        <span class="recipe__unit">${ingredient.unit}</span>
        ${ingredient.ingredient}
    </div>
  </li>
  `;
};

export const renderRecipe = (recipe, isLiked) => {
  const markup = `
    <figure class="recipe__fig">
      <img src="${recipe.imageUrl}" alt="${recipe.title}" class="recipe__img">
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="img/icons.svg#icon-stopwatch"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
        <span class="recipe__info-text"> minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="img/icons.svg#icon-man"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
        <span class="recipe__info-text"> servings</span>
          <div class="recipe__info-buttons">
              <button class="btn-tiny btn-decrease">
                  <svg>
                      <use href="img/icons.svg#icon-circle-with-minus"></use>
                  </svg>
              </button>
              <button class="btn-tiny btn-increase">
                  <svg>
                      <use href="img/icons.svg#icon-circle-with-plus"></use>
                  </svg>
              </button>
          </div>
      </div>
      <button class="recipe__love">
          <svg class="header__likes">
              <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
          </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <ul class="recipe__ingredient-list">
        ${recipe.ingredients.map(ingredient => createIngredient(ingredient)).join(' ')}
      </ul>

      <button class="btn-small recipe__btn recipe__btn--add">
          <svg class="search__icon">
            <use href="img/icons.svg#icon-shopping-cart"></use>
          </svg>
          <span>Add to shopping list</span>
      </button>
    </div>
  `;

  recipeContainer.insertAdjacentHTML('afterbegin', markup);
};

export const updateRecipe = (recipe) => {
  document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

  const countElements = Array.from(document.querySelectorAll('.recipe__count'));

  countElements.forEach((element, index) => {
    element.textContent = formatCount(recipe.ingredients[index].count);
  });
};
