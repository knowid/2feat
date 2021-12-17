const adminSchema = require("../models/adminSchema");

const adminController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      let isAdmin = await adminSchema.findOne({
        email: email,
        password: password,
      });
      if (!isAdmin) return res.json({ msg: "Invalid Authentication!" });
      return res.json(isAdmin._id);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: err.msg });
    }
  },
  register: async (req, res) => {
    try {
      const { email, password, category } = req.body;
      const admin = new adminSchema({
        email: email,
        password: password,
        category: category,
      });
      const adminRes = await admin.save();
      return res.json(adminRes);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ msg: err.msg });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { category, id } = req.body;
      await adminSchema.findByIdAndUpdate(id, {
        $set: {  category: category },
      });
      return res.json({ msg: "Category updated successfully!" });
    } catch (err) {
      return res.status(400).json({ msg: err.msg });
    }
  },
  getCategory: async (req, res) => {
    try {
      const allCategory = await adminSchema.findOne({}, { category: 1 });
      return res.json(allCategory);
    } catch (err) {
      return res.status(400).json({ msg: err.msg });
    }
  },
};

module.exports = adminController;
