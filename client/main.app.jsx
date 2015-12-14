let Formsy = require('formsy-react');
validationContext = Schemas.Book.namedContext("createBookForm");

Formsy.addValidationRule('isFruit', function (values, value) {
  object = {Title: value};
  //  Schemas.Book.validate()
});
Formsy.addValidationRule('isMoreThan', function (values, value, otherField) {
  let object = {}
  object[otherField] = value;
  console.log(object);
  let valid1 = validationContext.validateOne(object,otherField);
  let valid2  = (_.where(validationContext._invalidKeys,{name: otherField}).length) === 0;
  console.log(_.where(validationContext._invalidKeys,{name: otherField}).length);
  console.log("Validation 1 for " + otherField + " is " + valid1);
  console.log("Validation 2 for " + otherField + " is " + valid2);
  return valid2;
});
//  let Button = require('react-pure').Button
MmApp = React.createClass({
  //mixins: [ReactMeteorData],
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
  submit: function (model) {
    let valid = this.state.validationContext.validate(model);
    if(valid){
      Books.insert(model);
    } else {
      console.log('What the hell do I do now?')
    }
  },
  renderCalled() {
    console.log('Render MmApp called')
  },
  appendClass(baseClass, newClass) {
    return `${baseClass} ${newClass}`;
  },
  render() {
    this.renderCalled();
    let baseButtonClass = 'pure-button';
    let disabledButtonClass = 'pure-button-disabled';
    let buttonClass = this.state.canSubmit ? baseButtonClass : this.appendClass(baseButtonClass,disabledButtonClass);

    let titleErrMsg = this.state.validationContext.keyErrorMessage("title");
    let authorErrMsg = this.state.validationContext.keyErrorMessage("author");
    console.log(titleErrMsg);
    return (
      <div className="content pure-g">
        <div className="pure-u-1 pure-u-md-1-3">
          <h1> Tags </h1>
            <Formsy.Form className="pure-form pure-form-aligned" onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
              <fieldset>
                <MyOwnInput name="title" validations="isMoreThan:title" label="Title" validationError={titleErrMsg} required/>
                <MyOwnInput name="author" validations="isMoreThan:author" label="Author" validationError={authorErrMsg} required/>
                <div className="pure-controls">
                  <button className={buttonClass} type="submit" disabled={!this.state.canSubmit}>Submit</button>
                </div>
              </fieldset>
            </Formsy.Form>
        </div>
        <div className="pure-u-1 pure-u-md-2-3">
          <div className="container">
              Test
          </div>
        </div>
      </div>
    );
  }
});

let MyOwnInput = React.createClass({
  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  // setValue() will set the value of the component, which in
  // turn will validate it and the rest of the form
  getInitialState() {
    let context = Schemas.Book.newContext();
    return{
      validationContext : context
    };
  },
  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },
  render: function () {

    // Set a specific className based on the validation
    // state of this component. showRequired() is true
    // when the value is empty and the required prop is
    // passed to the input. showError() is true when the
    // value typed is invalid
    var className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;

    return (
      <div className={className + ' pure-control-group'}>
            <label htmlFor="name">{this.props.label}</label>
            <input type="text" onChange={this.changeValue}/>
            <span>{this.state._isValid || this.state._isPristine ? "" : this.props.validationError}</span>
      </div>
    );
  }
});
