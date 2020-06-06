const conn = require("../database/Connection");

module.exports = {
  async index(req, res) {
    const ong_id = req.headers.authorization;

    if (!ong_id) {
      return res
        .status(401)
        .json({ error: "You have to login to create an Incident" });
    }

    const incidents = await conn("incidents")
      .join("ongs", "ongs.id", "=", "ong_id")
      .where("ong_id", ong_id)
      .select([
        "incidents.*",
        "ongs.name",
        "ongs.email",
        "ongs.whatsapp",
        "ongs.city",
        "ongs.uf",
      ]);

    return res.json(incidents);
  },
};
