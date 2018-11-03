const mongoose = require('mongoose');

const OfficeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    office_start_date: {
      type: Date,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
  },
  { versionKey: false },
);

const Office = mongoose.model('Office', OfficeSchema);

module.exports = Office;
