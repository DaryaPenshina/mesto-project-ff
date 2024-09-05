
// Функция для показа ошибки
const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    if (errorElement) {
      inputElement.classList.add(settings.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(settings.errorClass);
    }
  };
  
  // Функция для скрытия ошибки
  const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    if (errorElement) {
      inputElement.classList.remove(settings.inputErrorClass);
      errorElement.classList.remove(settings.errorClass);
      errorElement.textContent = '';
    }
  };
  
  // Основная функция валидации для поля
  const isValid = (formElement, inputElement, settings) => {
    let errorMessage = '';
      
    if (!inputElement.value) {
      errorMessage = 'Вы пропустили это поле.';
    } else if (inputElement.type === 'url') {
      
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
      showInputError(formElement, inputElement, errorMessage, settings);
    } else {
      hideInputError(formElement, inputElement, settings);
    }
  };
  
  // Функция для управления состоянием кнопки
  const toggleSubmitButtonState = (formElement, submitButton, settings) => {
    const inputs = formElement.querySelectorAll(settings.inputSelector);
    const allValid = Array.from(inputs).every(input => input.validity.valid);
    submitButton.disabled = !allValid;
    submitButton.classList.toggle(settings.inactiveButtonClass, !allValid);
  };
  
  // Функция для очистки валидации
  const clearValidation = (formElement, settings) => {
    if (!formElement) {
      console.error('Форма не найдена!');
      return;
    }
  
    const inputs = formElement.querySelectorAll(settings.inputSelector);
    const submitButton = formElement.querySelector(settings.submitButtonSelector);
    inputs.forEach(input => hideInputError(formElement, input, settings));
    toggleSubmitButtonState(formElement, submitButton, settings);
  };
  
  // Функция для включения валидации всех форм
  const enableValidation = (settings) => {
    const forms = document.querySelectorAll(settings.formSelector);
    forms.forEach(formElement => {
      const inputs = formElement.querySelectorAll(settings.inputSelector);
      const submitButton = formElement.querySelector(settings.submitButtonSelector);
  
      if (submitButton) { 
        inputs.forEach(input => {
          input.addEventListener('input', () => {
            isValid(formElement, input, settings);
            toggleSubmitButtonState(formElement, submitButton, settings);
          });
        });
        toggleSubmitButtonState(formElement, submitButton, settings);
      }
    });
  };
  
  export { enableValidation, clearValidation };