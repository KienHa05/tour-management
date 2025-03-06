// Vẽ ra danh sách tour
const drawListTour = () => {
    fetch("http://localhost:3000/cart/list-json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: localStorage.getItem("cart"),
    })
        .then(res => res.json())
        .then(data => {
            const htmlsArray = data.tours.map((item, index) => {
                return `
                <tr>
                    <td>${index + 1}</td>
                    <td>
                        <img src="${item.image}" alt="${item.info.title}" width="80px">
                    </td>
                    <td>
                        <a href="/tours/detail/${item.info.slug}">${item.info.title}</a>
                    </td>
                    <td>${item.price_special.toLocaleString()}</td>
                    <td>
                        <input 
                          type="number" 
                          name="quantity" 
                          value="${item.quantity}" 
                          min="1" 
                          item-id="${item.tourId}" 
                          style="width: 60px;"
                        />
                    </td>
                    <td>${item.total.toLocaleString()}đ</td>
                    <td>
                        <button class="btn btn-sm btn-danger" btn-delete="${item.tourId}">Xóa</button>
                    </td>
                </tr>
                `;
            });

            const listTour = document.querySelector("[list-tour]");
            listTour.innerHTML = htmlsArray.join("");

            // Tính tổng đơn hàng
            const totalPrice = data.tours.reduce((sum, item) => sum + item.total, 0);
            const elementTotalPrice = document.querySelector("[total-price]");
            elementTotalPrice.innerHTML = totalPrice.toLocaleString();

            deleteItemInCart();

            updateQuantityInCart();
        })
}
// End Vẽ ra danh sách tour

// Xóa sản phẩm trong giỏ hàng
const deleteItemInCart = () => {
    const listBtnDelete = document.querySelectorAll("[btn-delete]");
    listBtnDelete.forEach(button => {
        button.addEventListener("click", () => {
            const tourId = button.getAttribute("btn-delete");

            const cart = JSON.parse(localStorage.getItem("cart"));

            const newCart = cart.filter(item => item.tourId != tourId);

            localStorage.setItem("cart", JSON.stringify(newCart));

            drawListTour();
        });
    });
}
// End Xóa sản phẩm trong giỏ hàng

// Xóa sản phẩm trong giỏ hàng
const updateQuantityInCart = () => {
    const listInputUpdate = document.querySelectorAll("[list-tour] input[item-id]");
    listInputUpdate.forEach(input => {
        input.addEventListener("change", () => {
            const tourId = input.getAttribute("item-id");
            const quantity = input.value;

            const cart = JSON.parse(localStorage.getItem("cart"));

            const tourUpdate = cart.find(item => item.tourId == tourId);
            tourUpdate.quantity = quantity;

            localStorage.setItem("cart", JSON.stringify(cart));

            drawListTour();
        });
    });
}
// End Xóa sản phẩm trong giỏ hàng

// Lấy ra data và in ra giao diện
drawListTour();
// End Lấy ra data và in ra giao diện
