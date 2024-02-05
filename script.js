let reviews = localStorage.getItem('reviews') ? JSON.parse(localStorage.getItem('reviews')) : {};
const productNameInput = document.getElementById('product-name');
const reviewTextInput = document.getElementById('review-text');
const addReviewBtn = document.getElementById('add-review-btn');
const productList = document.getElementById('product-list');
const reviewsList = document.getElementById('reviews-list');

const saveReviewsToLocalStorage = () => {
  localStorage.setItem('reviews', JSON.stringify(reviews));
};


const updateProductList = () => {
  productList.innerHTML = '';

  for (let product in reviews) {
    const listItem = document.createElement('li');
    listItem.textContent = product;
    listItem.addEventListener('click', () => showReviewsByProduct(product));
    productList.appendChild(listItem);
  }
};

const showReviewsByProduct = (product) => {
  reviewsList.innerHTML = '';

  for (let i = 0; i < reviews[product].length; i++) {
    const reviewItem = document.createElement('li');
    reviewItem.className = 'review';
    reviewItem.textContent = reviews[product][i];
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Удалить';
    deleteBtn.addEventListener('click', () => deleteReview(product, i));
    reviewItem.appendChild(deleteBtn);
    reviewsList.appendChild(reviewItem);
  }
};
const addReview = () => {
  const product = productNameInput.value.trim();
  const review = reviewTextInput.value.trim();

  if (product !== '' && review !== '') {
    if (reviews[product] === undefined) {
      reviews[product] = [];
    }
    reviews[product].push(review);
    saveReviewsToLocalStorage();
    updateProductList();
    showReviewsByProduct(product);
    productNameInput.value = '';
    reviewTextInput.value = '';
  }
};

const deleteReview = (product, index) => {
  reviews[product].splice(index, 1);
  saveReviewsToLocalStorage();
  showReviewsByProduct(product);
};

addReviewBtn.addEventListener('click', addReview);

updateProductList();