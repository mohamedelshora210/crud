


var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var productContainer ;
var Btn = document.getElementById("buttonProduct");
var currentIndex = "";
var div = document.getElementById("SearchResult");


if(localStorage.getItem("products")== null)
{
     productContainer = [];
}
else 
{
     productContainer = JSON.parse(localStorage.getItem("products"))
     displayProduct()
}
Btn.addEventListener("click" , function(){
     if(Btn.innerHTML == "Add Product")
{
     addProduct();
}
else
{
     saveData();
}
})



function addProduct()
{
     var product = 
     {
          name : productName.value,
          price : productPrice.value,
          category : productCategory.value ,
          desc : productDesc.value 
     }
     productContainer.push(product);
     localStorage.setItem("products" , JSON.stringify(productContainer));
     displayProduct()
     clearProduct()
}

function displayProduct()
{
     var cont = "";
    for( var i = 0 ; i < productContainer.length ; i ++)
    {
     cont +=
     `<tr>
     <td>`+(i+1)+`</td>
     <td>`+productContainer[i].name+`</td>
     <td>`+productContainer[i].price+`</td>
     <td>`+productContainer[i].category+`</td>
     <td>`+productContainer[i].desc+`</td>
     <td> <button onclick="updateProduct(`+i+`)" class="btn btn-warning p-2">UPdate Product</button> </td>
     <td> <button onclick="deleteProduct(`+i+`)" class="btn btn-danger p-2">Delete Product</button> </td>
     </tr>`
    }
    document.getElementById("tableBody").innerHTML = cont;
}
function clearProduct()
{
     productName.value = "";
     productPrice.value ="";
     productCategory.value ="";
     productDesc.value  ="";
}

function searchProduct(trem)
{
     var cont=``;
     var searchResult =``;
     var newTxt = ``;
     for( var i = 0 ; i < productContainer.length ; i++)
     {
          if(productContainer[i].name.includes(trem.trim()) == true)
          {
               cont +=
     `<tr>
     <td>`+(i+1)+`</td>
     <td>`+productContainer[i].name+`</td>
     <td>`+productContainer[i].price+`</td>
     <td>`+productContainer[i].category+`</td>
     <td>`+productContainer[i].desc+`</td>
     <td> <button onclick="updateProduct(`+i+`)" class="btn btn-warning p-2">UPdate Product</button> </td>
     <td> <button onclick="deleteProduct(`+i+`)" class="btn btn-danger p-2">Delete Product</button> </td>
     </tr>`

     newTxt = productContainer[i].name.replace( trem , `<span style="color : red">`+trem+`</span>`)

     searchResult += `<a href="#" style="color : navy ; text-decoration : none; display:block;">`+newTxt+`</a>`;

          }
          
        else if(productContainer[i].category.includes(trem.trim()) == true)
               {
                    cont +=
          `<tr>
          <td>`+(i+1)+`</td>
          <td>`+productContainer[i].name+`</td>
          <td>`+productContainer[i].price+`</td>
          <td>`+productContainer[i].category+`</td>
          <td>`+productContainer[i].desc+`</td>
          <td> <button onclick="updateProduct(`+i+`)" class="btn btn-warning p-2">UPdate Product</button> </td>
          <td> <button onclick="deleteProduct(`+i+`)" class="btn btn-danger p-2">Delete Product</button> </td>
          </tr>`
     
          newTxt = productContainer[i].category.replace( trem , `<span style="color : red">`+trem+`</span>`)
          searchResult += `<a href="#" style="color : navy ; text-decoration : none; display:block;">`+newTxt+`</a>`;
               }
               
               

     }
     document.getElementById("tableBody").innerHTML = cont;
     document.getElementById("SearchResult").innerHTML = searchResult;
}

function deleteProduct(index)
{
     productContainer.splice(index , 1);
     localStorage.setItem("products" , JSON.stringify(productContainer));
     displayProduct();
}
function updateProduct(index)
{
     currentIndex = index;
      productName.value = productContainer[index].name; 
      productPrice.value = productContainer[index].price; 
      productCategory.value = productContainer[index].category; 
      productDesc.value = productContainer[index].desc; 

Btn.innerHTML = "Update Product";
Btn.classList.remove("btn-success");
Btn.classList.add("btn-warning");

}

function saveData()
{
     var product = 
     {
          name : productName.value,
          price : productPrice.value,
          category : productCategory.value ,
          desc : productDesc.value 
     }
     productContainer[currentIndex] = product;

     localStorage.setItem("products" , JSON.stringify(productContainer));
     displayProduct()
     clearProduct()

     Btn.innerHTML = "Add Product";
     Btn.classList.remove("btn-warning");
     Btn.classList.add("btn-success");
    
}
