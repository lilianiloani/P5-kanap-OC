
// Affichage autoinvoquée du numéro de commande et vide du storage
//------------------------------------------------------------
const url = new URL(window.location.href);
console.log(url);

const orderId = url.searchParams.get("orderId");
const confirmationIdElt = document.getElementById('orderId');
confirmationIdElt.innerHTML = orderId;
document.querySelector("#orderId").innerHTML = `<br>${orderId}<br>Merci pour votre achat`;

localStorage.clear();
