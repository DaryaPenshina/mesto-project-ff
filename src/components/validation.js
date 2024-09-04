
// Функция для показа ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  if (errorElement) { 
      inputElement.classList.add('popup__input_type_error');
      errorElement.textContent = errorMessage;
      errorElement.classList.add('popup__error_visible');
  }
};

// Функция для скрытия ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  if (errorElement) { 
      inputElement.classList.remove('popup__input_type_error');
      errorElement.classList.remove('popup__error_visible');
      errorElement.textContent = '';
  }
};

// Основная функция валидации для поля
const isValid = (formElement, inputElement) => {
  let errorMessage = ''; 

  // Проверка, пустое ли поле
  if (!inputElement.value) {
      errorMessage = 'Вы пропустили это поле.'; 
  } else if (inputElement.type === 'url') { 
      // Проверка на валидный URL
      try {
          new URL(inputElement.value);
      } catch (_) {
          errorMessage = 'Введите адрес сайта.';
      }
  } else {
      const regex = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\- ]+$/;
      errorMessage =
          inputElement.value && !regex.test(inputElement.value)
              ? 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.'
              : (inputElement.validity.valid
                  ? ''
                  : inputElement.validationMessage);
  }

  if (errorMessage) {
      showInputError(formElement, inputElement, errorMessage);
  } else {
      hideInputError(formElement, inputElement);
  }
};

// Функция для управления состоянием кнопки
const toggleSubmitButtonState = (formElement, submitButton) => {
  const inputs = formElement.querySelectorAll('.popup__input');
  const allValid = Array.from(inputs).every(input => input.validity.valid);
  submitButton.disabled = !allValid;
  submitButton.classList.toggle('popup__button_disabled', !allValid);
};

// Функция для очистки валидации
const clearValidation = (formElement, settings) => {
  if (!formElement) {
      console.error('Форма не найдена!');
      return;
  }

  const inputs = formElement.querySelectorAll(settings.inputSelector);
  const submitButton = formElement.querySelector(settings.submitButtonSelector);
  inputs.forEach(input => hideInputError(formElement, input));
  toggleSubmitButtonState(formElement, submitButton);
};

// Функция для включения валидации всех форм
const enableValidation = (settings) => {
  const forms = document.querySelectorAll(settings.formSelector);
  forms.forEach(formElement => {
      const inputs = formElement.querySelectorAll(settings.inputSelector);
      const submitButton = formElement.querySelector(settings.submitButtonSelector);

      if (submitButton) { // Проверка наличия кнопки отправки
          inputs.forEach(input => {
              input.addEventListener('input', () => {
                  isValid(formElement, input);
                  toggleSubmitButtonState(formElement, submitButton);
              });
          });
          toggleSubmitButtonState(formElement, submitButton); 
      }
  });
};

export { enableValidation, clearValidation };