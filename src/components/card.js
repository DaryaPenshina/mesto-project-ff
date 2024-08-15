const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

export function createCard(cardData) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    // Обработчик на кнопку лайка
    likeButton.addEventListener('click', handleLike);

    // Обработчик на кнопку удаления карточки
    deleteButton.addEventListener('click', () => {
        handleCardDelete(cardElement);
    });

    return cardElement;
}

function handleLike(event) {
    const likeButton = event.target;
    likeButton.classList.toggle('card__like-button_active');
}
initialCards.forEach((cardData) => {
    const newCard = createCard(cardData, handleLike); 
    placesList.prepend(newCard); 
  });

function handleCardDelete(cardElement) {
    cardElement.remove();
}

function handleAddCardSubmit(evt) {
    evt.preventDefault(); 
  
    const cardName = document.querySelector(".popup__input_type_card-name").value;
    const cardLink = document.querySelector(".popup__input_type_url").value;
  
    // Создаем новую карточку
    const newCardData = {
      name: cardName,
      link: cardLink,
    };
    const newCard = createCard(newCardData);
    placesList.prepend(newCard); // Добавляем в начало списка
  
    // Закрываем попап и очищаем форму
    closeModal(document.querySelector(".popup_type_new-card"));
    addCardForm.reset(); 
  }
  addCardForm.addEventListener("submit", handleAddCardSubmit);
