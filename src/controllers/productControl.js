import * as productService from "../services/product-services.js";

const generateLinks = (url, page, limit, title, sort) => {
    let link = `${url}?page=${page}`;
    if (limit) link += `&limit=${limit}`;
    if (title) link += `&title=${title}`;
    if (sort) link += `&sort=${sort}`;
    return link;
};

export const getAllProducts = async (req, res, next) => {
    try {
        const { page, limit, title, sort } = req.query;
        const response = await productService.getAllProducts(page, limit, title, sort);

        const url = 'http://localhost:8080/api/products';

        const nextLink = response.hasNextPage ? generateLinks(url, response.nextPage, limit, title, sort) : null;
        const prevLink = response.hasPrevPage ? generateLinks(url, response.prevPage, limit, title, sort) : null;

        res.status(200).json({
            status: 'success',
            payload: response.docs,
            totalPages: response.totalDocs,
            prevPage: response.prevPage,
            nextPage: response.nextPage,
            page,
            hasNextPage: response.hasNextPage,
            hasPrevPage: response.hasPrevPage,
            prevLink,
            nextLink
        });
    } catch (error) {
        next(error.message);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const response = await productService.getProductById(pid);

        if (!response) {
            res.status(404).json({ msg: `El producto ${pid} no existe o no pudo ser encontrado` });
        } else {
            res.status(200).json(response);
        }
    } catch (error) {
        next(error.message);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        const newProduct = await productService.createProduct(req.body);

        if (!newProduct) {
            res.status(404).json({ msg: "No se pudo crear el producto" });
        } else {
            res.status(200).json(newProduct);
        }
    } catch (error) {
        next(error.message);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const productUpdate = await productService.updateProduct(pid, req.body);

        if (!productUpdate) {
            res.status(404).json({ msg: "No se pudo actualizar el producto" });
        } else {
            res.status(200).json(productUpdate);
        }
    } catch (error) {
        next(error.message);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const productToDelete = await productService.deleteProduct(pid);

        if (!productToDelete) {
            res.status(404).json({ msg: "No se pudo borrar el producto" });
        } else {
            res.status(200).json({ msg: `El producto con la ID (${pid}) fue borrado exitosamente` });
        }
    } catch (error) {
        next(error.message);
    }
};

function generateDummyLinks(url, page, limit, title, sort) {
    let link = `${url}?page=${page}`;
    if (limit) link += `&limit=${limit}`;
    if (title) link += `&title=${title}`;
    if (sort) link += `&sort=${sort}`;
    return link;
}
