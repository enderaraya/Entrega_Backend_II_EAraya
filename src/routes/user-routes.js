import { Router } from "express";
import { userModel } from "../Daos/models/user-model.js";

const router = Router();

// Ruta para obtener todos los usuarios
router.get("/", async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener un usuario por ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params; 
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" }); 
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


function printServerStatus() {
    console.log("Servidor en ejecución..."); 
}

printServerStatus();

export default router;


