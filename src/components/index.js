import { createCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { initialCards } from './components/cards.js';

const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

initialCards.forEach(cardData => {
    const newCard = createCard(cardData);
    placesList.prepend(newCard);
});


editButton.addEventListener('click', () => {
    openModal(document.querySelector('.popup_type_edit'));
});

addButton.addEventListener('click', () => {
    openModal(document.querySelector('.popup_type_new-card'));
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.popup');
        closeModal(modal);
    });
});

// Элементы профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");


const formElement = document.querySelector(".popup_type_edit .popup__form"); 
const addCardForm = document.querySelector(".popup_type_new-card .popup__form");

//  редактирование профиля
function handleFormSubmit(evt) {
  evt.preventDefault(); 

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closeModal(document.querySelector(".popup_type_edit"));
}
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
  
  // Закрытие попапа через крестик
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".popup");
      closeModal(modal);
    });
  });
  
  // Закрытие попапа через оверлей
  modals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        
        closeModal(modal);
      }
    });
  });
  
  // Открытие попапа с изображением
  function openImagePopup(imageSrc, imageAlt) {
    const imagePopup = document.querySelector(".popup_type_image");
    const popupImage = imagePopup.querySelector(".popup__image");
    const popupCaption = imagePopup.querySelector(".popup__caption");
  
    popupImage.src = imageSrc;
    popupImage.alt = imageAlt;
    popupCaption.textContent = imageAlt;
  
    openModal(imagePopup);
  }

// Обработчик клика на изображение
cardImage.addEventListener('click', () => {
    openImagePopup(cardData.link, cardData.name);
});