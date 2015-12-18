
// options={[
//   { value: "black", title: "Black" },
//   { value: "brown", title: "Brown" },
//   { value: "blonde", title: "Blonde" },
//   { value: "red", title: "Red" }
// ]}
let Formsy = require('../../node_modules/formsy-react');

let MySelect = React.createClass({
  mixins: [Formsy.Mixin],

  changeValue(event) {
    this.setValue(event.currentTarget.value);
  },

  render() {
    const className = 'form-group' + (this.props.className || ' ') +
      (this.showRequired() ? 'required' : this.showError() ? 'error' : '');
    let errorMessage = this.state._externalError ? this.state._externalError[0] : this.props.validationError;

    const options = this.props.options.map((option, i) => (
      <option key={option.title+option.value} value={option.value}>
        {option.title}
      </option>
    ));

    return (
      <div className={className}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <select name={this.props.name} onChange={this.changeValue} value={this.getValue()}>
          {options}
        </select>
        <span className='validation-error'>{errorMessage}</span>
      </div>
    );
  }

});

module.exports =  MySelect;
