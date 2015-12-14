
Books = new Mongo.Collection("books");

Schemas = {};

Schemas.Book = new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 5,
    unique: true,
    custom: function () {
      if (Meteor.isClient && this.isSet) {
        // let unique = Meteor.call("bookTitleAvailable", this.value, function (error, result) {
        //   //  console.log("meteor method Result: " + result);
        //   if (!result) {
        //     Books.simpleSchema().namedContext("createBookForm").addInvalidKeys([{name: "title", type: "notUnique"}]);
        //   }
        // });
        let unique = Meteor.call('bookTitleAvailable', this.value);
        console.log("Simple Schema Validator " + unique);
        if(unique){
          return true;
        } else {
          Books.simpleSchema().namedContext("createBookForm").addInvalidKeys([{name: "title", type: "notUnique"}]);
          return "notUnique";
        }
      }
    }
  },
  author: {
  type: String,
  label: "Author"
  }
});

Books.attachSchema(Schemas.Book);
