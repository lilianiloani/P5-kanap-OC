
//RÉCUPÉRATION DES PRODUITS DE L'API
//-------------------------------------

const getAllProducts=async function(){
    //recupération de liste des produits de l'api
    let  resp= await  fetch("http://localhost:3000/api/products");
    if(resp.ok){
        const  products= await resp.json();
        // parcours de liste des produits récupérée  et construction du DOM
        products.forEach(element => {
            const a = document.createElement("a");
            document.getElementById("items").appendChild(a);
            
            //construction du lien vers un produit
            a.href=`./product.html?id=${element._id}`;
            const article = document.createElement("article");
            a.appendChild(article);
    
            const img=document.createElement("img");
            article.appendChild(img);
            img.src=element.imageUrl;
            img.alt=element.altTxt;
     
            const h3=document.createElement("h3");
            article.appendChild(h3);
            h3.className="productName";
            h3.append (element.name);
    
            const p=document.createElement("p");
            article.appendChild(p);
            p.className="productDescription";
            p.append (element.description);    
        })
    }else {
        //gestion d'erreur
        console.error("erreur");
    }
}
getAllProducts();
    
    