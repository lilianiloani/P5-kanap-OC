
//RECUPERATION DU LIEN HYPERTEXTE DU PRODUIT
//------------------------------------------
const url = new URL(window.location.href);

const id = url.searchParams.get("id");

//RÉCUPÉRATION D'UN PRODUIT À PARTIR DE SON ID ET CONSTRUCTION DU DOM(utilisation d'une fonction asynchrone)
// ---------------------------------------------------------------------------------------------------------
const getProduct = async function() {
    let  resp = await  fetch(`http://localhost:3000/api/products/${id}`);
    //test de la requête
    if(resp.ok){ 
        const product = await resp.json();

        // construction du  DOM image 
        const img = document.createElement('img');
        document.querySelector(".item__img").appendChild(img);
        img.src = product.imageUrl;
        img.alt = product.altTxt;

        const canapeName=document.getElementById("title");
        canapeName.append(product.name);

        const canapePrix=document.getElementById("price")
        canapePrix.append(product.price);

        const canapeDescription =document.getElementById('description')
        canapeDescription.append(product.description);

        // gestion du DOM menu deroulant des couleurs
        const canapeColors = document.getElementById('colors');
        product.colors.forEach(color => {
        const colorOption=document.createElement("option");
        colorOption.value = color;
        canapeColors.appendChild(colorOption);
        colorOption.append(color);
        });

        const quantity=document.getElementById('quantity');
        
        // Ajout de l'evenement sur le bouton.
        //--------------------------------------
        const btn= document.getElementById('addToCart');
        btn.addEventListener('click', ()=>{
            let quantityValue = parseInt(quantity.value);
        
            //check du choix couleur vide 
                if(canapeColors.value==""){
                    console.log("choisir une couleur");
                    alert("choisir une couleur");
                    return false;
                } 
            //check quantité vide 
                if(quantityValue==0){
                    console.log("choisir nombre d'article");
                    alert("choisir nombre d'article(s)!");
                    return false;
                } 
            //construction de l'objet produit pour envoi au panier 
                let chosenProduct = {
                    id:id,
                    name:product.name,
                    image: product.imageUrl,
                    description:product.description,
                    colors:canapeColors.value,
                    quantity:quantityValue,
                    price: product.price,
                    altTxt:product.altTxt
                };
            //mise en place des données à stocker dans le localstorage 
            //-------------------------------------------------------
                //check du contenu du localstorage et attribution à oldItems
                let oldItems = JSON.parse(localStorage.getItem('items')) || [];

                // si le localstorage n'est pas vide
                let oldItem = oldItems.find(el => el.id == chosenProduct.id 
                && el.colors == chosenProduct.colors);
                if (oldItem) {
                // Incrémentation de la quantité si un produit identique existe dans le localstorage
                oldItem.quantity += quantityValue;
                } else {
                    oldItems.push(chosenProduct);
                }
                //mise à jour du localstorage
                localStorage.setItem('items', JSON.stringify(oldItems));

            //  changement du bouton "ajouter au panier" en "produit ajouté"
                addedToCartBtnColor()
            
                canapeColors.addEventListener("change", ()=>{
                    resetBtnColor();
                });
                quantity.addEventListener("change", ()=>{
                    resetBtnColor();
    
                });
                
            //fonction de changement du bouton à l'ajout d'un produit dans le panier
            function addedToCartBtnColor(){
                btn.innerText="produit ajouté";
                btn.style.backgroundColor="green";
            }
            //fonction de réinitialisation des couleurs
            function resetBtnColor(){
                btn.style.color = "white";
                btn.textContent = "Ajouter au panier";
                btn.style.backgroundColor="#2c3e50";
            }
            
        });   
    }
    else {
        console.error("erreur");
    } 
}
getProduct() 