import { createCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { initialCards } from "./cards.js";
import "../../pages/index.css";
import {
  getInitialCards,
  getUserInfo,
  updateUserInfo,
  addCard,
  updateAvatar,
} from "./api.js";

const placesList = document.querySelector(".places__list");
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

// Получение элементов попапа удаления карточки
const deleteCardPopup = document.querySelector(".popup_type_delete-card");
const closeDeleteCardButton = deleteCardPopup.querySelector(".popup__close");
const deleteCardForm = deleteCardPopup.querySelector(".popup__form");
let cardId;
let cardElement;

// Функция, открывающая попап удаления карточки
function openDeleteCardPopup(cardId, cardElement, onConfirmDelete) {
  openModal(deleteCardPopup);

  const form = deleteCardPopup.querySelector(".popup__form");

  form.onsubmit = (event) => {
    event.preventDefault();

    if (cardElement && cardId) {
      onConfirmDelete(cardElement, cardId);
      closeModal(deleteCardPopup);
    } else {
      console.error("Текущая карточка не определена.");
    }
  };
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const cardName = inputNameFormAddNewCard.value;
  const cardLink = inputLinkFormAddNewCard.value;

  const addCardButton = addCardForm.querySelector(".popup__button");
  addCardButton.textContent = "Сохранение...";
  addCardButton.disabled = true;

  addCard(cardName, cardLink)
    .then((data) => {
      const newCard = createCard(data, openDeleteCardPopup, openImagePopup);

      placesList.prepend(newCard);
      closeModal(popupAddNewCard);
      addCardForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardButton.textContent = "Создать";
      addCardButton.disabled = false;
    });
}

// Определяем элемент модального окна в переменную
const editProfileModal = document.querySelector(".popup_type_edit");
const addCardModal = document.querySelector(".popup_type_new-card");

// отправка формы редактирования профиля
function handleProfileEditFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const profileEditButton = profileEditForm.querySelector(".popup__button");
  profileEditButton.textContent = "Сохранение...";
  profileEditButton.disabled = true;

  updateUserInfo(nameValue, jobValue)
    .then((updatedUser) => {
      profileTitle.textContent = updatedUser.name;
      profileDescription.textContent = updatedUser.about;
      closeModal(editProfileModal);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileEditButton.textContent = "Сохранить";
      profileEditButton.disabled = false;
    });
}
// Добавляем переменные для попапа смены аватара
const avatarPopup = document.querySelector(".popup_type_change-avatar");
const closeAvatarPopupButton = avatarPopup.querySelector(
  ".popup__close_type_change-avatar"
);
const avatarForm = avatarPopup.querySelector(".popup__form_type_change-avatar");
const profileImage = document.querySelector(".profile__image");

// Прикрепляем обработчики к форме смены аватара
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

// Обработчик отправки формы для смены аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatarUrl = document.querySelector(".popup__input").value; // Получаем URL
  const avatarButton = avatarForm.querySelector(".popup__button");

  avatarButton.textContent = "Сохранение...";
  avatarButton.disabled = true;

  updateAvatar(avatarUrl)
    .then((editAvatar) => {
      profileImage.style.backgroundImage = `url(${editAvatar.avatar})`;
      closeModal(avatarPopup);
      avatarForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarButton.textContent = "Сохранить";
      avatarButton.disabled = false;
    });
}

// Открытие попапа смены аватара
document.querySelector(".edit-avatar-button").addEventListener("click", () => {
  openModal(avatarPopup);
});

// Прикрепляем обработчики к формам
profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

// Открытие попапа редактирования профиля
editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

// Функция открытия изображения
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

// Закрытие попапа крестик
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".popup");
    closeModal(modal);
  });
});

// Закрытие попапа оверлей
modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

import { enableValidation, clearValidation } from "./validation.js";

// Объект с настройками
const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Включение валидации
enableValidation(settings);

// Код для добавления обработчиков событий
document.addEventListener("DOMContentLoaded", () => {
  const profileForm = document.querySelector(".popup_type_edit .popup__form");
  const cardForm = document.querySelector(".popup_type_new-card .popup__form");
  const avatarForm = document.querySelector(
    ".popup_type_change-avatar .popup__form"
  );
  const editButton = document.querySelector(".profile__edit-button");
  const addButton = document.querySelector(".profile__add-button");
  const changeAvatarButton = document.querySelector(".edit-avatar-button");

  // Функция для управления состоянием кнопки
  function toggleSubmitButton(form) {
    const button = form.querySelector(".popup__button");
    const isValid = form.checkValidity();
    button.disabled = !isValid;
  }

  // Обработчики событий для форм
  if (profileForm) {
    profileForm.addEventListener("input", () => {
      toggleSubmitButton(profileForm);
    });
  }

  if (cardForm) {
    cardForm.addEventListener("input", () => {
      toggleSubmitButton(cardForm);
    });
  }

  if (avatarForm) {
    avatarForm.addEventListener("input", () => {
      toggleSubmitButton(avatarForm);
    });
  }

  // При открытии формы редактирования профиля
  if (editButton) {
    editButton.addEventListener("click", () => {
      if (profileForm) {
        clearValidation(profileForm, settings);
        toggleSubmitButton(profileForm);
      }
    });
  }

  // При открытии формы добавления карточки
  if (addButton) {
    addButton.addEventListener("click", () => {
      if (cardForm) {
        clearValidation(cardForm, settings);
        toggleSubmitButton(cardForm);
      }
    });
  }

  // При открытии формы изменения аватара
  if (changeAvatarButton) {
    changeAvatarButton.addEventListener("click", () => {
      if (avatarForm) {
        clearValidation(avatarForm, settings);
        toggleSubmitButton(avatarForm);
      }
    });
  }
});

// Токен: 92b1f524-5bc8-4fa7-bf54-c65aa9257259
// Идентификатор группы: wff-cohort-21

// Интеграция с API

// Получение карточек и пользователя
Promise.all([getInitialCards(), getUserInfo()])
  .then(([cards, user]) => {
    const profileImage = document.querySelector(".profile__image");
    profileImage.style.backgroundImage = `url(${user.avatar}`;
    localStorage.setItem("currentUserId", user._id);
    const profileName = document.querySelector(".profile__title");
    profileName.textContent = user.name;
    const profileInfo = document.querySelector(".profile__description");
    profileInfo.textContent = user.about;

    // Создание карточек
    cards.reverse().forEach((cardData) => {
      const newCardData = {
        ...cardData,
      };
      // Передаем openImagePopup как аргумент
      const newCard = createCard(
        newCardData,
        openDeleteCardPopup,
        openImagePopup
      );
      placesList.prepend(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });
