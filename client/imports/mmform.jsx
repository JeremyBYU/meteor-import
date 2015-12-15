let Formsy = require('../../node_modules/formsy-react');  //no freaking clue why I need to do it this way
let MyOwnInput = require('./myinput.jsx');
// import {MyOwnInput} from "components/myinput"

module.exports = React.createClass({
  getInitialState: function () {
    return {
      canSubmit: false,
      validationContext: validationContext
    }
  },
  enableButton: function () {
    this.setState({
      canSubmit: true
    });
  },
  disableButton: function () {
    this.setState({
      canSubmit: false
    });
  },
  submit: function (model, resetForm, invalidateForm) {
    let valid = this.state.validationContext.validate(model);
    if(valid){  //  Form is valid, but still need to check if Book Title is unique
      let unique = Meteor.call('bookTitleAvailable', model.title, (error, result) => {
        if(error){
          console.log(error); //  Consider invalidating Form
        } else {
          if(result){
            Books.insert(model);
            resetForm();
            //  Consider Adding a success message or something
          } else {
            // Guess this book is already taken!
            invalidateForm({title: "This title is already taken"});
          }
        }
      });
    } else {
      //Its not valid, not sure how i got here...
      console.log('What the hell do I do now?')
    }
  },
  appendClass(baseClass, newClass) {
    return `${baseClass} ${newClass}`;
  },
  render() {
    //  console.log('Render MmApp called')
    let baseButtonClass = 'pure-button';
    let disabledButtonClass = 'pure-button-disabled';
    let buttonClass = this.state.canSubmit ? baseButtonClass : this.appendClass(baseButtonClass,disabledButtonClass);

    let titleErrMsg = this.state.validationContext.keyErrorMessage("title");
    let authorErrMsg = this.state.validationContext.keyErrorMessage("author");
    //  console.log(titleErrMsg);
    return (
      <div>
        <h2> Book Form </h2>
        <Formsy.Form ref="form" className="pure-form pure-form-stacked" onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
          <fieldset>
            <legend>Add a book!</legend>
            <MyOwnInput name="title" validations="validateKey:title" label="Title" validationError={titleErrMsg} required/>
            <MyOwnInput name="author" validations="validateKey:author" label="Author" validationError={authorErrMsg} required/>
            <button className={buttonClass} type="submit" disabled={!this.state.canSubmit}>Submit</button>
          </fieldset>
        </Formsy.Form>
    </div>
    );
  }
});
