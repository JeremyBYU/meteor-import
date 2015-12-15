
Books = new Mongo.Collection("books");

Schemas = {};

Schemas.Book = new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 5,
    unique: true
  },
  author: {
  type: String,
  label: "Author"
  }
});

Books.attachSchema(Schemas.Book);
