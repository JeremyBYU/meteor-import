let MyOwnInput = require('./myinput.jsx');
let Author = React.createClass({
  // Add the Formsy Mixin
  genName2(s1,s2){
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
    console.log('Author render Called');
    let index = this.props.index;
    validationContext = this.props.validationContext;
    let keyfName = this.genName(index,"fname");
    let keylName = this.genName(index,"lname");
    let keyfName2 = this.genName2(index,"fname");
    let keylName2 = this.genName2(index,"lname");

    //  console.log(keyfName);
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
module.exports = Author;
