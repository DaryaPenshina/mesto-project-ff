import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./modal.js";
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const newCard = createCard(cardData, handleLike);
  placesList.prepend(newCard);
});

// @todo: Функция  карточки
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

  // Обработчик клика на изображение
  cardImage.addEventListener("click", () => {
    openImagePopup(cardData.link, cardData.name);
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
  cardElement.remove();
}
// Отправка формы добавления карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const cardName = document.querySelector(".popup__input_type_card-name").value;
  const cardLink = document.querySelector(".popup__input_type_url").value;
  const addCardForm = document.querySelector(".popup_type_new-card .popup__form");

  const newCardData = {
    name: cardName,
    link: cardLink,
  };

  const newCard = createCard(newCardData);
  placesList.prepend(newCard);

  closeModal(document.querySelector(".popup_type_new-card"));
    addCardForm.reset();
}

// Функция открытия попапа с изображением
function openImagePopup(imageSrc, imageAlt) {
  const imagePopup = document.querySelector(".popup_type_image");
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = imageAlt;

  openModal(imagePopup);
}

export { handleAddCardSubmit };
