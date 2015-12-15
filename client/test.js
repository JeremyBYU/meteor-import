if (Meteor.isClient) {
  import moment from "moment"
  import Formsy from 'formsy-react'
  //  import {MmForm} from './components/mmform.jsx'
  let MmForm = require('./components/mmform.jsx');
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
