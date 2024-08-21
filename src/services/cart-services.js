import ProductDao from "../Daos/product-dao.js";
import CartDao from "../Daos/cart-dao.js";

const productDao = new ProductDao();
const cartDao = new CartDao();

// Función para crear un nuevo carrito
export const createCart = async () => {
    try {
        const newCart = await cartDao.createCart();
        if (!newCart) {
            console.log("No se pudo crear el carrito");
            return false;
        } else {
            return newCart;
        }
    } catch (error) {
        console.log("Error en createCart:", error);
    }
};

// Función para obtener todos los carritos
export const getAllCarts = async () => {
    try {
        return await cartDao.getAllCarts();
    } catch (error) {
        console.log("Error en getAllCarts:", error);
    }
};

// Función para obtener un carrito por ID
export const getCartById = async (cartId) => {
    try {
        return await cartDao.getCartById(cartId);
    } catch (error) {
        console.log("Error en getCartById:", error);
    }
};

// Función para actualizar un carrito
export const updateCart = async (cartId, obj) => {
    try {
        const existCart = await cartDao.getCartById(cartId);
        if (!existCart) throw new Error("Carrito no encontrado");

        return await cartDao.updateCart(cartId, obj);
    } catch (error) {
        console.log("Error en updateCart:", error);
    }
};

// Función para eliminar un carrito
export const deleteCart = async (cartId) => {
    try {
        const cartToDelete = await cartDao.deleteCart(cartId);
        if (!cartToDelete) {
            console.log("No se pudo eliminar el carrito");
            return false;
        } else {
            return cartToDelete;
        }
    } catch (error) {
        console.log("Error en deleteCart:", error);
    }
};

// Función para añadir un producto a un carrito
export const addProductToCart = async (cartId, productId) => {
    try {
        const existCart = await cartDao.getCartById(cartId);
        if (!existCart) throw new Error("Carrito no encontrado");

        const existProd = await productDao.getProductById(productId);
        if (!existProd) throw new Error("Producto no encontrado");

        return await cartDao.addProductToCart(cartId, productId);
    } catch (error) {
        console.log("Error en addProductToCart:", error);
    }
};

// Función para eliminar un producto del carrito
export const removefromCart = async (cartId, productId) => {
    try {
        const existCart = await getCartById(cartId);
        if (!existCart) throw new Error("Carrito no encontrado");

        const existProdInCart = await cartDao.isInCart(cartId, productId);
        if (!existProdInCart) throw new Error("Producto no encontrado en el carrito");

        return await cartDao.removefromCart(cartId, productId);
    } catch (error) {
        console.log("Error en removefromCart:", error);
    }
};

// Función para actualizar la cantidad de un producto en el carrito
export const updateProdQuantity = async (cartId, productId, quantity) => {
    try {
        const existCart = await getCartById(cartId);
        if (!existCart) throw new Error("Carrito no encontrado");

        const existProdInCart = await cartDao.isInCart(cartId, productId);
        if (!existProdInCart) throw new Error("Producto no encontrado en el carrito");

        return await cartDao.updateProdQuantity(cartId, productId, quantity);
    } catch (error) {
        console.log("Error en updateProdQuantity:", error);
    }
};

// Función para vaciar un carrito
export const clearCart = async (cartId) => {
    try {
        const existCart = await getCartById(cartId);
        if (!existCart) throw new Error("Carrito no encontrado");

        return await cartDao.clearCart(cartId);
    } catch (error) {
        console.log("Error en clearCart:", error);
    }
};


