
let totalPrice=0;
let totalQuantity=0;
let itemTotalPrice=0;
let cart=JSON.parse(localStorage.getItem('items'));

const page = document.location.href;

function showCart() {
    //let cart=JSON.parse(localStorage.getItem('items'));
    console.log(cart);
    cart.forEach(item=> {

        //calculateTotalCost()
        
        itemTotalPrice=item.price*item.quantity;
        console.log(itemTotalPrice);
        console.log(totalQuantity+" "+totalPrice);
        totalPrice+=itemTotalPrice;
        console.log(totalPrice);
        console.log(item);

        // INSERTED HTML 

    //added article tag
        const cartArticle = document.createElement('article');
        document.getElementById("cart__items").appendChild(cartArticle);
        cartArticle.className = "cart__item";
    // Create div product image
        const cartItemImageDiv =document.createElement("div");
        cartArticle.appendChild(cartItemImageDiv);
        cartItemImageDiv.className = "cart__item__img";

        //create image tag
        const cartItemImg = document.createElement("img");
        cartItemImageDiv.appendChild(cartItemImg);
        cartItemImg.src = item.image;
        cartItemImg.alt =  item.altTxt;

    // Create div product content
        const cartItemContent =document.createElement("div");
        cartArticle.appendChild(cartItemContent);
        cartItemContent.className = "cart__item__content";

    // Create div product description
        const contentDescription = document.createElement("div");
        cartItemContent.appendChild(contentDescription);

    // Create product title
        const productName = document.createElement("h2");
        contentDescription.appendChild(productName);
        productName.append(item.name);

    // Create product color
        const productColor = document.createElement("p");
        contentDescription.appendChild(productColor);
        productColor.append(item.colors);
    
        const productPrice = document.createElement("p");
        contentDescription.appendChild(productPrice);
        productPrice.className="itemTotalPrice";
        //console.log(item.price*item.quantity)
        productPrice.append(itemTotalPrice);
        productPrice.append('€');
        
    // Create div settings
        const cartItemSettingDiv = document.createElement("div");
        cartArticle.appendChild(cartItemSettingDiv);
        cartItemSettingDiv.className = "cart__item__content__settings";

    // Create div quantity
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

        //calculateCostAndQty();
        cartTotalQuantity()

        inputQuantity.addEventListener('change',()=>{
            console.log(totalQuantity);
            item.quantity=inputQuantity.value;
            console.log(item.quantity);
            itemTotalPrice=item.quantity*item.price;
            productPrice.innerText = itemTotalPrice;
            productPrice.append("€");
            cartTotalQuantity();
            cartTotalCost();

        })
    
        document.getElementById('totalPrice').innerHTML=totalPrice;
    
        //Create Div delete
        const cartDelete = document.createElement("div");
        cartItemSettingDiv.appendChild(cartDelete);
        cartDelete.className = "cart__item__content__settings__delete";
    
        const itemDelete = document.createElement('p');
        cartDelete.appendChild(itemDelete);
        itemDelete.className = "deleteItem";
        itemDelete.append('Supprimer');

        // déclaration de variables
    const deleteCart = document.querySelectorAll(".cart__item .deleteItem");

    // pour chaque élément cartdelete
    deleteCart.forEach((deleteCart) => {

      // On écoute s'il y a un clic dans l'article concerné
      deleteCart.addEventListener("click", () => {

        // appel de la ressource du local storage
        let panier = JSON.parse(localStorage.getItem("items"));
        for (let d = 0, c = panier.length; d < c; d++)
          if (
            panier[d].id === deleteCart.dataset.id &&
            panier[d].color === deleteCart.dataset.color
          ) {
            // déclaration de variable utile pour la suppression
            const num = [d];

            // création d'un tableau miroir(mutation)
            let nouveauPanier = JSON.parse(localStorage.getItem("items"));

            //suppression de 1 élément à l'indice num
            nouveauPanier.splice(num, 1);

            //affichage informatif
            if (nouveauPanier && nouveauPanier.length == 0) {
              // si il n'y a pas de panier on créait un H1 informatif et quantité appropriées
              document.querySelector("#totalQuantity").innerHTML = "0";
              document.querySelector("#totalPrice").innerHTML = "0";
              document.querySelector("h1").innerHTML =
                "Vous n'avez pas d'article dans votre panier";
            }
            // on renvoit le nouveau panier converti dans le local storage et on joue la fonction
            localStorage.items = JSON.stringify(nouveauPanier);
            totalProduit(); // logique mais pas obligatoire à cause du reload plus bas qui raffraichit l'affichage; serait necessaire avec suppression sans reload
            // on recharge la page qui s'affiche sans le produit grace au nouveau panier
            return location.reload();
          }
      });
    });
        

    });

  
}

