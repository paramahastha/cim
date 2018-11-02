const Office = require('../models/office.model');

module.exports.check = async (req, res, next) => {
  const office = await Office.findById(req.params.id);
  if (!office) {
    throw Error('Office not found');
  }

  next();
};

module.exports.create = async (req, res) => {
  const office = new Office(req.body);
  await office.save();

  res.json(office);
};

module.exports.remove = async (req, res) => {
  await Office.findByIdAndRemove(req.params.id);

  res.json(req.params.id);
};

module.exports.list = async (req, res) => {
  const offices = await Office.find().populate('company');

  res.json(offices);
};

module.exports.update = async (req, res) => {
  const office = await Office.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
    },
  ).exec();

  res.json(office);
};

module.exports.view = async (req, res) => {
  const office = await Office.findById(req.params.id).populate('company');

  res.json(office);
};
