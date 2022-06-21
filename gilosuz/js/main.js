const elProductsList = document.querySelector(".list-unstyled");
const elProductTemp = document.querySelector("#product-temp").content;
const elFilterForm = document.querySelector('.filterForm')
const elFilterFrom = document.getElementById('from')
const elFilterTo = document.getElementById('to')
const manufacturerFilter = document.getElementById('manufacturer')
elProductsCount = document.querySelector(".count");
elProductsCount.textContent = "count: " + products.length;
const elSeachInput = document.querySelector('#search')
const newProductTitle = document.querySelector("#product-title");

const elAddProductForm = document.querySelector(".add-product-form");
const newProductPrice = document.querySelector("#price");
const newProductManufactList = document.querySelector("#product-manufacturer");
const newProductBenefits = document.querySelector("#benefits");
const addModal = document.querySelector(".modal-body");

const elEditProductForm = document.querySelector(".edit-product-form");
const elEditTitle = document.querySelector("#edit-title");
const elEditPrice = document.querySelector("#edit-price");
const elEditManufact = document.querySelector("#edit-product-manufacturer");
const elEditBenefits = document.querySelector("#edit-benefits");
const editModal = document.querySelector("#edit-student-modal");
const editBtn = elProductTemp.querySelector(".btn-secondary");
const sortBy = document.querySelector('#sortby')

function editFunc(e) {
  e.preventDefault();
}

const manufacturesRender = (manufacturesArr, optionList) => {
  manufacturesArr.forEach((element) => {
    const option = document.createElement("option");
    option.value = element.name;
    option.textContent = element.name;
    optionList.append(option);
  });
};

const getTime = (time) => {
  const date = new Date(time);
  let releaseDate = "";
  releaseDate += `${date.getDate()}`;
  releaseDate += `/${date.getMonth() + 1}`;
  releaseDate += `/${date.getFullYear()}`;
  return releaseDate;
};

function renderProducts(array, place) {
  place.innerHTML = null;
  elProductsCount.textContent = "count: " + products.length;
  array.forEach((product) => {
    const productTemplate = elProductTemp.cloneNode(true);
    const productIMG = productTemplate.querySelector(".card-img-top");
    productIMG.src = product.img;
    const productTitle = productTemplate.querySelector(".card-title");
    productTemplate.querySelector(".col-4").setAttribute("data-id", product.id);
    productTitle.textContent = product.title;
    const productPrice = productTemplate.querySelector(".card-text");
    productPrice.textContent = product.price;
    const productModel = productTemplate.querySelector(".badge");
    productModel.textContent = product.model;
    const productDate = productTemplate.querySelector(".date");
    productDate.textContent = getTime(product.addedDate);
    const productBenifits = productTemplate.querySelector(".benifits-list");
    

    place.append(productTemplate);
  });
}

function addProduct(event) {
  event.preventDefault();
  let product = {};
  product.title = newProductTitle.value;
  product.price = newProductPrice.value;
  product.model = newProductManufactList.value;
  product.benefits = newProductBenefits.value.split(",");
  product.img = "https://picsum.photos/300/200";
  product.addedDate = new Date().toISOString();
  product.id = 123 + products.length;

  products.push(product);
  renderProducts(products, elProductsList);
  elAddProductForm.reset();
}

function onListClick(event) {
    console.log("sad");
  if (event.target.matches(".product-delete")) {
    const currentLi = event.target.closest(".col-4").dataset.id;
    const currentProduct = products.findIndex(
      (product) => product.id === +currentLi
    );
    products.splice(currentProduct, 1);
    renderProducts(products, elProductsList);
  } else if (event.target.matches(".product-edit")) {
    console.log("hjasgfuh");
    const currentLi = event.target.closest(".col-4").dataset.id;
    let currentProduct = products.find((product) => product.id === +currentLi);
    const currentProductIndex = products.findIndex(
      (product) => product.id === +currentLi
    );
    elEditTitle.value = currentProduct.title;
    elEditPrice.value = currentProduct.price;
   // elEditBenefits.value=  currentProduct.benefits;
    const selection = document.querySelector('#edit-product-benefits')
    currentProduct.benefits.forEach((type) => {
        let newOption = document.createElement("option");
        newOption.value = type
        newOption.textContent = type
        selection.append(newOption);
      });

    console.log(currentLi);

    elEditProductForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const product = {
          id: currentProduct.id,
          title: elEditTitle.value,
          img: currentProduct.img,
          model: currentProduct.model,
          price: elEditPrice.value,
          addedDate: new Date(),
          benefits: elEditBenefits
        };
        products.splice(currentProductIndex, 1, product);
    
        renderProducts(products, elProductsList);
      });

  }
}



if (elProductsList) {
  elProductsList.addEventListener("click", onListClick);
}

elSeachInput.addEventListener("input", (e) => {
const elSearchValue = new RegExp(e.target.value, "gi");

const filterProducts = products.filter((product) =>
product.title.match(elSearchValue)
);
renderProducts(filterProducts, elProductsList);
});

elFilterForm.addEventListener('submit', (e) => {
  e.preventDefault() 
  const filteredProducts = products.filter((product) => elFilterTo.value >= product.price).filter((product) => elFilterFrom.value <= product.price)


  renderProducts(filteredProducts, elProductsList)
})
elFilterForm.addEventListener('submit', (e) =>{
  e.preventDefault() 
  const filterModels = products.filter((product) => manufacturerFilter.value === product.model)

  renderProducts(filterModels, elProductsList)
} )


manufacturesRender(manufacturers, manufacturerFilter)

const sortProducts = (e) => {
  e.preventDefault();

  if (sortBy.value === "2" ) {
    products.sort((a, b) => a.price - b.price);
    renderProducts(products, elProductsList);
  } else if (sortBy.value === "3" ) {
    products.sort((a, b) => b.price - a.price);
    renderProducts(products, elProductsList);
  }
};

elFilterForm.addEventListener("submit", sortProducts);

renderProducts(products, elProductsList);
manufacturesRender(manufacturers, newProductManufactList);
elAddProductForm.addEventListener("submit", addProduct);
