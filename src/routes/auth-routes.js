import { Router } from "express";
import passport from "passport";
import * as service from '../services/cart-services.js';
import { userModel } from "../Daos/models/user-model.js";
import { createHash } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import { resUserDto } from "../dtos/user-dto.js";
import { roleValidation } from "../middlewares/validateRole.js";
import MailService from "../services/mailing-services.js";

const mailService = new MailService();
const router = Router();


// Rutas de autenticación
router.post("/login-error", (req, res) => {
    res.status(401).json({ error: "Credenciales incorrectas" });
});

router.get("/login-error", (req, res) => {
    res.status(401).json({ error: "Credenciales incorrectas" });
});

router.get("/current", passport.authenticate("jwt", { session: false }), roleValidation(['admin', 'user']), (req, res) => {
    res.status(200).json({ message: "bienvenido", user: resUserDto(req.user) });
});

router.post("/login", passport.authenticate("login", { session: false, failureRedirect: "/api/auth/login-error" }), roleValidation(["user", "admin"]), async (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const payload = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        cart: user.cart
    };

    const token = generateToken(payload);

    res.cookie("access-token", token, { maxAge: 900000, httpOnly: true });

    res.status(200).json({ message: "Sesion Iniciada", token: token });
});

router.post("/register", async (req, res) => {
    const { first_name, last_name, age, email, role, password } = req.body;

    if (!first_name || !last_name || !email || !password || !age) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        const hashPassword = await createHash(password);

        const userCart = await service.createCart();

        const user = await userModel.create({
            first_name,
            last_name,
            age,
            email,
            password: hashPassword,
            role,
            cart: userCart._id,
        });

        await mailService.sendMail({
            to: email,
            subject: "Bienvenido",
            type: "welcome",
            name: first_name,
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/logout", (req, res) => {
    res.clearCookie("access-token");
    res.status(200).json({ message: "Sesion Finalizada" });
});



export default router;
