
Books = new Mongo.Collection("books");

Schemas = {};

Schemas.Book = new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 5,
    unique: true
  },
  publisher: {
  type: String,
  label: "Publisher",
  max: 10,
  },
  authors: {
    type: Array,
    label: "Author",
    optional: false,
    minCount: 1,
    maxCount: 5
  },
  "authors.$": {
    type: Object,
    optional: false
  },
  "authors.$.fname": {
    type: String,
    label: "First Name",
    max: 10
  },
  "authors.$.lname": {
    type: String,
    label: "Last Name"
  },
  "authors.$.gender": {
    type: String,
    label: "Data Type",
    optional: true,
    allowedValues: [
      "Male",
      "Female"
    ],
    defaultValue: "Bit"
  }
});

Books.attachSchema(Schemas.Book);
