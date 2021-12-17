const sneakerSchema = require("../models/sneakerSchema");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const sneakerController = {
  getAll: async (req, res) => {
    try {
      const allSneakers = await sneakerSchema.find({});
      if (!allSneakers) {
        return res.json({ msg: "No sneakers available" });
      }
      return res.json(allSneakers);
    } catch (err) {
      return res.status(400).json({ msg: err.msg });
    }
  },
  getOne: async (req, res) => {
    try {
      const id = req.params.id;
      const sneaker = await sneakerSchema.findById(id);
      if (!sneaker) {
        return res.json({
          msg: "Invalid ID. No sneaker found for the given ID.",
        });
      }
      return res.json(sneaker);
    } catch (err) {
      return res.status(400).json({ msg: err.msg });
    }
  },
  postSneaker: async (req, res) => {
    try {
      const {
        title,
        price,
        description,
        mainImage,
        otherImages,
        category,
        rating,
        tags,
      } = req.body;

      let publicId = "";

      await cloudinary.v2.uploader.upload(mainImage, async (err, result) => {
        if (err) throw err;
        publicId = result.public_id;
      });

      let pubIds = [];

      await Promise.all(
        otherImages.map(async (item) => {
          await cloudinary.v2.uploader.upload(item, async (err, result) => {
            if (err) throw err;
            pubIds = [...pubIds, result.public_id];
          });
        })
      );

      const newSneaker = new sneakerSchema({
        title,
        price,
        description,
        mainImage: publicId,
        otherImages: pubIds,
        category,
        rating,
        tags,
      });
      const newsneaker = await newSneaker.save();
      return res.json(newsneaker);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: err.msg });
    }
  },
  updateSneaker: async (req, res) => {
    try {
      const id = req.params.id;
      const {
        title,
        price,
        description,
        category,
        rating,
        tags,
      } = req.body;
      await sneakerSchema.findByIdAndUpdate(id, {
        $set: {
          title: title,
          price: price,
          description: description,
          category: category,
          rating: rating,
          tags: tags,
        },
      });
      return res.json({ msg: "Sneaker details updated successfully!" });
    } catch (err) {
      return res.status(400).json({ msg: err.msg });
    }
  },
  deleteSneaker: async (req, res) => {
    try {
      const id = req.params.id;
      await sneakerSchema.findByIdAndDelete(id);
      return res.json({ msg: "Sneaker deleted successfully!" });
    } catch (err) {
      return res.status(400).json({ msg: err.msg });
    }
  },
};

module.exports = sneakerController;
