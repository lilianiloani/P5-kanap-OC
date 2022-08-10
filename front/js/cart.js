//initialisation des totaux de quantité et prix 
let totalPrice=0;
let totalQuantity=0;
let itemTotalPrice=0;

//récupération du contenu du localstorage
let cart=JSON.parse(localStorage.getItem('items'));

const cartParent=document.getElementById("cart__items");
const totalQuantityElt=document.getElementById('totalQuantity');
const totalPriceElt=document.getElementById('totalPrice');

//construire le DOM et afficher le contenu du panier
//---------------------------------------------------

function showCart() {
  if(cart) {
    updateCartTotals(cart.length); 
    cart.forEach(item=> {

      //calculer le prix total de l'article
      itemTotalPrice=item.price*item.quantity;
      totalPrice+=itemTotalPrice;

      //Article  
      const cartArticle = document.createElement('article');
      cartParent.appendChild(cartArticle);
      cartArticle.className = "cart__item";

      //Image de l'article 
      const cartItemImageDiv =document.createElement("div");
      cartArticle.appendChild(cartItemImageDiv);
      cartItemImageDiv.className = "cart__item__img";

      const cartItemImg = document.createElement("img");
      cartItemImageDiv.appendChild(cartItemImg);
      cartItemImg.src = item.image;
      cartItemImg.alt =  item.altTxt;

      // Contenu de l'article
      const cartItemContent =document.createElement("div");
      cartArticle.appendChild(cartItemContent);
      cartItemContent.className = "cart__item__content";

      // Description d'article
      const contentDescription = document.createElement("div");
      cartItemContent.appendChild(contentDescription);
    
      // Nom de l'article
      const productName = document.createElement("h2");
      contentDescription.appendChild(productName);
      productName.append(item.name);

      // Couleur de l'article 
      const productColor = document.createElement("p");
      contentDescription.appendChild(productColor);
      productColor.append(item.colors);

      //Prix de l'article
      const productPrice = document.createElement("p");
      contentDescription.appendChild(productPrice);

      productPrice.className="itemTotalPrice";
      productPrice.append(itemTotalPrice);
      productPrice.append('€');
      
      // paramètres de contenu de l'article 
      const cartSetting = document.createElement("div");
      cartArticle.appendChild(cartSetting);
      cartSetting.className = "cart__item__content__settings";
      
      const cartItemSettingDiv = document.createElement("div");
      cartArticle.appendChild(cartItemSettingDiv);
      cartItemSettingDiv.className = "cart__item__content__settings";

      //quantité de l'article
      const cartItemQuantityDiv = document.createElement("div");
      cartItemSettingDiv.appendChild(cartItemQuantityDiv);
      cartItemQuantityDiv.className = "cart__item__content__settings__quantity";
    
      const settingQuantityP = document.createElement("p");
      cartItemQuantityDiv.appendChild(settingQuantityP);
      settingQuantityP.append('Qté:');
      
      const inputQuantity = document.createElement("input");
      cartItemQuantityDiv.appendChild(inputQuantity);
      inputQuantity.type = "number";
      inputQuantity.className = "itemQuantity";
      inputQuantity.name = "itemQuantity";
      inputQuantity.min = 1;
      inputQuantity.max = 100;
      inputQuantity.value = item.quantity;
      cartTotalQuantity();

      document.getElementById('totalPrice').innerText=totalPrice;

      //mise à jour de la quantité et du prix 
      inputQuantity.addEventListener('change',()=>{
        item.quantity=inputQuantity.value;
        itemTotalPrice=item.quantity*item.price;
        //mise à jour du localstorage
        localStorage.setItem("items", JSON.stringify(cart));
        productPrice.innerText=itemTotalPrice;
        productPrice.append("€");
        cartTotalQuantity();
        cartTotalCost();
      })

      // mise en oeuvre de la fonctionnalité de suppression 
      const cartDeleteDiv = document.createElement("div");
      cartItemSettingDiv.appendChild(cartDeleteDiv);
      cartDeleteDiv.className = "cart__item__content__settings__delete";

      let itemDeleteP = document.createElement('p');
      cartDeleteDiv.appendChild(itemDeleteP);
      itemDeleteP.className = "deleteItem";
      itemDeleteP.append('Supprimer');

      itemDeleteP.addEventListener('click',()=>{
        const cartPreviousLength= cart.length;
        cart=JSON.parse(localStorage.getItem('items'));
         
        updatedCart= [...cart.filter(elt=>elt.id+elt.colors!==item.id+item.colors)];
        if (updatedCart.length < cartPreviousLength) {
            localStorage.setItem("items", JSON.stringify(updatedCart));
            cartParent.removeChild(cartArticle); //permet la mise à jour de l'affichage
            updateCartTotals(updatedCart.length)
        } 
      }) 
    })
  }
  
}
  //  LE FORMULAIRE DE COMMANDES
  //--------------------------------------------------------------
  //Accès aux éléments  (DOM)de formulaire de commande
  const parentForm = document.querySelector('.cart__order');
  const submitBtn = document.getElementById('order');
    
  const inputFirstName = document.getElementById('firstName');
  const inputLastName = document.getElementById('lastName');
  const inputAddress = document.getElementById('address');
  const inputCity = document.getElementById('city');
  const inputEmail = document.getElementById('email');
  
  const firstNameErrorMsgElt = document.getElementById('firstNameErrorMsg');
  const lastNameErrorMsgElt = document.getElementById('lastNameErrorMsg');
  const addressErrorMsgElt = document.getElementById('addressErrorMsg');
  const cityErrorMsgElt = document.getElementById('cityErrorMsg');
  const emailErrorMsgElt = document.getElementById('emailErrorMsg');

  //regex 
  const regexNames = /^[a-z ,.'-]+$/i;
  const regexAddress = /^[a-zA-Z0-9\s,'-]*$/;
  const regexCity = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
  const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;

  //Contrôle des champs du formulaire et geston d'erreurs
  //----------------------------------------------------------------
  //évènement de gestion controle de la saisie utilisateur
  inputFirstName.addEventListener("input", (e) => {
    //appel de la fonction du contrôle de la saisie utilisateur
    formInputsCheck(firstNameErrorMsgElt,regexNames, e.target.value, inputFirstName); 

  });
  inputLastName.addEventListener("input", (e) => {
    formInputsCheck(lastNameErrorMsgElt,regexNames, e.target.value, inputLastName);
    
  });
  inputAddress.addEventListener("input", (e) => {
    formInputsCheck(addressErrorMsgElt,regexAddress, e.target.value, inputAddress);
    
  });
  inputCity.addEventListener("input", (e) => {
    formInputsCheck(cityErrorMsgElt,regexCity, e.target.value, inputCity);
   
  });
  inputEmail.addEventListener("input", (e) => {
    formInputsCheck(emailErrorMsgElt,regexMail, e.target.value, inputEmail); 
    
  });

  
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault() 

    const contact = { 
    firstName: inputFirstName.value,
    lastName: inputLastName.value,
    address: inputAddress.value,
    city: inputCity.value,
    email: inputEmail.value,
    };
    //check des champs vides avant validation de la commande
    if (inputFirstName.value == "" || inputLastName.value == "" ||
    inputAddress.value == "" || inputCity.value == "" || inputEmail.value == "") {
      alert("Champ(s) manquant(s)");
      return false;
    };
    if (regexAddress.test(contact.address) == false || regexMail.test(contact.email) == false || regexCity.test(contact.city) == false || regexNames.test(contact.firstName || regexNames.test(contact.lastName) == false) == false) {
      alert("Merci de remplir correctement le formulaire pour valider votre commande");
      return false;
    };

    // Envoi de la commande
   //----------------------------------------------------------------
        
    const products = []; 
    
    cart.forEach(item => {
    products.push(item.id);
    });

    // les  données  que l'on veut envoyer
    const orderData = { contact, products }; 

    // envoi des ressources de commande via la méthode POST 
    fetch((`http://localhost:3000/api/products/order`), {
      method: 'POST',
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(orderData),
    })
    .then(response => { 
      return response.json() 
    })
    .then((commande) => {
      window.location.href = `confirmation.html?orderId=${commande.orderId}`; //redirige vers la page confirmation de commande
    })
    .catch((error) => {
      alert(error);
      });
  });

  //fonction pour calculer la quantité totale
  function cartTotalQuantity() {
    const itemQuantityElt = document.querySelectorAll('.itemQuantity');
    let tQuantity = 0;
    const totalQuantityElt=document.getElementById('totalQuantity')
    itemQuantityElt.forEach(qte => {
    tQuantity += parseInt(qte.value); 
    })
    return totalQuantityElt.innerText = tQuantity;
  }
  //fonction pour calculer le coût total
  function cartTotalCost() {
        const itemPriceElt = document.querySelectorAll('.itemTotalPrice');
        let itTotalPrice = 0;
        itemPriceElt.forEach(price => {
        itTotalPrice += parseInt(price.innerText);
      })
      document.getElementById('totalPrice').innerText =  itTotalPrice;
  }
  //fonction de mise à jour du contenu du panier
  function updateCartTotals(cartLength){
    if(cartLength > 0){
      cartTotalCost();
      cartTotalQuantity();
    }else{
      totalQuantityElt.innerText = 0;
      totalPriceElt.innerText =0;
      const cartContainer=document.querySelector('#cartAndFormContainer');
      cartContainer.innerHTML="<h1> Le panier est vide <h1>"
    }
  } 
  //fonction de contrôle de la saisie utilisateur sur les champs de formulaire 
  function formInputsCheck(errorMessageElt, regex, inputValue, inputTypeElt){
    if (regex.test(inputValue) == false){
      errorMessageElt.innerHTML= "format incorrect";
      inputTypeElt.style.backgroundColor = "red";
    } else {errorMessageElt.innerHTML = "";
        inputTypeElt.style.backgroundColor = "green";
      } 
    if(inputValue == "" ) {
      inputTypeElt.style.backgroundColor = "white";
      errorMessageElt.innerHTML = "champ vide"; 
    }
  }

showCart();

