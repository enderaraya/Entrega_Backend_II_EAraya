import UserDao from "../Daos/user-dao.js";

const userDao = new UserDao();

export const getUsers = async () => {
    try {
        return await userDao.getUsers();
    } catch (error) {
        console.log("Error al obtener usuarios:", error);
    }
};

export const createUser = async (user) => {
    try {

        console.log("Creando usuario:", user);
        return await userDao.createUser(user);
    } catch (error) {
        console.log("Error al crear usuario:", error);
    }
};

export const getUserByEmail = async (email) => {
    try {

        console.log("Buscando usuario por email:", email);
        return await userDao.getUserByEmail(email);
    } catch (error) {
        console.log("Error al obtener usuario por email:", error);
    }
};

