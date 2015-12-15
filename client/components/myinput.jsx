let Formsy = require('formsy-react');
module.exports = React.createClass({
  // Add the Formsy Mixin
  mixins: [Formsy.Mixin],

  changeValue: function (event) {
    this.setValue(event.currentTarget.value);
  },
  render: function () {
    //  console.log("Input render called");
    var className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;
    //Add this just in case there has been an external error from server side invalidation, all other cases error is passed by props
    let errorMessage = this.state._externalError ? this.state._externalError[0] : this.props.validationError;
    return (
      <div className={className}>
            <label htmlFor={this.props.name}>{this.props.label}</label>
            <input name={this.props.name} value={this.getValue()} type="text" onChange={this.changeValue}/>
            <span>{this.state._isValid || this.state._isPristine ? "" : errorMessage}</span>
      </div>
    );
  }
});
