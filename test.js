if (Meteor.isClient) {
  import moment from "moment"
  import Formsy from 'formsy-react'
  //  import Pure from 'reac-pure'

  console.log(Formsy);


  Meteor.startup(function () {
    ReactDOM.render(React.createElement(MmApp, null), document.getElementById("test"));
  });

  console.log(`${moment().calendar()}`)
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
