import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { __dirname } from '../path.js';
import ProductsManager from './products.manager.js';

const productsManager = new ProductsManager(`${__dirname}/db/products.json`);

class CartsManager {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const cartsFile = await fs.promises.readFile(this.path, 'utf-8');
                const carts = JSON.parse(cartsFile);
                return carts; 
            }
            return [];
        } catch (error) {
            console.error("Error en getCarts:", error);
        }
    }

    async addNewCart() {
        try {
            const newCart = {
                id: uuid(), 
                products: [],
            };
            const carts = await this.getCarts(); 
            carts.push(newCart); 
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
            return newCart; 
        } catch (error) {
            console.error("Error al agregar nuevo carrito:", error);
        }
    }

    async getCartById(id) {
        try {
            const carts = await this.getCarts(); 
            const cart = carts.find(cart => cart.id === id); 
            return cart || null; 
        } catch (error) {
            console.error("Error al obtener carrito por ID:", error);
        }
    }

    async addProductToCart(cartId, productId) {
        try {
            const product = await productsManager.getProductById(productId); 
            if (!product) {
                throw new Error("Producto no encontrado");
            }

            let carts = await this.getCarts(); 
            const cart = carts.find((cart) => cart.id === cartId); 
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }

            const productInCart = cart.products.find((prod) => prod.id === productId); 
            if (!productInCart) {
                const prodToAdd = {
                    id: productId,
                    quantity: 1, 
                };
                cart.products.push(prodToAdd); 
            } else {
                productInCart.quantity++; 
            }

            const cartsUpdated = carts.map((c) => c.id === cartId ? cart : c); 
            await fs.promises.writeFile(this.path, JSON.stringify(cartsUpdated, null, '\t')); 
            return cart; 
        } catch (error) {
            console.error("Error al agregar producto al carrito:", error);
            throw error; 
        }
    }
}

export default CartsManager;
