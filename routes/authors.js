const express = require("express");
const Author = require("../models/author");

const router = express.Router();

/**
 * GET authors listing.
 */
router.get("/", async (req, res) => {
  try {
    let filters = {};
    if (req.query.pais) filters = { pais: req.query.pais };
    const authors = await Author.find(filters);
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * GET authors by publish cant
 */
router.get("/publishCant", async (req, res) => {
  try {
    const authors = await Author.find(
      { $and: [{ publicados: { $lte: 20 } }, { pais: "Colombia" }] },
      { nombre: 1, apellido: 1, _id: 0 }
    );
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/**
 * GET authors by apellido exist
 */
router.get("/publishApe", async (req, res) => {
  try {
    const authors = await Author.find(
      { apellido: { $exists: true } },
      { nombre: 1, _id: 0 }
    );
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/**
 * GET authors by >20 publish
 */
router.get("/publishArg", async (req, res) => {
  try {
    const authors = await Author.find(
      { $or: [{ publicados: { $gt: 20 } }, { pais: "Argentina" }] },
      { apellido: 1, _id: 0 }
    );
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * Create a new Author
 */
router.post("/", async (req, res) => {
  try {
    let author = new Author(req.body);
    author = await author.save({ new: true });
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
