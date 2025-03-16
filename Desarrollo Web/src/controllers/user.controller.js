const userService = require('../services/user.service');

exports.createUser = async (req, res) => { 
};

exports.getAllUsersByAdministradorId = async (req, res) => {
    try {
        const admin_from_token = req.user.id;
        const { email } = req.query;
        const users = await userService.getAllUsersByAdministradorId(admin_from_token, email); //recibir el email del administrador//
        res.status(200).json({ message: 'Usuarios consultados con éxito', users }); //guarda toda la informacion en el User//
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error }); 
    }
};

exports.getAllUsersByRolId = async (req, res) => {
    try {
        const { rol_id } = req.params;
        const users = await userService.getAllUsersByRolId(rol_id);
        res.status(200).json({ message: 'Usuarios consultados con éxito', users });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error: error.message });
    }
};


exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, rol_id, administrador_id } = req.body;
    const admin_from_token = req.user.id;
    try {
        const user = await userService.updateUser(id, nombre, email, rol_id, administrador_id, admin_from_token);
        res.status(200).json({ message: 'Usuario actualizado con éxito', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const admin_from_token = req.user.id;
    try {
        const result = await userService.deleteUser(id, admin_from_token);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
