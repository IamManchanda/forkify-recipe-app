import axios from 'axios';
import { proxy, key } from '../activate/config';

class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const response = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
      this.result = response.data.recipes;
    } catch (error) {
      console.warn(error);
    }
  }
}

export default Search;
