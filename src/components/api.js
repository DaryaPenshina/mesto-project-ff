const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-21',
  headers: {
      authorization: '92b1f524-5bc8-4fa7-bf54-c65aa9257259',
      'Content-Type': 'application/json'
  },
};

// Функция для получения начальных карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
  })
  .then(res => {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Функция для получения информации о пользователе
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
  })
  .then(res => {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Функция для обновления информации о пользователе
export const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ name, about }),
  })
  .then(res => {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Функция для добавления новой карточки
export const addCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({ name, link }),
  })
  .then(res => {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Функция для удаления карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
  })
  .then(res => {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Функция для постановки лайка
export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers,
  })
  .then(res => {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Функция для снятия лайка
export const unlikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
  })
  .then(res => {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  });
};

// Функция для обновления аватара
export const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ avatar: avatarUrl }),
  })
  .then(res => {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  });
};