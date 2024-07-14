const { check } = require('express-validator');

const validateApi = [
  check('msisdn').notEmpty().withMessage('El número es un campo obligatorio')
  .isLength({ min: 10, max: 15 }).withMessage('El número debe tener 10 dígitos'),
  check('offerId').notEmpty().withMessage('La oferta es un campo obligatorio')
  .isLength({ min: 10, max: 16 }).withMessage('La oferta debe tener 10 dígitos'),
  check('amount').notEmpty().withMessage('El precio es un campo obligatorio'),
  check('comerce_key').notEmpty().withMessage('KEY es un campo obligatorio')

];

const validateStore = [
  check('name').notEmpty().withMessage('El nombre es un campo obligatorio')
];

module.exports = {validateApi, validateStore};
