export function openModal(modal) {
    modal.classList.add('popup_opened');
    document.addEventListener('keydown', handleEsc);
}

export function closeModal(modal) {
    modal.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEsc);
}

function handleEsc(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.popup');
        modals.forEach(modal => {
            if (modal.classList.contains('popup_opened')) {
                closeModal(modal);
            }
        });
    }
}


