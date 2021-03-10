const dataOrder = JSON.parse(localStorage.getItem("Order"));

/**
 * Permet de crée le bon de commande selon les data
 */
function orderHtml() {
    // Recupération des élements
    let message = document.querySelector('.order__info__message');
    let numero = document.querySelector('.order__info__numero');
    let adresse = document.querySelector('.order__info__adresse');
    let email = document.querySelector('.order__info__email');

    // Creation des messages avec les data
    numero.innerHTML = `Votre numero de commande: ${dataOrder.orderId}`;
    message.innerHTML = `
        ${dataOrder.contact.lastName} ${dataOrder.contact.firstName}, 
        Orinoco vous remercie de la confiance que vous lui avez accordé !`;

    adresse.innerHTML = `
        Vos articles arriveront prochainement à l'adresse fournir 
        aux ${dataOrder.contact.address} a ${dataOrder.contact.city}.`;

    email.innerHTML = `
    Un email vous sera envoyer a email fournis ${dataOrder.contact.email}`;
}

orderHtml();