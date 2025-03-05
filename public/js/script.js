// Slider Tour Detail
var imagesThumb = new Swiper(".imagesThumb", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
});
var imagesMain = new Swiper(".imagesMain", {
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: imagesThumb,
    },
});
// End Slider Tour Detail

// Carts

// Kiểm tra xem localStorage có tồn tại cart chưa , nếu chưa thì phải tạo cart mới
const cart = localStorage.getItem("cart");
if (!cart) {
    localStorage.setItem("cart", JSON.stringify([]));
}

// Thêm tour vào cart
const formAddToCart = document.querySelector("[form-add-to-cart]");
if (formAddToCart) {
    formAddToCart.addEventListener("submit", (event) => {
        event.preventDefault();

        const quantity = parseInt(event.target.elements.quantity.value);
        const tourId = parseInt(formAddToCart.getAttribute("tour-id"));

        if (quantity > 0 && tourId) {
            const cart = JSON.parse(localStorage.getItem("cart"));

            const isExistTour = cart.findIndex(item => item.tourId == tourId);

            if (isExistTour == -1) {
                cart.push({
                    tourId: tourId,
                    quantity: quantity
                });
            } else {
                cart[isExistTour].quantity = cart[isExistTour].quantity + quantity;
            }

            localStorage.setItem("cart", JSON.stringify(cart));
        }
    });
}

// End Carts