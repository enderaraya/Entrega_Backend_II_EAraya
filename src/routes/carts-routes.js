import { Router } from "express";
import passport from "passport";
import * as cartController from "../controllers/cartControl.js";
import { roleValidation } from "../middlewares/validateRole.js";


const cartRouter = Router();




cartRouter.delete("/:cid", passport.authenticate("jwt", { session: false }), roleValidation(['admin', 'user']), cartController.clearCart);

cartRouter.post("/", passport.authenticate("jwt", { session: false }), roleValidation(['admin', 'user']), cartController.createCart);

cartRouter.get("/:cid", passport.authenticate("jwt", { session: false }), roleValidation(['admin', 'user']), cartController.getCartById);

cartRouter.put("/:cid/product/:pid", passport.authenticate("jwt", { session: false }), roleValidation(['admin', 'user']), cartController.updateProdQuantity);

cartRouter.delete("/:cid/erase", passport.authenticate("jwt", { session: false }), roleValidation(['admin']), cartController.deleteCart);

cartRouter.get("/", passport.authenticate("jwt", { session: false }), roleValidation(['admin']), cartController.getAllCarts);


cartRouter.post("/:cid/product/:pid", passport.authenticate("jwt", { session: false }), roleValidation(['admin', 'user']), cartController.addProductToCart);

cartRouter.delete("/:cid/product/:pid", passport.authenticate("jwt", { session: false }), roleValidation(['admin', 'user']), cartController.removefromCart);

cartRouter.get('/:cid/purchase', passport.authenticate("jwt", { session: false }), roleValidation(['admin', 'user']), cartController.purchase);


export default cartRouter;
