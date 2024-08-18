import {
  handleLike,
  createCard,
  placesList,
  handleCardDelete,
} from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { initialCards } from "./cards.js";
import "../../pages/index.css";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const modals = document.querySelectorAll(".popup");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileEditForm = document.querySelector(".popup_type_edit .popup__form");
const inputNameFormAddNewCard = document.querySelector(
  ".popup__input_type_card-name"
);
const inputLinkFormAddNewCard = document.querySelector(
  ".popup__input_type_url"
);
const addCardForm = document.querySelector(".popup_type_new-card .popup__form");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaptionText = imagePopup.querySelector(".popup__caption");

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const newCard = createCard(
    cardData,
    handleCardDelete,
    handleLike,
    openImagePopup
  );
  placesList.prepend(newCard);
});

// Отправка формы добавления карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const cardName = inputNameFormAddNewCard.value;
  const cardLink = inputLinkFormAddNewCard.value;

  const newCardData = {
    name: cardName,
    link: cardLink,
  };

  // Создаем новую карточку
  const newCard = createCard(newCardData);
  placesList.prepend(newCard);

  // Закрываем попап
  closeModal(popupAddNewCard);

  addCardForm.reset();
}

// Определяем элемент модального окна в переменную
const editProfileModal = document.querySelector(".popup_type_edit");
const addCardModal = document.querySelector(".popup_type_new-card");

// отправка формы редактирования профиля
function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closeModal(editProfileModal);
}

// Прикрепляем обработчики к формам
profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

// Открытие попапа редактирования профиля
editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

function openImagePopup(imageSrc, imageAlt) {
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaptionText.textContent = imageAlt;

  openModal(imagePopup);
}

// Открытие попапа добавления нового места
addButton.addEventListener("click", () => {
  openModal(addCardModal);
});

// Закрытие попапа  крестик
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".popup");
    closeModal(modal);
  });
});

// Закрытие попапа  оверлей
modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});