showCart();

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
            console.log(itTotalPrice);
        })
        //return totalPrice.innerText = itTotalPrice;
        return document.getElementById('totalPrice').innerText =  itTotalPrice;
    }

   //  formulaire
  //--------------------------------------------------------------

  // les données du client seront stockées dans ce tableau pour la commande sur page panier

  if (page.match("cart")) {
    var contactClient = {};
    localStorage.contactClient = JSON.stringify(contactClient);

    // on pointe les input nom prénom et ville
    var prenom = document.querySelector("#firstName");
    prenom.classList.add("regex_texte");
    var nom = document.querySelector("#lastName");
    nom.classList.add("regex_texte");
    var ville = document.querySelector("#city");
    ville.classList.add("regex_texte");

    // on pointe l'input adresse
    var adresse = document.querySelector("#address");
    adresse.classList.add("regex_adresse");

    // on pointe l'input email
    var email = document.querySelector("#email");
    email.classList.add("regex_email");

    // on pointe les élément qui ont la classe .regex_texte
    var regexTexte = document.querySelectorAll(".regex_texte");
    
    // modification du type de l'input type email à text à cause d'un comportement de l'espace blanc non voulu vis à vis de la regex 
    document.querySelector("#email").setAttribute("type", "text");
  }
  
  //regex 
  //--------------------------------------------------------------

  // /^ début regex qui valide les caratères a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ aussi les espaces blancs et tiret \s- comprit entre 1 et 31 caratères (nombre de caractère maximum sur carte identité) {1,31} et on termine la regex $/i en indiquant que les éléments selectionnés ne sont pas sensible à la casse
  let regexLettre = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i;

  // /^ début regex qui valide les caratères chiffre lettre et caratères spéciaux a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ aussi les espaces blancs et tiret \s- comprit entre 1 et 60 caratères (nombre de caractère maximum sur carte identité) {1,60} et on termine la regex $/i en indiquant que les éléments selectionnés ne sont pas sensible à la casse
  let regexChiffreLettre = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i;
  let regValideEmail = /^[a-z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]{1,60}$/i;
  let regMatchEmail = /^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,4}$/i;
  

  // Ecoute et attribution de point(pour sécurité du clic) si ces champs sont ok d'après la regex
  //--------------------------------------------------------------
  if (page.match("cart")) {
    regexTexte.forEach((regexTexte) =>
      regexTexte.addEventListener("input", (e) => {
        // valeur sera la valeur de l'input en dynamique
        valeur = e.target.value;
        // regNormal sera la valeur de la réponse regex, 0 ou -1
        let regNormal = valeur.search(regexLettre);
        if (regNormal === 0) {
          contactClient.firstName = prenom.value;
          contactClient.lastName = nom.value;
          contactClient.city = ville.value;
        }
        if (
          contactClient.city !== "" &&
          contactClient.lastName !== "" &&
          contactClient.firstName !== "" &&
          regNormal === 0
        ) {
          contactClient.regexNormal = 3;
        } else {
          contactClient.regexNormal = 0;
        }
        localStorage.contactClient = JSON.stringify(contactClient);
        couleurRegex(regNormal, valeur, regexTexte);
        valideClic();
      })
    );
  }
  
  // le champ écouté via la regex regexLettre fera réagir, grâce à texteInfo, la zone concernée
  //------------------------------------
  texteInfo(regexLettre, "#firstNameErrorMsg", prenom);
  texteInfo(regexLettre, "#lastNameErrorMsg", nom);
  texteInfo(regexLettre, "#cityErrorMsg", ville);
  
  // Ecoute et attribution de point(pour sécurité du clic) si ces champs sont ok d'après la regex
  //--------------------------------------------------------------
  if (page.match("cart")) {
    let regexAdresse = document.querySelector(".regex_adresse");
    regexAdresse.addEventListener("input", (e) => {
      // valeur sera la valeur de l'input en dynamique
      valeur = e.target.value;
      // regNormal sera la valeur de la réponse regex, 0 ou -1
      let regAdresse = valeur.search(regexChiffreLettre);
      if (regAdresse == 0) {
        contactClient.address = adresse.value;
      }
      if (contactClient.address !== "" && regAdresse === 0) {
        contactClient.regexAdresse = 1;
      } else {
        contactClient.regexAdresse = 0;
      }
      localStorage.contactClient = JSON.stringify(contactClient);
      couleurRegex(regAdresse, valeur, regexAdresse);
      valideClic();
    });
  }
  
  // le champ écouté via la regex regexChiffreLettre fera réagir, grâce à texteInfo, la zone concernée
  //------------------------------------
  texteInfo(regexChiffreLettre, "#addressErrorMsg", adresse);
  
  // Ecoute et attribution de point(pour sécurité du clic) si ce champ est ok d'après les regex
  //--------------------------------------------------------------
  if (page.match("cart")) {
    let regexEmail = document.querySelector(".regex_email");
    regexEmail.addEventListener("input", (e) => {
      // valeur sera la valeur de l'input en dynamique
      valeur = e.target.value;
      // https://webdevdesigner.com/q/what-characters-are-allowed-in-an-email-address-65767/ mon adresse doit avoir cette forme pour que je puisse la valider
      let regMatch = valeur.match(regMatchEmail);
      // quand le resultat sera correct, le console log affichera une autre réponse que null; regValide sera la valeur de la réponse regex, 0 ou -1
      let regValide = valeur.search(regValideEmail);
      if (regValide === 0 && regMatch !== null) {
        contactClient.email = email.value;
        contactClient.regexEmail = 1;
      } else {
        contactClient.regexEmail = 0;
      }
      localStorage.contactClient = JSON.stringify(contactClient);
      couleurRegex(regValide, valeur, regexEmail);
      valideClic();
    });
  }
  
  // texte sous champ email
  //------------------------------------
  if (page.match("cart")) {
    email.addEventListener("input", (e) => {
      // valeur sera la valeur de l'input en dynamique
      valeur = e.target.value;
      let regMatch = valeur.match(regMatchEmail);
      let regValide = valeur.search(regValideEmail);
      // si valeur est toujours un string vide et la regex différante de 0 (regex à -1 et le champ est vide mais pas d'erreur)
      if (valeur === "" && regMatch === null) {
        document.querySelector("#emailErrorMsg").textContent = "Veuillez renseigner votre email.";
        document.querySelector("#emailErrorMsg").style.color = "white";
        // si valeur n'est plus un string vide et la regex différante de 0 (regex à -1 et le champ n'est pas vide donc il y a une erreur)
      } else if ( regValide !== 0) {
        document.querySelector("#emailErrorMsg").innerHTML = "Caractère non valide";
        document.querySelector("#emailErrorMsg").style.color = "white";
        // pour le reste des cas (quand la regex ne décèle aucune erreur et est à 0 peu importe le champ vu qu'il est validé par la regex)
      } else if (valeur != "" && regMatch == null) {
        document.querySelector("#emailErrorMsg").innerHTML = "Caratères acceptés pour ce champ. Forme email pas encore conforme";
        document.querySelector("#emailErrorMsg").style.color = "white";
      } else {
        document.querySelector("#emailErrorMsg").innerHTML = "Forme email conforme.";
        document.querySelector("#emailErrorMsg").style.color = "white";
      }
    });
  }
  
  // fonction couleurRegex qui modifira la couleur de l'input par remplissage tapé, aide visuelle et accessibilité
  //--------------------------------------------------------------
  // on détermine une valeur de départ à valeur qui sera un string
  let valeurEcoute = "";
  // fonction à 3 arguments réutilisable, la regex, la valeur d'écoute, et la réponse à l'écoute
  function couleurRegex(regSearch, valeurEcoute, inputAction) {
    // si valeur est toujours un string vide et la regex différante de 0 (regex à -1 et le champ est vide mais pas d'erreur)
    if (valeurEcoute === "" && regSearch != 0) {
      inputAction.style.backgroundColor = "white";
      inputAction.style.color = "black";
      // si valeur n'est plus un string vide et la regex différante de 0 (regex à -1 et le champ n'est pas vide donc il y a une erreur)
    } else if (valeurEcoute !== "" && regSearch != 0) {
      inputAction.style.backgroundColor = "rgb(220, 50, 50)";
      inputAction.style.color = "white";
      // pour le reste des cas (quand la regex ne décèle aucune erreur et est à 0 peu importe le champ vu qu'il est validé par la regex)
    } else {
      inputAction.style.backgroundColor = "rgb(0, 138, 0)";
      inputAction.style.color = "white";
    }
  }
  
  // fonction d'affichage individuel des paragraphes sous input sauf pour l'input email
  //--------------------------------------------------------------
  function texteInfo(regex, pointage, zoneEcoute) {
        if (page.match("cart")) {
        zoneEcoute.addEventListener("input", (e) => {
        // valeur sera la valeur de l'input en dynamique
        valeur = e.target.value;
        index = valeur.search(regex);
      // si valeur est toujours un string vide et la regex différante de 0 (regex à -1 et le champ est vide mais pas d'erreur)
        if (valeur === "" && index != 0) {
          document.querySelector(pointage).textContent = "Veuillez renseigner ce champ.";
          document.querySelector(pointage).style.color = "white";
          // si valeur n'est plus un string vide et la regex différante de 0 (regex à -1 et le champ n'est pas vide donc il y a une erreur)
        } else if (valeur !== "" && index != 0) {
          document.querySelector(pointage).innerHTML = "Reformulez cette donnée";
          document.querySelector(pointage).style.color = "white";
          // pour le reste des cas (quand la regex ne décèle aucune erreur et est à 0 peu importe le champ vu qu'il est validé par la regex)
        } else {
        document.querySelector(pointage).innerHTML = "Caratères acceptés pour ce champ.";
        document.querySelector(pointage).style.color = "white";
        }
      });
    }
  }
  
  // Fonction de validation/d'accés au clic du bouton du formulaire
  //--------------------------------------------------------------
  let commande = document.querySelector("#order");
  // la fonction sert à valider le clic de commande de manière interactive
  function valideClic() {
    let contactRef = JSON.parse(localStorage.getItem("contactClient"));
    let somme =
      contactRef.regexNormal + contactRef.regexAdresse + contactRef.regexEmail;
    if (somme === 5) {
      commande.removeAttribute("disabled", "disabled");
      document.querySelector("#order").setAttribute("value", "Commander !");
    } else {
      commande.setAttribute("disabled", "disabled");
      document.querySelector("#order").setAttribute("value", "Remplir le formulaire");
    }
  }
  
  // Envoi de la commande
  //----------------------------------------------------------------
  if (page.match("cart")) {
    commande.addEventListener("click", (e) => {
      // empeche de recharger la page on prévient le reload du bouton
      e.preventDefault();
      valideClic();
      envoiPaquet();
    });
  }
  
  // fonction récupérations des id puis mis dans un tableau
  //----------------------------------------------------------------
  // définition du panier quine comportera que les id des produits choisi du local storage
  let panierId = [];
  function tableauId() {
  // appel des ressources
  let panier = JSON.parse(localStorage.getItem("items"));
  // récupération des id produit dans panierId
  if (panier && panier.length > 0) {
    for (let indice of panier) {
      panierId.push(indice._id);
    }
  } else {
    console.log("le panier est vide");
    document.querySelector("#order").setAttribute("value", "Panier vide!");
  }
  }
  
  // fonction récupération des donnée client et panier avant transformation
  //----------------------------------------------------------------
  let contactRef;
  let commandeFinale;
  function paquet() {
    contactRef = JSON.parse(localStorage.getItem("contactClient"));
    // définition de l'objet commande
    commandeFinale = {
      contact: {
        firstName: contactRef.firstName,
        lastName: contactRef.lastName,
        address: contactRef.address,
        city: contactRef.city,
        email: contactRef.email,
      },
      products: panierId,
    };
  }
  
  // fonction sur la validation de l'envoi
  //----------------------------------------------------------------
  function envoiPaquet() {
    tableauId();
    paquet();
    // vision sur le paquet que l'on veut envoyer
    console.log(commandeFinale);
    let somme = contactRef.regexNormal + contactRef.regexAdresse + contactRef.regexEmail;
    // si le panierId contient des articles et que le clic est autorisé
    if (panierId.length != 0 && somme === 5) {
      // envoi à la ressource api
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commandeFinale),
      })
        .then((res) => res.json())
        .then((data) => {
          // envoyé à la page confirmation
          window.location.href = `/front/html/confirmation.html?commande=${data.orderId}`;
        })
        .catch(function (err) {
          console.log(err);
          alert("erreur");
        });
    }
  }
