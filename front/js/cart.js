

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
      console.log(itemTotalPrice);
      console.log(totalQuantity+" "+totalPrice);
      
      totalPrice+=itemTotalPrice;
      console.log(totalPrice);

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
      
      //
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

      //calculer la quantité totale et le prix total
      inputQuantity.addEventListener('change',()=>{
        console.log(totalQuantity);
        item.quantity=inputQuantity.value;
        console.log(item.quantity);
        itemTotalPrice=item.quantity*item.price;
        productPrice.innerText=itemTotalPrice;
        productPrice.append("€");
        cartTotalQuantity();
        cartTotalCost();
      
      })
      
      // construire supprimer 
      const cartDelete = document.createElement("div");
      cartItemSettingDiv.appendChild(cartDelete);
      cartDelete.className = "cart__item__content__settings__delete";

      let itemDelete = document.createElement('p');
      cartDelete.appendChild(itemDelete);
      itemDelete.className = "deleteItem";
      itemDelete.append('Supprimer');

      itemDelete.addEventListener('click',()=>{
        const cartPreviousLength= cart.length;
        console.log("previous length....."+cartPreviousLength)
              
        updatedCart= [...cart.filter(elt=>elt.id+elt.colors!==item.id+item.colors)];
        console.log(updatedCart);
        console.log("updated length....."+updatedCart.length)

        if (updatedCart.length < cartPreviousLength) {
            localStorage.setItem("items", JSON.stringify(updatedCart));
            cartParent.removeChild(cartArticle); //permet de faire la mise a jour sans rafraichir la page - single page
            updateCartTotals(updatedCart.length)
        }
      })
    });
  }
}

  function cartTotalQuantity() {
      const itemQuantityElt = document.querySelectorAll('.itemQuantity');
      let tQuantity = 0;
      const totalQuantityElt=document.getElementById('totalQuantity')
      itemQuantityElt.forEach(qte => {
      tQuantity += parseInt(qte.value); 
      })
      return totalQuantityElt.innerText = tQuantity;
  }
  function cartTotalCost() {
        const itemPriceElt = document.querySelectorAll('.itemTotalPrice');
        let itTotalPrice = 0;
        itemPriceElt.forEach(price => {
        itTotalPrice += parseInt(price.innerText);
      })
       document.getElementById('totalPrice').innerText =  itTotalPrice;
  }
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

  
  //  formulaire
  //--------------------------------------------------------------
  //construire le DOM de formulaire 
  const parentForm = document.querySelector('.cart__order');
  const submitBtn = document.getElementById('order');
    
  const inputFirstName = document.getElementById('firstName');
  const inputLastName = document.getElementById('lastName');
  const inputAddress = document.getElementById('address');
  const inputCity = document.getElementById('city');
  const inputEmail = document.getElementById('email');

  //regex 
  const regexNames = /^[a-z ,.'-]+$/i;
  const regexAddress = /^[a-zA-Z0-9\s,'-]*$/;
  const regexCity = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;
  const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;

  // Ecoute et attribution de point(pour sécurité du clic) si ces champs sont ok d'après la regex
  //----------------------------------------------------------------

  inputFirstName.addEventListener("input", (e) => {
    //si il est invalide, on affiche un message d'erreur personnalisé
    if (regexNames.test(e.target.value) == false) {
      document.getElementById('firstNameErrorMsg').innerHTML= "format incorrect";
      inputFirstName.style.backgroundColor = "red";
      console.log(e.target.value);
      } else { document.getElementById('firstNameErrorMsg').innerHTML = "";
        inputFirstName.style.backgroundColor = "green";
      } 
      if(e.target.value == "" ) {
        inputFirstName.style.backgroundColor = "white";
        console.log('champ vide');
        document.getElementById('firstNameErrorMsg').innerHTML = "champ vide"; 
      }
  });
  inputLastName.addEventListener("input", (e) => {
    if (regexNames.test(e.target.value) == false) { 
      document.getElementById('lastNameErrorMsg').innerHTML = "format incorrect";
      inputLastName.style.backgroundColor = "red";
      } else { document.getElementById('lastNameErrorMsg').innerHTML = ""
        inputLastName.style.backgroundColor = "green";
      }
      if(e.target.value == "" ) {
        inputLastName.style.backgroundColor = "white";
        console.log('champ vide');
        document.getElementById('lastNameErrorMsg').innerHTML = "champ vide"; 
      }
  });
  inputAddress.addEventListener("input", (e) => {
    if (regexAddress.test(e.target.value) == false) {
      document.getElementById('addressErrorMsg').innerHTML = "format incorrect";
      inputAddress.style.backgroundColor = "red";
      } else { document.getElementById('addressErrorMsg').innerHTML = "" ;
        inputAddress.style.backgroundColor = "green";
      }
      if(e.target.value == "" ) {
        inputAddress.style.backgroundColor = "white";
        console.log('champs vide');
        document.getElementById('addressErrorMsg').innerHTML = "champ vide"; 
      }
  });
  inputCity.addEventListener("input", (e) => {
    if (regexCity.test(e.target.value) == false) {
      document.getElementById('cityErrorMsg').innerHTML = "format incorrect";
      inputCity.style.backgroundColor = "red";
      } else { document.getElementById('cityErrorMsg').innerHTML = "" ;
          inputCity.style.backgroundColor = "green";
      }
      if(e.target.value == "" ) {
        inputCity.style.backgroundColor = "white";
        console.log('champs vide');
        document.getElementById('cityErrorMsg').innerHTML = "champ vide"; 
      }
  });
  inputEmail.addEventListener("input", (e) => {
    if (regexMail.test(e.target.value) == false) {
        document.getElementById('emailErrorMsg').innerHTML = "Forme email pas encore conforme";
           
      } else { document.getElementById('emailErrorMsg').innerHTML = "";
        inputEmail.style.backgroundColor = "green";
      }
      if(e.target.value == "" ) {
        inputEmail.style.backgroundColor = "white";
        console.log('champs vide');
        document.getElementById('emailErrorMsg').innerHTML = "Veuillez renseigner votre email."; 
      }
  });
    
  // Evenement de validation/d'accés au clic du bouton du formulaire
  //--------------------------------------------------------------
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault() //empeche le refresh de la page quand on clique

    const contact = { 
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      address: inputAddress.value,
      city: inputCity.value,
      email: inputEmail.value,
      };
      //test si un champ est vide, ne pas générer de commande
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
    console.log(products);

    // le paquet que l'on veut envoyer
    const orderData = { contact, products }; 

    // envoi à la ressource api
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

showCart();