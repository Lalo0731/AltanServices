const { check } = require('express-validator');

const validateRequest = [
  check('MSISDN').notEmpty().withMessage('MSISDN es un campo obligatorio'),
  check('OFFERID').notEmpty().withMessage('OFFERID es un campo obligatorio'),
  check('AMOUNT').notEmpty().withMessage('AMOUNT es un campo obligatorio'),
  check('KEY').notEmpty().withMessage('KEY es un campo obligatorio')

];

module.exports = validateRequest;
