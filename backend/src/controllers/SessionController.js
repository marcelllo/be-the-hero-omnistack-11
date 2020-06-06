const conn = require('../database/Connection');

module.exports = {
    async create(req, res) {
        const { id } = req.body;

        const ong = await conn('ongs')
            .where('id', id)
            .select('name')
            .first();

        if (!ong) {
            return res.status(400).json({error: "Not ONG found with this ID"});
        }

        return res.json(ong);
    }
}