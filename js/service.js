/**
 * fonction qui permet de trouvais l'erreur attribuer et envoyer un message en retour
 * @param {*} errorCode 
 */
 function showError(errorCode) {
    switch (errorCode) {
        case 401:
            console.log("utilisateur non authentifié");
            break;
        case 403:
            console.log("accès refusé");
            break;
        case 404:
            console.log("page non trouvée");
            break;
        case 500:
            console.log("erreur serveur");
            break;
        case 503:
            console.log("erreur serveur");
            break;
        case 504:
            console.log("le serveur n'a pas répondu");
            break;
    
        default:
            console.log("Une erreur vient d'arriver");
            break;
    }
  }


function regexTest(regexData) {
    const regex = new RegExp('^[0-9 ]+[A-Za-z]+[A-Za-z0-9 ]*$');
    return regex.test(regexData);
}
