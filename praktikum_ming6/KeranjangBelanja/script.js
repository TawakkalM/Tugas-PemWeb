// Menangkap elemen HTML yang diperlukan
const productArea = document.querySelector(".products-area");
const listCartHTML = document.querySelector(".listCart");
const btnClear = document.querySelector(".clearCart");
const btnCheckOut = document.querySelector(".checkOut");
const subtotalHTML = document.querySelector(".subtotal");
const discountHTML = document.querySelector(".discount");
const totalHTML = document.querySelector(".total");

// Inisialisasi array keranjang kosong
let carts = [];

// Daftar produk dengan id, nama, gambar, dan harga
const products = [
  { id: 1, name: "Uchiha Madara", image: "1.jpg", price: 400000 },
  { id: 2, name: "Ryomen Sukuna", image: "2.jpg", price: 500000 },
  { id: 3, name: "Light Yagami", image: "3.jpg", price: 550000 },
  { id: 4, name: "Sosuke Aizen", image: "4.jpg", price: 600000 },
];

// Fungsi untuk menampilkan produk di halaman
const addDataToHTML = () => {
  products.forEach((product) => {
    const newProduct = document.createElement("div");
    newProduct.classList.add("product");
    newProduct.dataset.id = product.id;

    // Isi konten HTML untuk setiap produk
    newProduct.innerHTML = `
      <div class="product-cover">
          <img src="./img/${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
          <h4>${product.name}</h4>
          <h4>Rp ${product.price.toLocaleString()}</h4>
          <button class="add-cart">Add to Cart</button>
      </div>
    `;
    productArea.appendChild(newProduct);
  });
};

// Event listener untuk menangkap klik tombol 'add to cart' pada produk
productArea.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("add-cart")) {
    const productId = target.closest(".product").dataset.id;
    addToCart(productId);
  }
});

// Fungsi untuk menambahkan produk ke keranjang berdasarkan id
const addToCart = (productId) => {
  const cartIndex = carts.findIndex((cart) => cart.product_id == productId);

  if (cartIndex < 0) {
    // Tambahkan produk baru ke keranjang jika belum ada
    carts.push({ product_id: productId, quantity: 1 });
  } else {
    // Tambahkan kuantitas jika produk sudah ada di keranjang
    carts[cartIndex].quantity++;
  }
  updateCartDisplay();
};

// Fungsi untuk menampilkan item keranjang di HTML
const updateCartDisplay = () => {
  listCartHTML.innerHTML = ""; // Kosongkan tampilan keranjang

  // Tampilkan setiap item di keranjang
  carts.forEach((cart) => {
    const product = products.find((prod) => prod.id == cart.product_id);

    const cartItem = document.createElement("div");
    cartItem.classList.add("item");
    cartItem.dataset.id = cart.product_id;
    cartItem.innerHTML = `
      <div class="name">${product.name}</div>
      <div class="price">Rp ${(
        product.price * cart.quantity
      ).toLocaleString()}</div>
      <div class="quantity">
          <span class="minus">-</span>
          <span>${cart.quantity}</span>
          <span class="plus">+</span>
      </div>
    `;
    listCartHTML.appendChild(cartItem);
  });

  // Hitung ulang harga total
  calculatePrice();
};

// Event listener untuk mengatur jumlah barang di keranjang
listCartHTML.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("minus") || target.classList.contains("plus")) {
    const productId = target.closest(".item").dataset.id;
    const actionType = target.classList.contains("plus") ? "plus" : "minus";
    adjustCartQuantity(productId, actionType);
  }
});

// Fungsi untuk mengatur jumlah produk di keranjang berdasarkan tipe tindakan
const adjustCartQuantity = (productId, actionType) => {
  const cartIndex = carts.findIndex((cart) => cart.product_id == productId);

  if (cartIndex >= 0) {
    const cartItem = carts[cartIndex];
    if (actionType === "plus") {
      cartItem.quantity++;
    } else {
      // Jika jumlah lebih dari 1, kurangi, jika tidak hapus item dari keranjang
      cartItem.quantity > 1 ? cartItem.quantity-- : carts.splice(cartIndex, 1);
    }
  }
  updateCartDisplay();
};

// Event listener untuk mengosongkan seluruh isi keranjang
btnClear.addEventListener("click", () => clearCart());

// Fungsi untuk mengosongkan keranjang dan memperbarui tampilan
const clearCart = () => {
  carts = []; // Kosongkan array keranjang
  updateCartDisplay(); // Perbarui tampilan keranjang di HTML
  calculatePrice(); // Hitung ulang harga
};

// Event Listener untuk Check Out
btnCheckOut.addEventListener("click", () => {
  alert("Check Out Berhasil");
  clearCart();
});

// Fungsi untuk menghitung subtotal, diskon, dan total harga
const calculatePrice = () => {
  let subtotal = 0;
  let totalQuantity = 0;

  // Hitung subtotal dan total kuantitas
  carts.forEach((cart) => {
    const product = products.find((prod) => prod.id == cart.product_id);
    subtotal += product.price * cart.quantity;
    totalQuantity += cart.quantity;
  });

  // Tentukan diskon berdasarkan subtotal dan aturan jumlah
  let discount = 0;
  if (subtotal > 2000000) discount = subtotal * 0.15;
  else if (subtotal > 1000000) discount = subtotal * 0.1;
  if (totalQuantity > 5) discount += subtotal * 0.05;

  // Hitung total setelah diskon
  const total = subtotal - discount;

  // Perbarui tampilan subtotal, diskon, dan total di HTML
  subtotalHTML.innerHTML = `Subtotal: Rp ${subtotal.toLocaleString()}`;
  discountHTML.innerHTML = `Diskon: Rp ${discount.toLocaleString()}`;
  totalHTML.innerHTML = `Total: Rp ${total.toLocaleString()}`;
};

// Inisialisasi aplikasi dengan menampilkan produk
const initApp = () => {
  addDataToHTML();
};

initApp();
