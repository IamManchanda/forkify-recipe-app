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

  parseIngredients() {
    const unitsLongOrSlang = ['tablespoons', 'tbsp', 'ounces', 'oz', 'teaspoons', 'tsp', 'cups', 'pounds'];
    const unitsShort = ['tablespoon', 'tablespoon', 'ounce', 'ounce', 'teaspoon', 'teaspoon', 'cup', 'pound'];
    const units = [...unitsShort, 'kg', 'g'];

    const newIngredients = this.ingredients.map((element) => {
      let ingredient = element.toLowerCase();
      unitsLongOrSlang.forEach((unit, index) => {
        ingredient = ingredient.replace(unit, unitsShort[index]);
      });
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
      const arrayIngredient = ingredient.split(' ');
      const unitIndex = arrayIngredient.findIndex(unitElement => units.includes(unitElement));

      let objectIngredient;
      if (unitIndex > -1) {
        const arrayCount = arrayIngredient.slice(0, unitIndex);

        let count;
        /* eslint-disable no-eval */
        if (arrayCount.length === 1) {
          count = eval(arrayIngredient[0].replace('-', '+')).toFixed(1);
        } else {
          count = eval(arrayIngredient.slice(0, unitIndex).join('+')).toFixed(1);
        }

        objectIngredient = {
          count,
          unit: arrayIngredient[unitIndex],
          ingredient: arrayIngredient.slice(unitIndex + 1).join(' '),
        };
      } else if (parseInt(arrayIngredient[0], 10)) {
        objectIngredient = {
          count: parseInt(arrayIngredient[0], 10),
          unit: '',
          ingredient: arrayIngredient.slice(1).join(' '),
        };
      } else if (unitIndex === -1) {
        objectIngredient = {
          count: 1,
          unit: '',
          ingredient,
        };
      }
      return objectIngredient;
    });
    this.ingredients = newIngredients;
  }

  updateServings(type) {
    const newServings = type === 'decrease' ? this.servings - 1 : this.servings + 1;
    this.ingredients.forEach((ingredient) => {
      ingredient.count *= (newServings / this.servings);
    });

    this.servings = newServings;
  }
}

export default Recipe;
