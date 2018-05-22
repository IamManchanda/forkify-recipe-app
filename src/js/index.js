import Search from './models/Search';
import Recipe from './models/Recipe';
import { searchForm, resultsContainer, renderLoadingEffect, clearLoadingEffect } from './activate/base';
import { getInput, clearInput, clearResults, renderResults } from './views/searchView';

const state = {};

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
    await state.searchQuery.getResults();
    clearLoadingEffect();
    renderResults(state.searchQuery.result);
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

const r = new Recipe(47746);
r.getRecipe();
console.log(r);
