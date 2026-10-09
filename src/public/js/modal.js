// /js/modal.js
const instances = {};

function getModal(idModal) {
    const el = document.getElementById(idModal);
    if (!el) throw new Error(`No existe el modal #${idModal}`);

    if (!instances[idModal]) {
        instances[idModal] = new Modal(el, {
            backdrop: 'static',   // usas tu propio backdrop dentro del HTML
            closable: true
        });
    }
    return instances[idModal];
}

export function openModal(idModal) {
    getModal(idModal).show();
}

export function closeModal(idModal) {
    getModal(idModal).hide();
}