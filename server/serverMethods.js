Meteor.methods({
  bookTitleAvailable: function (bookTitle) {
    booksWithTitle = Books.find({title: bookTitle}).fetch();
    return booksWithTitle;
    // if(booksWithTitle.length === 0) {
    //   return true;
    // } else {
    //   return false;
    // }
  },
  getBooksWrapAsync: function(bookTitle) {
   let convertAsyncToSync  = Meteor.wrapAsync( Books.find );
   let resultOfAsyncToSync = convertAsyncToSync({title: bookTitle}, {} );
   console.log("Result of AsynctoSync " + resultOfAsyncToSync);
  //  if(resultOfAsyncToSync.fetch().length === 0) {
  //    return true;
  //  } else {
  //    return false;
  //  }
 }
});
