// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

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

  // Обработчик клика на изображение
  cardImage.addEventListener("click", () => {
    openImagePopup(cardData.link, cardData.name);
  });

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

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const newCard = createCard(cardData, handleLike);
  placesList.prepend(newCard);
});

// удаление карточки
function handleCardDelete(cardElement) {
  cardElement.remove(); // Удаление элемента из DOM
}

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

// Отправка формы добавления карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault(); 

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

// Прикрепляем обработчики к формам
formElement.addEventListener("submit", handleFormSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

// открытие попапа
function openModal(modal) {
  modal.classList.add("popup_opened"); 
  document.addEventListener("keydown", handleEsc);
}

// закрытие попапа
function closeModal(modal) {
  modal.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEsc);
}

//  клавишиа Esc
function handleEsc(event) {
  if (event.key === "Escape") {
    modals.forEach((modal) => {
      if (modal.classList.contains("popup_opened")) {
        closeModal(modal);
      }
    });
  }
}

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
















