import { deleteCard, likeCard, unlikeCard } from "./api.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

const createCard = (cardData, openDeleteCardPopup, openImagePopup) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteCardButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  // Устанавливаем данные карточки
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Выборочно показываем кнопку удаления
  const currentUserId = localStorage.getItem("currentUserId");
  deleteCardButton.style.display =
    cardData.owner && cardData.owner._id === currentUserId ? "block" : "none";

  likeCount.textContent = Array.isArray(cardData.likes)
    ? cardData.likes.length
    : "0";

  // Проверка на лайк от текущего пользователя
  const isLiked =
    Array.isArray(cardData.likes) &&
    cardData.likes.some((user) => user._id === currentUserId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_active");
  }

  // Обработчик клика на изображение
  cardImage.addEventListener("click", () => {
    openImagePopup(cardData.link, cardData.name);
  });

  // Обработчик клика на кнопку удаления
  deleteCardButton.addEventListener("click", () => {
    openDeleteCardPopup(cardData._id, cardElement, handleCardDelete);
  });

  // Обработчик клика на кнопку лайка
  likeButton.addEventListener("click", () => {
    handleLike(likeButton, cardData._id, likeCount);
  });

  return cardElement;
};

function handleLike(likeButton, cardId, likeCount) {
  if (likeButton.classList.contains("card__like-button_active")) {
    unlikeCard(cardId)
      .then((data) => {
        likeButton.classList.remove("card__like-button_active");
        likeCount.textContent = data.likes.length;
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    likeCard(cardId)
      .then((data) => {
        likeButton.classList.add("card__like-button_active");
        likeCount.textContent = data.likes.length;
      })
      .catch((err) => {
        console.error("Ошибка при добавлении лайка:", err);
      });
  }
}

function handleCardDelete(cardElement, cardId) {
  return deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error(err);
    });
}
export { createCard, handleCardDelete };
