import axios from 'axios';
import { proxy, key } from '../activate/config';

class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const response = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
      const recipeData = response.data.recipe;
      this.title = recipeData.title;
      this.author = recipeData.publisher;
      this.imageUrl = recipeData.image_url;
      this.sourceUrl = recipeData.source_url;
      this.ingredients = recipeData.ingredients;
    } catch (error) {
      console.error(error);
    }
  }

  calculateTime() {
    const numberOfIngredients = this.ingredients.length;
    this.time = Math.ceil(numberOfIngredients / 3) * 15;
  }

  calculateServings() {
    this.servings = 4;
  }
}

export default Recipe;
