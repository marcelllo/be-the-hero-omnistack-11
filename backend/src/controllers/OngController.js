const crypto = require('crypto');
const conn = require('../database/Connection');

module.exports = {

    async index(req, res) {
        const ongs = await conn('ongs').select('*');

        return res.json(ongs);
    },

    async create(req, res) {
        const { name, email, whatsapp, city, uf } = req.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await conn('ongs').insert({
            id, 
            name,
            email, 
            whatsapp, 
            city, 
            uf 
        });

        return res.status(201).json({id});
    }

}