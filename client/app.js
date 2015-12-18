Formsy = require('formsy-react');
Formsy.addValidationRule('validateKey', function (values, value, otherField) {
  let object = {}
  object[otherField] = value;
  // console.log(object);
  let valid = Schemas.Book.namedContext("createBookForm").validateOne(object,otherField);
  return valid;
});
