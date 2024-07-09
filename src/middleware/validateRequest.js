const { check } = require('express-validator');

const validateApi = [
  check('MSISDN').notEmpty().withMessage('El número es un campo obligatorio')
  .isLength({ min: 10, max: 16 }).withMessage('El número debe tener 10 dígitos'),
  check('OFFERID').notEmpty().withMessage('La oferta es un campo obligatorio')
  .isLength({ min: 10, max: 16 }).withMessage('La oferta debe tener 10 dígitos'),
  check('AMOUNT').notEmpty().withMessage('El precio es un campo obligatorio'),
  check('KEY').notEmpty().withMessage('KEY es un campo obligatorio')

];

const validateStore = [
  check('name').notEmpty().withMessage('El nombre es un campo obligatorio'),
  check('comerce_key').notEmpty().withMessage('La key es un campo obligatorio')

];

module.exports = {validateApi, validateStore};
