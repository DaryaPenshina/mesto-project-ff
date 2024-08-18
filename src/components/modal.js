export function openModal(modal) {
  modal.classList.add("popup_opened");
  document.addEventListener("keydown", handleEsc);
}

export function closeModal(modal) {
  modal.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEsc);
}

function handleEsc(event) {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_opened"));
  }
}
