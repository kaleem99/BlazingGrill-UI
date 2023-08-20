const addToCart = (item) => localStorage.setItem("CART", JSON.stringify(item));
export default addToCart;
