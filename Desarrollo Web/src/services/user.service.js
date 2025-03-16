const User = require('../model/user.model');
const bcrypt = require('bcryptjs');

exports.CreateUser = async (nombre, email, passwor, rol_id, administrador_id) => {
    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return { message: 'El usuario ya existe' };
        }

        const hashedPassword = await bcrypt.hash(passwor, 10);

        const newUser = await User.create({
            nombre,
            email,
            password: hashedPassword,
            rol_id,
            administrador_id
        });

        return newUser;
    } catch (err) {
        throw new Error('Error al crear el usuario');
    }
};

module.exports = exports;

exports.createUser = async (nombre, email, password, rol_id, administrador_id) => { 
};

exports.getAllUsersByAdministradorId = async (administrador_id, email) => { //exporta la funcion//
    try {
        const whereClause = { administrador_id };
        if (email) {
            whereClause.email = email;
        }

        const users = await User.findAll({ //consultar la base de datos por medio del User//
            where: whereClause, 
            attributes: { exclude: ['password'] } 
        });

        return users;
    } catch (err) { //control de Errores//
        throw new Error(`Error al obtener los usuarios: ${err.message}`);
    }
};
exports.getAllUsersByRolId = async (rol_id) => { 
    try {
        const users = await User.findAll({ 
            where: { rol_id }, 
            attributes: { exclude: ['password'] } 
        });
        return users;
    } catch (err) {
        throw new Error(`Error al obtener los usuarios por rol: ${err.message}`);
    }
};

exports.updateUser = async (id, nombre, email, rol_id, administrador_id, admin_from_token) => {
    try {
        const user = await User.findByPk(id);

        if (user.administrador_id !== admin_from_token) {
            throw new Error('Acceso denegado, este usuario no está bajo su administración');
        }

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        if (email && email !== user.email) {
            const userExists = await User.findOne({ where: { email } });
            if (userExists) {
                throw new Error('El email ya está en uso');
            }
        }

        await user.update({
            nombre,
            email,
            rol_id,
            administrador_id
        });

        return user;
    } catch (err) { //control de Errores//
        throw new Error(`Error al actualizar el usuario: ${err.message}`);
    }
};

exports.deleteUser = async (id, admin_from_token) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        if (user.administrador_id !== admin_from_token) {
            throw new Error('Acceso denegado, este usuario no está bajo su administración');
        }
        await user.destroy();
        return { message: 'Usuario eliminado con éxito' };
    } catch (error) {
        throw new Error(`Error al eliminar el usuario: ${error.message}`);
    }
};