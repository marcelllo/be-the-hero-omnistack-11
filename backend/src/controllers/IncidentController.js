const conn = require('../database/Connection');

module.exports = {

    async index(req, res) {
        const { page = 1 } = req.query;

        const [count] = await conn('incidents').count();
        const total = count['count(*)'];

        const incidents = await conn('incidents')
            .join('ongs','ongs.id', '=', 'ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf',
            ]);

        

        res.header('X-Total-Count', total);
        res.header('X-Actual-Page', page);
        res.header('X-Total-Page', Math.round(total / 5));

        return res.json(incidents);

    },

    async create(req, res) {
        const { title, description, value } = req.body;

        const ong_id = req.headers.authorization;

        if (!ong_id) {
            return res.status(401).json({error: 'You have to login to create an Incident'});
        } 
        
        const ong = await conn('ongs')
            .where('id', ong_id)
            .first();

        if (!ong) {
            return res.status(401).json({error: 'You have to login to create an Incident'});
        }

        const [id] = await conn('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return res.status(201).json({ id });

    },

    async delete(req, res) {

        const { id } = req.params;

        const ong_id = req.headers.authorization;

        if (!ong_id) {
            return res.status(400).json({error: 'You have to login to create an Incident'});
        }

        const incident = await conn('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id !== ong_id) {
            return res.status(405).json({ error: 'That incident was not yours.'});
        }

        await conn('incidents').where('id', id).delete();

        return res.status(204).send();

    }


};