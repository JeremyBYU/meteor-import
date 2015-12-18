let Formsy = require('../../node_modules/formsy-react');  //no freaking clue why I need to do it this way
let MyOwnInput = require('./myinput.jsx');
let MyRemoveButton = require('./mmremove.jsx');
let Authors = require('./authors.jsx');
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
  addAuthor(){
    let numAuthors = this.state.numAuthors;
    this.setState({numAuthors: numAuthors + 1});
  },
  removeAuthor(index){
    console.log(`Clicked Remove! on ${index}`);
    let model = this.refs.form.getModel();
    console.log(`Heres the Model ${JSON.stringify(model)}`);
  },
  genAuthors(num){
    let authors = [];
    let hidden = false;
    num === 1 ? hidden = true : hidden = false
    for(let i = 0; i < num; i++){
      let keyAuthor = this.genName(i);
      authors.push(<tr key={keyAuthor} ><td> <MyRemoveButton clickHandler={this.removeAuthor.bind(this, i)} hidden={hidden} index={keyAuthor}/> </td><Author index={i} validationContext={this.state.validationContext}/></tr>)
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
                <Authors clickHandler={this.removeAuthor} validationContext={this.state.validationContext} num={this.state.numAuthors}/>
            </table>
            <a onClick={this.addAuthor} className="pure-button" href="javascript:void(0)">Add Author</a>
            <button className={buttonClass} type="submit" disabled={!this.state.canSubmit}>Submit</button>
          </fieldset>
        </Formsy.Form>
    </div>
    );
  }
});
