

const url = new URL(window.location.href);
const id = url.searchParams.get("id");
const getProduct = async function() {
    let  resp = await  fetch(`http://localhost:3000/api/products/${id}`);
    if(resp.ok){ 
        const product = await resp.json();

        //fonction d'affichage du produit de l'api

        // Insert image product
        const img = document.createElement('img');
        document.querySelector(".item__img").appendChild(img);
        img.src = product.imageUrl;
        img.alt = product.altTxt;

        //insert product name
        const canapeName=document.getElementById("title");
        canapeName.append(product.name);

        // Insert product price 
        const canapePrix=document.getElementById("price")
        canapePrix.append(product.price);

        // Insert product description
        const canapeDescription =document.getElementById('description')
        canapeDescription.append(product.description);

        // Insert product color in option
        const canapeColors = document.getElementById('colors');
        product.colors.forEach(color => {
        const colorOption=document.createElement("option");
        colorOption.value = color;
        canapeColors.appendChild(colorOption);
        colorOption.append(color);
        });

        const quantity=document.getElementById('quantity');
        
    // Ajout de l'evenement sur le bouton.
        const btn= document.getElementById('addToCart');
        btn.addEventListener('click', ()=>{
        console.log("bonjour");

        let quantityValue = parseInt(quantity.value);
        console.log("quantity " +quantityValue);
           
    //if no color is selected 
             if(canapeColors.value==""){
                console.log("choisir une couleur");
                alert("choisir une couleur");
                return false;

            } 
    //if quantity is not selected
             if(quantityValue==0){
                console.log("choisir nombre d'article");
                alert("choisir nombre d'article(s)!");
                return false;

            } 
    //selected  Product informations //éléments ajoutés dynamiquement
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
            console.log(chosenProduct);
    
    //fonction local storage 

            let cart= [];

            //localStorage.clear();
            console.log(cart);
            let oldItems = JSON.parse(localStorage.getItem('items')) || [];

            // If item with same id and same color already exist
            let oldItem = oldItems.find(el => el.id == chosenProduct.id
                && el.colors == chosenProduct.colors);
            if (oldItem) {
                console.log(oldItem);

                // Increment quantity
                oldItem.quantity += quantityValue;
            } else {
                oldItems.push(chosenProduct);
                console.log(oldItem);
  
             }

            //cart.push(chosenProduct);
            console.log(oldItems);
            localStorage.setItem('items', JSON.stringify(oldItems));
            console.log("this is localStorage" +localStorage.getItem('items'));

        btn.innerText="produit ajouté";
        btn.style.backgroundColor="green";
        console.log(btn); 

        //reset

    
        });   

    }
    else {
        console.error("erreur");
    } 


    

}
getProduct() 
