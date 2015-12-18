let MyOwnInput = require('./myinput.jsx');
module.exports = React.createClass({
  // Add the Formsy Mixin
  genName3(s1,s2){
    return `authors[${s1}][${s2}]`;
  },
  genName(s1,s2 = undefined){
    if(s2 === undefined)
      return `authors.${s1}`;
    else {
      return `authors.${s1}.${s2}`;
    }
  },
  render() {
    let index = this.props.index;
    validationContext = this.props.validationContext;
    //  console.log("Input render called");
    let keyfName = this.genName(index,"fname");
    let keylName = this.genName(index,"lname");
    let keyfName2 = this.genName3(index,"fname");
    let keylName2 = this.genName3(index,"lname");

    console.log(keyfName);
    let fNameErrMsg = validationContext.keyErrorMessage(keyfName);
    let lNameErrMsg = validationContext.keyErrorMessage(keylName);
    return (
      <td>
        <div className="pure-form pure-form-stacked">
          <MyOwnInput name={keyfName2} type="text" validations={"validateKey:" + keyfName} label="First Name" validationError={fNameErrMsg} required/>
          <MyOwnInput name={keylName2} type="text" validations={"validateKey:" + keylName} label="Last Name" validationError={lNameErrMsg} required/>
        </div>
      </td>
    )
  }
});
