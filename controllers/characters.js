const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  console.log("getAll running");
  const result = await mongodb.getDb().db().collection("characters").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("characters") 
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const newCharacter = async (req, res, next) => {
  const character = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    house: req.body.house,
    patronus: req.body.patronus,
    wand: req.body.wand,
    affiliation: req.body.affiliation
  };

  const response = await mongodb
    .getDb()
    .db()
    .collection("characters")
    .insertOne(character);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating the character."
      );
  }
};

const updateCharacter = async (req, res) => {
  const characterId = req.params.id;

  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("characters")
      .updateOne(
        { _id: new ObjectId(characterId) },
        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthday: req.body.birthday,
            house: req.body.house,
            patronus: req.body.patronus,
            wand: req.body.wand,
            affiliation: req.body.affiliation
          },
        }
      );
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Character updated successfully" });
    } else {
      res.status(404).json({ error: "Character not found" });
    }
  } catch (error) {
    console.error("Error updating character:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCharacter = async (req, res) => {
  const characterId = req.params.id;
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("characters")
      .deleteOne({ _id: new ObjectId(characterId) });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Character deleted successfully" });
    } else {
      res.status(404).json({ error: "Character not found" });
    }
  } catch (error) {
    console.error("Error deleting character:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAll,
  getSingle,
  newCharacter: newCharacter,
  updateCharacter: updateCharacter,
  deleteCharacter: deleteCharacter,
};
