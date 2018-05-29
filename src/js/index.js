import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import { searchForm, resultsContainer, renderLoadingEffect, clearLoadingEffect, recipeContainer, shoppingList } from './activate/base';
import { getInput, clearInput, clearResults, renderResults, highlightSelected } from './views/searchView';
import { renderRecipe, clearRecipe, updateRecipe } from './views/recipeView';
import { renderItem, deleteItem } from './views/listView';
import { toggleLikeButton, toggleLikeMenu, renderLike, deleteLike } from './views/likesView';

const state = {};
window.state = state;

/**
 * Search Controller
 */
const searchController = async () => {
  const query = getInput();

  if (query) {
    state.searchQuery = new Search(query);
    clearInput();
    clearResults();
    renderLoadingEffect(resultsContainer);
    try {
      await state.searchQuery.getResults();
      clearLoadingEffect();
      renderResults(state.searchQuery.result);
    } catch (error) {
      console.error(error);
      clearLoadingEffect();
    }
  }
};

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  searchController();
});

resultsPages.addEventListener('click', (event) => {
  const button = event.target.closest('.btn-inline');
  if (button) {
    let { goToPage } = button.dataset;
    goToPage = parseInt(goToPage, 10);
    clearResults();
    renderResults(state.searchQuery.result, goToPage);
  }
});

/**
 * Recipe Controller
 */

const recipeController = async () => {
  const id = window.location.hash.replace('#', '');
  if (id) {
    clearRecipe();
    renderLoadingEffect(recipeContainer);
    if (state.searchQuery) {
      highlightSelected(id);
    }

    state.recipe = new Recipe(id);

    try {
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      state.recipe.calculateTime();
      state.recipe.calculateServings();
      clearLoadingEffect();
      renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (error) {
      console.error(error);
    }
  }
};

['hashchange', 'load'].forEach(windowEvent => window.addEventListener(windowEvent, recipeController));

/**
 * List Controller
 */

const listController = () => {
  if (!state.list) {
    state.list = new List();

    state.recipe.ingredients.forEach((element) => {
      const item = state.list.addItem(element.count, element.unit, element.ingredient);
      renderItem(item);
    });
  }
};

shoppingList.addEventListener('click', (event) => {
  const { itemId } = event.target.closest('.shopping__item').dataset;

  if (event.target.matches('.shopping__delete, .shopping__delete *')) {
    state.list.deleteItem(itemId);
    deleteItem(itemId);
  } else if (event.target.matches('.shopping__count--value')) {
    const value = parseFloat(event.target.value);
    state.list.updateCount(itemId, value);
  }
});

/**
 * Likes Controller
 */

state.likes = new Likes();
toggleLikeMenu(state.likes.getNumberLikes());

const likesController = () => {
  if (!state.likes) {
    state.likes = new Likes();
  }

  const currentId = state.recipe.id;

  if (!state.likes.isLiked(currentId)) {
    // eslint-disable-next-line max-len
    const newLike = state.likes.addLike(currentId, state.recipe.title, state.recipe.author, state.recipe.imageUrl);
    toggleLikeButton(true);
    renderLike(newLike);
  } else {
    state.likes.deleteLike(currentId);
    toggleLikeButton(false);
    deleteLike(currentId);
  }
  toggleLikeMenu(state.likes.getNumberLikes());
};

recipeContainer.addEventListener('click', (event) => {
  if (event.target.matches('.btn-decrease, .btn-decrease *')) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('decrease');
      updateRecipe(state.recipe);
    } else {
      alert('You can\'t go below 1 serving');
    }
  } else if (event.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('increase');
    updateRecipe(state.recipe);
  } else if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    listController();
  } else if (event.target.matches('.recipe__love, .recipe__love *')) {
    likesController();
  }
});
