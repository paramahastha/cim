const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    revenue: {
      type: Number,
      required: true,
    },
    phone_code: {
      type: Number,
      required: true,
    },
    phone_number: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false },
);

const Company = mongoose.model('Company', CompanySchema);

module.exports = Company;
