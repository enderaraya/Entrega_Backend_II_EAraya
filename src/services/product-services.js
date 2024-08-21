import ProductDao from "../Daos/product-dao.js";

const productDao = new ProductDao();

// Función para obtener todos los productos
export const getAllProducts = async (page, limit, title, sort) => {
    try {
        console.log("Parámetros para obtener productos:", { page, limit, title, sort });
        return await productDao.getAllProducts(page, limit, title, sort);
    } catch (error) {
        console.log("Error en getAllProducts:", error);
    }
};

// Función para obtener un producto por ID
export const getProductById = async (id) => {
    try {
        const foundProduct = await productDao.getProductById(id);
        if (!foundProduct) {
            console.log("Producto no encontrado para ID:", id);
            return false;
        } else {
            return foundProduct;
        }
    } catch (error) {
        console.log("Error en getProductById:", error);
    }
};

// Función para crear un nuevo producto
export const createProduct = async (obj) => {
    try {
        const newProduct = await productDao.createProduct(obj);
        console.log("Nuevo producto creado:", newProduct);
        if (!newProduct) {
            console.log("Error al crear el producto.");
            return false;
        } else {
            return newProduct;
        }
    } catch (error) {
        console.log("Error en createProduct:", error);
    }
};

// Función para actualizar un producto
export const updateProduct = async (id, obj) => {
    try {
        const productUpdate = await productDao.updateProduct(id, obj);
        if (!productUpdate) {
            console.log("Error al actualizar el producto para ID:", id);
            return false;
        } else {
            return productUpdate;
        }
    } catch (error) {
        console.log("Error en updateProduct:", error);
    }
};

// Función para eliminar un producto
export const deleteProduct = async (id) => {
    try {
        const productToDelete = await productDao.deleteProduct(id);
        if (!productToDelete) {
            console.log("Error al eliminar el producto para ID:", id);
            return false;
        } else {
            console.log("Producto eliminado con éxito para ID:", id);
            return productToDelete;
        }
    } catch (error) {
        console.log("Error en deleteProduct:", error);
    }
};


