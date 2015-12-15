if (Meteor.isClient) {
  import moment from "moment"

  let MmForm = require('./imports/mmform.jsx');
  //  console.log(MmForm);

  Meteor.startup(function () {
    ReactDOM.render(React.createElement(MmForm, null), document.getElementById("test"));
  });
  Template.books.helpers({
    books: function () {
      return Books.find({}).fetch()
    }
  });
  console.log(`${moment().calendar()}`);
}
