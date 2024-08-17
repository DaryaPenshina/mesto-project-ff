import { handleAddCardSubmit } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import '../../pages/index.css';

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close");
const modals = document.querySelectorAll(".popup");


// Элементы профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const formElement = document.querySelector(".popup_type_edit .popup__form");
const addCardForm = document.querySelector(".popup_type_new-card .popup__form");

// отправка формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closeModal(document.querySelector(".popup_type_edit"));
}

// Прикрепляем обработчики к формам
formElement.addEventListener("submit", handleFormSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

// Открытие попапа редактирования профиля
editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(document.querySelector(".popup_type_edit"));
});

// Открытие попапа добавления нового места
addButton.addEventListener("click", () => {
  openModal(document.querySelector(".popup_type_new-card"));
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
