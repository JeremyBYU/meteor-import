let Formsy = require('formsy-react');
MmApp = React.createClass({
  //mixins: [ReactMeteorData],
  getInitialState: function () {
    return {
      canSubmit: false
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
    someDep.saveEmail(model.email);
  },
  renderCalled() {
    //  loglevel.debug('Render Called in MmApp');
  },
  render() {
    this.renderCalled();
    return (
      <div className="content pure-g">
        <div className="pure-u-1 pure-u-md-1-3">
          <h1> Tags </h1>
            <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
              <MyOwnInput name="email" validations="isEmail" validationError="This is not a valid email" required/>
              <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
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

    // An error message is returned ONLY if the component is invalid
    // or the server has returned an error message
    var errorMessage = this.getErrorMessage();

    return (
      <div className={className}>
        <input type="text" onChange={this.changeValue} value={this.getValue()}/>
        <span>{errorMessage}</span>
      </div>
    );
  }
});
