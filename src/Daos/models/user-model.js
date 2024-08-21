import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: { type: String, require: true }, // Primer nombre del usuario
    last_name: { type: String, require: true },  // Apellido del usuario
    email: { type: String, require: true, unique: true }, // Correo electrónico, debe ser único
    age: { type: Number, require: true },        // Edad del usuario
    password: { type: String, require: true },   // Contraseña del usuario
    role: { type: String, enum: ["admin", "user"], default: "user" }, // Rol del usuario, por defecto 'user'
    cart: { type: Schema.Types.ObjectId, ref: "carts" }, // Referencia a un carrito
});


export const userModel = model("user", userSchema);
