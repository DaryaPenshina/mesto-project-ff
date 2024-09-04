// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

const createCard = (cardData, onDeleteCard, onLikeCard, openImagePopup) => {
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

  // Скрываем кнопку удаления, если карточка создана не пользователем
  const currentUserId = localStorage.getItem("currentUserId");
  if (cardData.owner && cardData.owner._id === currentUserId) {
    deleteCardButton.style.display = 'block'; 
  } else {
    deleteCardButton.style.display = 'none'; 
  }

  if (Array.isArray(cardData.likes)) {
    likeCount.textContent = cardData.likes.length; 
  } else {
    likeCount.textContent = '0'; 
  }

  // Проверка статуса лайка у пользователя
  const isLiked = Array.isArray(cardData.likes) && cardData.likes.some(user => user._id === currentUserId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_active");
  }

  // Обработчик клика на изображение
  cardImage.addEventListener("click", () => {
    openImagePopup(cardData.link, cardData.name);
  });

  // Обработчик клика на кнопку удаления
  deleteCardButton.addEventListener("click", () => onDeleteCard(cardElement));

  // Обработчик клика на кнопку лайка
  likeButton.addEventListener("click", () => onLikeCard(likeButton,cardData._id));
  return cardElement;
};

function handleCardDelete(cardElement) {
  cardElement.remove();
}

export { createCard, handleCardDelete };