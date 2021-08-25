const Marker = require("../models/Marker");

exports.getMarkers = async (req, res) => {
  try {
    const markers = await Marker.find();

    return res.status(200).json({
      status: "ok",
      markers,
    });
  } catch (err) {
    return res.status(500).json({
      staus: "error",
      message: "get all markers failed",
    });
  }
};

exports.createMarker = async (req, res) => {
  try {
    const newMarker = new Marker(req.body);

    await newMarker.save();

    return res.status(200).json({
      status: "ok",
      newMarker,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "create marker failed",
    });
  }
};
