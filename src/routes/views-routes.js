import { Router } from "express";
import * as cartService from "../services/cart-services.js";
import * as productService from "../services/product-services.js";
import { __dirname } from "../utils/path.js";

const router = Router();

const generateLink = (url, page, limit, title, sort) => {
    let link = `${url}?page=${page}`;
    if (limit) link += `&limit=${limit}`;
    if (title) link += `&title=${title}`;
    if (sort) link += `&sort=${sort}`;
    return link;
};

router.get("/", async (req, res, next) => {
    try {
        const { page = 1, limit = 10, title, sort } = req.query;
        const response = await productService.getAllProducts(page, limit, title, sort);
        const products = response.docs || [];
        const url = 'http://localhost:8080/';
        const nextLink = response.hasNextPage ? generateLink(url, response.nextPage, limit, title, sort) : null;
        const prevLink = response.hasPrevPage ? generateLink(url, response.prevPage, limit, title, sort) : null;

        res.render("home", {
            products,
            page: response.page,
            hasNextPage: response.hasNextPage,
            hasPrevPage: response.hasPrevPage,
            nextLink,
            prevLink
        });
    } catch (error) {
        console.log("Error al renderizar", error);
        next(error.message);
    }
});

router.get("/product/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params;
        const product = await productService.getProductById(pid);
        if (!product) {
            return res.status(404).render("error", { message: "Producto no encontrado" });
        }
        res.render("product", { product });
    } catch (error) {
        console.log("Error al obtener el producto", error);
        next(error.message);
    }
});

router.post("/carts/:cid/product/:pid", async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const product = await cartService.addProductToCart(cid, pid); 
        res.render("product", { product });
    } catch (error) {
        console.log("Error al agregar el producto", error);
        next(error.message);
    }
});

router.get("/carts/:cid", async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await cartService.getCartById(cid);
        if (!cart) {
            return res.status(404).render("error", { message: "Carrito no encontrado" });
        }
        res.render("cart", { cart });
    } catch (error) {
        console.log("Error al obtener el carrito", error);
        next(error.message);
    }
});

router.get("/old", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productService.getProducts(limit); 
        res.render("home", { products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/admin", async (req, res) => {
    res.render("admin");
});



export default router;
