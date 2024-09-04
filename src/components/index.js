import { handleLike, createCard, handleCardDelete } from "./card.js"; 
import { openModal, closeModal } from "./modal.js"; 
import { initialCards } from "./cards.js"; 
import "../../pages/index.css";

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
const inputNameFormAddNewCard = document.querySelector(".popup__input_type_card-name");
const inputLinkFormAddNewCard = document.querySelector(".popup__input_type_url");
const addCardForm = document.querySelector(".popup_type_new-card .popup__form");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaptionText = imagePopup.querySelector(".popup__caption");

// Получение элементов попапа удаления карточки
const deleteCardPopup = document.querySelector(".popup_type_delete-card");
const closeDeleteCardButton = deleteCardPopup.querySelector(".popup__close");
const deleteCardForm = deleteCardPopup.querySelector(".popup__form");
let currentCard; 

// Функция, открывающая попап удаления карточки
function openDeleteCardPopup(cardElement) {
    currentCard = cardElement; 
    openModal(deleteCardPopup); 
}

// Закрытие попапа удаления карточки
closeDeleteCardButton.addEventListener("click", () => {
    closeModal(deleteCardPopup);
});

// Обработчик отправки формы для удаления карточки
deleteCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault(); 
    handleCardDelete(currentCard); 
    closeModal(deleteCardPopup); 
});

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
    const newCardData = {
        ...cardData,
        likes: cardData.likes || [], 
    };
    const newCard = createCard(
        newCardData,
        openDeleteCardPopup, 
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
        likes: [], 
        owner: {
            _id: '<fda5910683ca01ade205295d>', 
        },
    };

    const addCardButton = addCardForm.querySelector(".popup__button");
    addCardButton.textContent = "Сохранение...";
    addCardButton.disabled = true; 

    // Создаем новую карточку
    const newCard = createCard(
        newCardData,
        openDeleteCardPopup, 
        handleLike,
        openImagePopup
    );
    
    placesList.prepend(newCard);
    closeModal(popupAddNewCard);
    addCardForm.reset();

    addCardButton.textContent = "Создать";
    addCardButton.disabled = false;
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

    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;

    closeModal(editProfileModal);
    
    profileEditButton.textContent = "Сохранить";
    profileEditButton.disabled = false; 
}

// Добавляем переменные для попапа смены аватара
const avatarPopup = document.querySelector('.popup_type_change-avatar');
const closeAvatarPopupButton = avatarPopup.querySelector('.popup__close_type_change-avatar');
const avatarForm = avatarPopup.querySelector('.popup__form_type_change-avatar');
const profileImage = document.querySelector('.profile__image');

// Обработчик отправки формы для смены аватара
function handleAvatarFormSubmit(evt) {
    evt.preventDefault(); 
    const avatarUrl = avatarForm.querySelector('input[name="avatarUrl"]').value; // Получаем URL

    const avatarButton = avatarForm.querySelector(".popup__button");
    avatarButton.textContent = "Сохранение...";
    avatarButton.disabled = true; 

    profileImage.style.backgroundImage = `url(${avatarUrl})`;
    closeModal(avatarPopup); 
    avatarForm.reset();

    avatarButton.textContent = "Сохранить";
    avatarButton.disabled = false; 
}

// Открытие попапа смены аватара
document.querySelector('.edit-avatar-button').addEventListener('click', () => {
    openModal(avatarPopup);
});

// Закрытие попапа смены аватара
closeAvatarPopupButton.addEventListener('click', () => {
    closeModal(avatarPopup);
});

// Прикрепляем обработчики к форме смены аватара
avatarForm.addEventListener('submit', handleAvatarFormSubmit);

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

// Включение валидации
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

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
        clearValidation(profileForm, {
          inputSelector: ".popup__input",
          submitButtonSelector: ".popup__button",
        });
        toggleSubmitButton(profileForm); 
      }
    });
  }

  // При открытии формы добавления карточки
  if (addButton) {
   
    addButton.addEventListener("click", () => {
      if (cardForm) {
        clearValidation(cardForm, {
          inputSelector: ".popup__input",
          submitButtonSelector: ".popup__button",
        });
        toggleSubmitButton(cardForm); 
      }
    });
  }

  // При открытии формы изменения аватара
  if (changeAvatarButton) {
    
    changeAvatarButton.addEventListener("click", () => {
      if (avatarForm) {
        clearValidation(avatarForm, {
          inputSelector: ".popup__input",
          submitButtonSelector: ".popup__button",
        });
        toggleSubmitButton(avatarForm); 
      }
    });
  }
});

// Токен: 92b1f524-5bc8-4fa7-bf54-c65aa9257259
// Идентификатор группы: wff-cohort-21

// Интеграция с API

import { getInitialCards, getUserInfo, updateUserInfo, addCard } from './api.js';

// Получение карточек и пользователя
Promise.all([getInitialCards(), getUserInfo()])
    .then(([cards, user]) => {
        console.log('Карточки:', cards);
        console.log('Пользователь:', user);
        
    })
    .catch(err => {
        console.log(err); 
    });

