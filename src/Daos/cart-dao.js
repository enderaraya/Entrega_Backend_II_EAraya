import { CartModel } from "./models/cart-model.js";

export default class CartDao {
    // Crear un nuevo carrito vacío
    async createCart() {
        try {
            return await CartModel.create({
                products: [],
            });
        } catch (error) {
            console.log(error);
        }
    }

    // Obtener todos los carritos
    async getAllCarts() {
        try {
            return await CartModel.find({});
        } catch (error) {
            console.log(error);
        }
    }

    // Obtener un carrito por ID con población de productos
    async getCartById(id) {
        try {
            return await CartModel.findById(id).populate("products.product");
        } catch (error) {
            console.log(error);
        }
    }

    // Actualizar un carrito por ID
    async updateCart(id, obj) {
        try {
            const response = await CartModel.findByIdAndUpdate(id, obj, {
                new: true,
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // Eliminar un carrito por ID
    async deleteCart(id) {
        try {
            return await CartModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }

    // Verificar si un producto está en el carrito
    async isInCart(cartId, productId) {
        try {
            return await CartModel.findOne({
                _id: cartId,
                products: { $elemMatch: { product: productId } }
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    // Agregar un producto al carrito o incrementar la cantidad si ya está
    async addProductToCart(cartId, productId) {
        try {
            const prodInCart = await this.isInCart(cartId, productId);
            if (prodInCart) {
                return await CartModel.findOneAndUpdate(
                    { _id: cartId, 'products.product': productId },
                    { $set: { 'products.$.quantity': prodInCart.products[0].quantity + 1 } },
                    { new: true }
                );
            } else {
                return await CartModel.findByIdAndUpdate(
                    cartId,
                    { $push: { products: { product: productId } } },
                    { new: true }
                )
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Eliminar un producto del carrito
    async removefromCart(cartId, productId) {
        try {
            return await CartModel.findByIdAndUpdate(
                { _id: cartId },
                { $pull: { products: { product: productId } } },
                { new: true }
            )
        } catch (error) {
            console.log(error);
        }
    }

    // Actualizar la cantidad de un producto en el carrito
    async updateProdQuantity(cartId, productId, quantity) {
        try {
            return await CartModel.findOneAndUpdate(
                { _id: cartId, 'products.product': productId },
                { $set: { 'products.$.quantity': quantity } },
                { new: true }
            );
        } catch (error) {
            console.log(error);
        }
    }

    // Vaciar el carrito
    async clearCart(cartId) {
        try {
            return await CartModel.findOneAndUpdate(
                { _id: cartId },
                { $set: { products: [] } },
                { new: true }
            )
        } catch (error) {
            console.log(error);
        }
    }
}
