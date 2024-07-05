const { check } = require('express-validator');

const validateRequest = [
  check('MSISDN').notEmpty().withMessage('MSISDN es un campo obligatorio')
  .isLength({ min: 10, max: 16 }).withMessage('MSISDN debe tener 10 dígitos'),
  check('OFFERID').notEmpty().withMessage('OFFERID es un campo obligatorio')
  .isLength({ min: 10, max: 16 }).withMessage('El OFFERID debe tener 10 dígitos'),
  check('AMOUNT').notEmpty().withMessage('AMOUNT es un campo obligatorio'),
  check('KEY').notEmpty().withMessage('KEY es un campo obligatorio')

];

module.exports = validateRequest;
