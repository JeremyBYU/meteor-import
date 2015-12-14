if (Meteor.isClient) {
  import moment from "moment"
  import Formsy from 'formsy-react'

  Meteor.startup(function () {
    ReactDOM.render(React.createElement(MmApp, null), document.getElementById("test"));
  });
  Template.books.helpers({
    books: function () {
      return Books.find({}).fetch()
    }
  });

  console.log(`${moment().calendar()}`);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