// Обновление информации о пользователе
updateUserInfo('Новое Имя', 'Новая Информация')
    .then(updatedUser => {
        console.log('Профиль обновлён:', updatedUser);
    })
    .catch(err => {
        console.log(err); 
    });

// Добавление новой карточки
addCard('Название карточки', 'https://example.com/image.jpg')
    .then(newCard => {
        console.log('Новая карточка добавлена:', newCard);
    })
    .catch(err => {
        console.log(err); 
    });




// // Запрос за карточками
// const fetchCards = fetch(
//   "https://mesto.nomoreparties.co/v1/wff-cohort-21/cards",
//   {
//     headers: {
//       authorization: "92b1f524-5bc8-4fa7-bf54-c65aa9257259",
//     },
//   }
// ).then((res) => {
//   if (!res.ok) {
//     throw new Error(`Ошибка при загрузке карточек: ${res.status}`);
//   }
//   return res.json();
// });

// // Запрос информации о пользователе
// const fetchUser = fetch(
//   "https://mesto.nomoreparties.co/v1/wff-cohort-21/users/me",
//   {
//     method: "GET",
//     headers: {
//       authorization: "92b1f524-5bc8-4fa7-bf54-c65aa9257259",
//     },
//   }
// ).then((res) => {
//   if (!res.ok) {
//     throw new Error(`Ошибка при загрузке данных пользователя: ${res.status}`);
//   }
//   return res.json();
// });

// // Используем Promise.all
// Promise.all([fetchCards, fetchUser])
//   .then(([cards, user]) => {
//     console.log("Карточки:", cards);
//     console.log("Данные пользователя:", user);
//     // Здесь вы можете продолжить работу с полученными данными
//   })
//   .catch((err) => {
//     console.error("Произошла ошибка:", err);
//   });
// //Поэтому для загрузки данных пользователя и карточек необходимо воспользоваться методом Promise.all()

// async function updateUser(params) {
//   if (!params) {
//     return;
//   }
//   fetch("https://mesto.nomoreparties.co/v1/wff-cohort-21/users/me", {
//     method: "PATCH",
//     headers: {
//       authorization: "92b1f524-5bc8-4fa7-bf54-c65aa9257259",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(params),
//   });
// }

// updateUser({
//   name: "Daria Penshina",
//   about: "Turism",
// });

// //Добавление карточки
// async function addCardsPost(params) {
//   if (!params) {
//     return;
//   }
//   fetch("https://mesto.nomoreparties.co/v1/wff-cohort-21/users/me", {
//     method: "POST",
//     headers: {
//       authorization: "92b1f524-5bc8-4fa7-bf54-c65aa9257259",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(params),
//   });
// }

// addCardsPost({
//   name: "Черногория",
//   link: "https://avatars.mds.yandex.net/i?id=ae829253edf93c35e7fd4e68e4002217_l-5378083-images-thumbs&n=13",
// });

// //Удаление карточки
// async function deleteCard(cardId) {
//   const response = await fetch(
//     "https://mesto.nomoreparties.co/v1/wff-cohort-21/cards/${cardId}",
//     {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         authorization: "92b1f524-5bc8-4fa7-bf54-c65aa9257259",
//       },
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`Ошибка удаления карточки: ${response.statusText}`);
//   }

//   console.log("Карточка удалена успешно!");
// }

// // Вызов функции для удаления карточки
// deleteCard(cardId).catch((error) => {
//   console.error("Произошла ошибка:", error);
// });

// //Лайк
// async function likeCard(cardId) {
//   try {
//     // Отправляем PUT-запрос для постановки лайка
//     const response = await fetch(
//       `https://mesto.nomoreparties.co/v1/wff-cohort-21/cards/likes/${cardId}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: "92b1f524-5bc8-4fa7-bf54-c65aa9257259",
//         },
//       }
//     );

//     // Проверяем, был ли запрос успешным
//     if (!response.ok) {
//       throw new Error(`Ошибка: ${response.statusText}`);
//     }

//     // Возвращаем обновленные данные карточки
//     return await response.json();
//   } catch (error) {
//     console.error("Ошибка при постановке лайка:", error);
//   }
// }
// likeCard();
// async function unlikeCard(cardId) {
//   try {
//     // Отправляем DELETE-запрос для снятия лайка
//     const response = await fetch(
//       `https://mesto.nomoreparties.co/v1/wff-cohort-21/cards/likes/${cardId}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: "92b1f524-5bc8-4fa7-bf54-c65aa9257259",
//         },
//       }
//     );

//     // Проверяем, был ли запрос успешным
//     if (!response.ok) {
//       throw new Error(`Ошибка: ${response.statusText}`);
//     }

//     // Возвращаем обновленные данные карточки
//     return await response.json();
//   } catch (error) {
//     console.error("Ошибка при снятии лайка:", error);
//   }
// }
// unlikeCard();
