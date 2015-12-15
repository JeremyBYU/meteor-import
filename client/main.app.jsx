let Formsy = require('formsy-react');
validationContext = Schemas.Book.namedContext("createBookForm");

Formsy.addValidationRule('validateKey', function (values, value, otherField) {
  let object = {}
  object[otherField] = value;
  // console.log(object);
  let valid = validationContext.validateOne(object,otherField);
  return valid;
});
