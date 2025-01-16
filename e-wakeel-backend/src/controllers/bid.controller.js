const bidModel = require("../models/bid.model");

exports.getAllBids = async (req, res) => {
  try {
    const bids = await bidModel.findAll();
    res.status(200).json(bids);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bids", error });
  }
};

exports.createBid = async (req, res) => {
  try {
    const newBid = await bidModel.create(req.body);
    res.status(201).json(newBid);
  } catch (error) {
    res.status(500).json({ message: "Error creating bid", error });
  }
};

exports.getBidById = async (req, res) => {
  try {
    const bid = await bidModel.findByPk(req.params.id);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }
    res.status(200).json(bid);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bid", error });
  }
};

exports.updateBid = async (req, res) => {
  try {
    const [updated] = await bidModel.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedBid = await bidModel.findByPk(req.params.id);
      res.status(200).json(updatedBid);
    } else {
      res.status(404).json({ message: 'Bid not found' });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating bid", error });
  }
};

exports.deleteBid = async (req, res) => {
  try {
    const deleted = await bidModel.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send("Bid deleted");
    } else {
      res.status(404).json({ message: 'Bid not found' });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting bid", error });
  }
};

exports.acceptBid = async (req, res) => {
  try {
    const bid = await bidModel.findByPk(req.params.id);
    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }
    bid.status = 'Accepted';
    await bid.save();
    res.status(200).json({ message: "Bid accepted successfully", bid });
  } catch (error) {
    res.status(500).json({ message: "Error accepting bid", error });
  }
};

