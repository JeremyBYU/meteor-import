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
  genName2(s1, s2){
    return `params.${s1}.${s2}`;
  },
  genName1(s1){
    return `params.${s1}`;
  },
  genParamComp(index){
    let keyName = this.genName2(index,"name");
    let keyAddress = this.genName2(index,"address");

    let nameErrMsg = this.state.validationContext.keyErrorMessage(keyName);
    let addressErrMsg = this.state.validationContext.keyErrorMessage(keyAddress);
    return (
      <div>
        <MyOwnInput name={keyName} type="text" validations={"validateKey:" + keyName} label="Name" validationError={nameErrMsg} required/>

      </div>

    )

    //  console.log(keyName,keyAddress);
  },
  render() {
    //  console.log('Render MmApp called')
    let baseButtonClass = 'pure-button';
    let disabledButtonClass = 'pure-button-disabled';
    let buttonClass = this.state.canSubmit ? baseButtonClass : this.appendClass(baseButtonClass,disabledButtonClass);

    let titleErrMsg = this.state.validationContext.keyErrorMessage("title");
    let pubErrMsg = this.state.validationContext.keyErrorMessage("publisher");
    //  console.log(titleErrMsg);
    return (
      <div>
        <h2> Book Form </h2>
        <Formsy.Form ref="form" className="pure-form pure-form-stacked" onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
          <fieldset>
            <legend>Add a book!</legend>
            <MyOwnInput name="title" validations="validateKey:title" label="Title" validationError={titleErrMsg} required/>
            <MyOwnInput name="publisher" validations="validateKey:publisher" label="Publisher" validationError={pubErrMsg} required/>
            {this.genParamComp(1)}
            <button className={buttonClass} type="submit" disabled={!this.state.canSubmit}>Submit</button>
          </fieldset>
        </Formsy.Form>
    </div>
    );
  }
});
