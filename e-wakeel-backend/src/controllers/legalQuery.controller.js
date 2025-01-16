const { LegalQuery } = require("../models");

exports.createLegalQuery = async (req, res) => {
  try {
    const query = await LegalQuery.create(req.body);
    res.status(201).json(query);
  } catch (error) {
    res.status(500).json({ message: "Error creating query", error });
  }
};

exports.getLegalQueries = async (req, res) => {
  try {
    const queries = await LegalQuery.findAll();
    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching queries", error });
  }
};
