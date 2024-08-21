import { Router } from "express";
import passport from "passport";
import * as productController from "../controllers/productControl.js";
import { productValidation } from "../middlewares/validateProduct.js";
import { idValidation } from "../middlewares/validateId.js";
import { roleValidation } from "../middlewares/validateRole.js";

const productRouter = Router();



productRouter.post("/", productValidation, passport.authenticate("jwt", { session: false }), roleValidation(['admin']), productController.createProduct);

// Ruta para agregar productos de ejemplo
productRouter.post("/baseinicio", productController.createProduct); // un solo uso: para agregar los 45 productos de ejemplo

productRouter.get("/:pid", productController.getProductById);

productRouter.get("/", productController.getAllProducts);

productRouter.put("/:pid", idValidation, passport.authenticate("jwt", { session: false }), roleValidation(['admin']), productController.updateProduct);

productRouter.delete("/:pid", passport.authenticate("jwt", { session: false }), roleValidation(['admin']), productController.deleteProduct);



export default productRouter;
