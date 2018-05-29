import { likesField, likesList } from '../activate/base';
import { limitRecipeTitle } from './searchView';

export const toggleLikeButton = (isLiked) => {
  document
    .querySelector('.recipe__love use')
    .setAttribute('href', `img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}`);
};

export const toggleLikeMenu = (numberLikes) => {
  likesField.style.visibility = numberLikes > 0 ? 'visible' : 'hidden';
};

export const renderLike = (like) => {
  const markup = `
    <li>
      <a class="likes__link" href="#${like.id}">
          <figure class="likes__fig">
              <img src="${like.image}" alt="Test">
          </figure>
          <div class="likes__data">
              <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
              <p class="likes__author">${like.author}</p>
          </div>
      </a>
    </li>
  `;
  likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = (id) => {
  const element = document.querySelector(`.likes__link[href*="#${id}"]`).parentElement;
  if (element) {
    element.parentElement.removeChild(element);
  }
};
