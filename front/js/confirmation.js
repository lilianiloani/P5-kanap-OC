
// AFFICHAGE DE NUMÉRO DE COMMANDE ET RÉMISE À ZERO DE LOCALSTORAGE
//-----------------------------------------------------------------
const url = new URL(window.location.href);

//récupration du numero de commande 
const orderId = url.searchParams.get("orderId");
const confirmationIdElt = document.getElementById('orderId');
confirmationIdElt.innerHTML = orderId;
document.querySelector("#orderId").innerHTML = `<br>${orderId}<br>Merci pour votre achat!`;

//RAZ du localStorage
localStorage.clear();
