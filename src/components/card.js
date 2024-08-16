
import { initialCards } from './cards.js';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");


// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
    const newCard = createCard(cardData, handleLike);
    placesList.prepend(newCard);
  });

// @todo: Функция создания карточки
function createCard(cardData) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  
  // кнопка лайка
  likeButton.addEventListener("click", handleLike);

  // удаление карточки
  deleteButton.addEventListener("click", () => {
    handleCardDelete(cardElement);
  });
  return cardElement;
  }

// Обработчик лайка
function handleLike(event) {
  const likeButton = event.target;
  likeButton.classList.toggle("card__like-button_active");
}
// удаление карточки
function handleCardDelete(cardElement) {
  cardElement.remove(); // Удаление элемента из DOM
}
// Отправка формы добавления карточки
function handleAddCardSubmit(evt) {
    evt.preventDefault(); // Отменяем стандартное поведение формы
  
    const cardName = document.querySelector(".popup__input_type_card-name").value;
    const cardLink = document.querySelector(".popup__input_type_url").value;
  
    const newCardData = {
      name: cardName,
      link: cardLink,
    };
    // Добавляем в начало списка
    const newCard = createCard(newCardData);
    placesList.prepend(newCard);
  
    closeModal(document.querySelector(".popup_type_new-card"));
    addCardForm.reset();
  }
 export { handleAddCardSubmit };