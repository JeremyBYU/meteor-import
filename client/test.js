if (Meteor.isClient) {
  import moment from "moment"
  import Formsy from 'formsy-react'
  let MmForm = require('./imports/mmform.jsx');


  Meteor.startup(function () {
    ReactDOM.render(React.createElement(MmForm, null), document.getElementById("test"));
  });
  Template.books.helpers({
    books: function () {
      return Books.find({}).fetch()
    }
  });
  Template.book.helpers({
    authorsFlat: function (array) {
      if(array.length === 1)
        return JSON.stringify(array[0])
      else {
        return array.reduce(function(previousValue, currentValue, currentIndex, array) {
          return JSON.stringify(previousValue) + JSON.stringify(currentValue)
        });
      }
    }
  });
  console.log(`${moment().calendar()}`);
}
