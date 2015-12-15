Meteor.methods({
  bookTitleAvailable: function (bookTitle) {
    booksWithTitle = Books.find({title: bookTitle}).fetch();
    /// return booksWithTitle;
    if(booksWithTitle.length === 0) {
      return true;
    } else {
      return false;
    }
  }
});
