// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(cardData, deleteHandler) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image').src = cardData.link;;
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
// @todo: Функция удаления карточки
    deleteButton.addEventListener('click', function() {
        deleteHandler(cardElement);
    });

    return cardElement;
}
// @todo: Вывести карточки на страницу
initialCards.forEach(cardData => {
    const newCard = createCard(cardData, handleCardDelete);
    placesList.appendChild(newCard);
});

function handleCardDelete(cardElement) {
    cardElement.remove();

}
