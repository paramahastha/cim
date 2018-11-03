const Company = require('../models/company.model');
const Office = require('../models/office.model');

module.exports.check = async (req, res, next) => {
  const company = await Company.findById(req.params.id);
  if (!company) {
    throw Error('Company not found');
  }

  next();
};

module.exports.create = async (req, res) => {
  const company = new Company(req.body);
  await company.save();

  res.json(company);
};

module.exports.remove = async (req, res) => {
  await Company.findByIdAndRemove(req.params.id);

  res.json(req.params.id);
};

module.exports.list = async (req, res) => {
  const companies = await Company.find();

  res.json(companies);
};

module.exports.update = async (req, res) => {
  const company = await Company.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
    },
  ).exec();

  res.json(company);
};

module.exports.view = async (req, res) => {
  Company.findById(req.params.id).then(company => {
    Office.find({ company: company._id }).then(offices => {
      res.json({ company, ...{ offices: offices } });
    });
  });
};
