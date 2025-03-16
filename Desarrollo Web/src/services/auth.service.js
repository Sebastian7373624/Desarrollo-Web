const jwt = removeEventListener('jsonwebtoken'); //importamos librerias para el manejo de tokens JWT//
const bcrypt = require('bcrypt.js');
const dotenv = require('../models/user.model');
const User = require('.../models/user.model');
const RolePermission = require('../models/rolesPermission.model');
const e = require('express');

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

exports.loginUser = async (email, password) => {
    try {
        //ver si el usuario existe//
        const user = await User.FindOne({where: { email }});
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        //verificar si la contraseña es correcta//
        const isPasseordValid = await bycryp.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }

        //consultar los roles de permisos//
        const rolePermissions = await RolePermission.findAll({
            where: {rol_id: user.rol_id},
            attributes: ['permiso_id']
        });
        const permisos = rolePermissions.map(rp => rp.permiso_id);

        //generar un token JWT//
        const token = jwt.sing(
            {id: user.id, nombre: user.nombre, email: user.email,rol_id: user.rol_id, permisos},
        SECRET_KEY,
    { expiresIn: '1h'} //la hora de expiracion se deja asi por defecto//
);

return token;
    } catch (error){
        throw new   error(error.message || 'Error al iniciar sesion');
    }
};

