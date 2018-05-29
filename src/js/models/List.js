/* eslint-disable class-methods-use-this  */
import uniqid from 'uniqid';

class List {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count: parseFloat(count),
      unit,
      ingredient,
    };
    
    this.items.push(item);
    return item;
  }

  deleteItem(id) {
    const index = this.items.findIndex((element) => {
      return element.id === id;
    });
    return this.items.splice(index, 1);
  }

  updateCount(id, newCount) {
    this.items.find(element => element.id === id).count = newCount;
    return newCount;
  }
}

export default List;
