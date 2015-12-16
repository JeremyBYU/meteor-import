let Formsy = require('../../node_modules/formsy-react');  //no freaking clue why I need to do it this way
let MyOwnInput = require('./myinput.jsx');
let MyRemoveButton = require('./mmremove.jsx');
// import {MyOwnInput} from "components/myinput"

module.exports = React.createClass({
  getInitialState: function () {
    return {
      canSubmit: false,
      validationContext: validationContext,
      numAuthors: 1
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
    console.log(model);
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
    return `authors.${s1}.${s2}`;
  },
  genName3(s1,s2){
    return `authors[${s1}][${s2}]`;
  },
  genName1(s1){
    return `authors.${s1}`;
  },
  addAuthor(){
    let numAuthors = this.state.numAuthors;
    this.setState({numAuthors: numAuthors + 1});
  },
  genAuthorComp(index){
    let keyfName = this.genName2(index,"fname");
    let keylName = this.genName2(index,"lname");
    let keyfName2 = this.genName3(index,"fname");
    let keylName2 = this.genName3(index,"lname");

    console.log(keyfName);
    let fNameErrMsg = this.state.validationContext.keyErrorMessage(keyfName);
    let lNameErrMsg = this.state.validationContext.keyErrorMessage(keylName);
    return (
      <td>
        <div className="pure-form pure-form-stacked">
          <MyOwnInput name={keyfName2} type="text" validations={"validateKey:" + keyfName} label="First Name" validationError={fNameErrMsg} required/>
          <MyOwnInput name={keylName2} type="text" validations={"validateKey:" + keylName} label="Last Name" validationError={lNameErrMsg} required/>
        </div>
      </td>
    )
  },
  genAuthors(num){
    let authors = [];
    for(let i = 0; i < num; i++){
      let keyAuthor = this.genName1(i);
      authors.push(<tr key={keyAuthor} ><td> <MyRemoveButton numAuthors={this.state.numAuthors} index={keyAuthor}/> </td>{this.genAuthorComp(i)}</tr>)
    }
    return (authors);
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
            <table className="pure-table pure-table-horizontal">
              <thead>
                <tr>
                  <th></th>
                  <th>Authors : Error Message</th>
                </tr>
              </thead>
              <tbody>
                {this.genAuthors(this.state.numAuthors)}
              </tbody>
            </table>
            <a onClick={this.addAuthor} className="pure-button" href="javascript:void(0)">Add Author</a>
            <button className={buttonClass} type="submit" disabled={!this.state.canSubmit}>Submit</button>
          </fieldset>
        </Formsy.Form>
    </div>
    );
  }
});
