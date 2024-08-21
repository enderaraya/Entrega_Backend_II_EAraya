import fs from "fs";
import { v4 as uuid } from "uuid";

class ProductsManager {
    constructor(path) {
        this.path = path;
    }


    async getProducts(querylimit) {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf8");
                const parsedProducts = JSON.parse(products);
                return querylimit ? parsedProducts.slice(0, Math.max(0, querylimit)) : parsedProducts;
            }
            return [];  
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    }

    async addNewProduct(obj) {
        try {
            const newProduct = {
                id: uuid(),
                status: true,
                ...obj,
            };
            const products = await this.getProducts();
            products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
            console.log("Producto agregado con ID:", newProduct.id);
            return newProduct;
        } catch (error) {
            console.error("Error al agregar producto:", error);
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts();
            const productListed = products.find((product) => product.id === id);
            return productListed || null;
        } catch (error) {
            console.error("Error al obtener producto por ID:", error);
        }
    }

    async modifyProduct(id, obj) {
        try {
            const products = await this.getProducts();
            let productListed = products.find((product) => product.id === id);
            if (productListed) {
                productListed = { ...productListed, ...obj };
            } else {
                return null; 
            }
            const productsUpdated = products.filter((product) => product.id !== id);
            productsUpdated.push(productListed);
            await fs.promises.writeFile(this.path, JSON.stringify(productsUpdated, null, "\t"));
            return productListed;
        } catch (error) {
            console.error("Error al modificar producto:", error);
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts();
            const productListed = products.find((product) => product.id === id);
            if (!productListed) {
                return null; 
            }
            const productsUpdated = products.filter((product) => product.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(productsUpdated, null, "\t"));
            return productListed;
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    }
}

export default ProductsManager;
