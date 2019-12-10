const mongoose = require('mongoose');
const Usuarios = mongoose.model('Usuarios');
const jwt = require('jsonwebtoken');

module.exports = {
	async index(req, res){
		try {
			const usuario = await Usuarios.findOne({
				email: req.body.email,
				senha: req.body.senha
			});

			if (usuario != null) {
				const token = jwt.sign({ usuario }, process.env.SECRET, {
					expiresIn: 600 //10 minutos
				});

				res.json({ 
					auth: true,
					token
				});				
			} else {
				res.status(400).json({
					erros: "e-mail ou senha incorretos"
				});
			}

		} catch(err) {
			return res.status(400).json({
				msg: err
			});
		}
	}
}