const bodyParser = require('body-parser');
const cors = require('@robertoachar/express-cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const winston = require('winston');

const config = require('./config');
const { notFound, catchAll } = require('./error');

mongoose.connect(
  config.DATABASE,
  { useNewUrlParser: true, useFindAndModify: false },
);
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
  winston.info('Mongoose connected!');
});

mongoose.connection.on('disconnected', () => {
  winston.info('Mongoose disconnected!');
});

mongoose.connection.on('error', err => {
  winston.error(err.message);
  process.exit(1);
});

require('./models/company.model');

let app = express();
const companyRouter = require('./routes/company.router');
const officeRouter = require('./routes/office.router');

app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ message: 'It works!' });
});

app.use('/api/company', companyRouter);
app.use('/api/office', officeRouter);

app.use(notFound);
app.use(catchAll);

module.exports = app;
