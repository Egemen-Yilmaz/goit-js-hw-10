import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
form.addEventListener("submit", onFormSubmit);

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
}


function onFormSubmit(event) {
    event.preventDefault();

    const elements = event.currentTarget.elements;

    const delay  = Number.parseInt(elements.delay.value);

    const state = elements.state.value;

    createPromise(delay, state)
        .then((delay) => {
            iziToast.success({
                title: 'Success',
                message: `✅ Fulfilled promise in ${delay}ms`,
                position: 'topRight',
            });
        })
        .catch((delay) => {
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${delay}ms`,
                position: 'topRight',
            });
        });
    event.currentTarget.reset();
}