// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

const createCard = (cardData, onDeleteCard, onLikeCard, openImagePopup) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteCardButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  // Устанавливаем данные карточки
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Обработчик клика на изображение
  cardImage.addEventListener("click", () => {
    openImagePopup(cardData.link, cardData.name);
  });

  // Обработчик клика на кнопку удаления
  deleteCardButton.addEventListener("click", () => onDeleteCard(cardElement));

  // Обработчик клика на кнопку лайка
  likeButton.addEventListener("click", () => onLikeCard(likeButton));
  return cardElement;
};

function handleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_active");
}

function handleCardDelete(cardElement) {
  cardElement.remove();
}

export { handleLike, createCard, handleCardDelete };
