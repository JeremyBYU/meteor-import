let Formsy = require('../../node_modules/formsy-react');  //no freaking clue why I need to do it this way
let MyOwnInput = require('./myinput.jsx');
let Authors = require('./authors.jsx');
let Form2Obj = require('form-data-to-object');

let MmForm = React.createClass({
  getInitialState: function () {
    return {
      canSubmit: false,
      validationContext: Schemas.Book.namedContext("createBookForm"),
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
  addAuthor(){
    let numAuthors = this.state.numAuthors;
    this.setState({numAuthors: numAuthors + 1});
  },
  removeAuthor(index){
    let numAuthors = this.state.numAuthors;
    this.setState({numAuthors: numAuthors -1});
    //Basically if the deleted Author is not the last in the array, we need to do this tricky stuff below
    if(index+1 !== numAuthors){
      //Dummy model until we get Formsy.getModel working
      let model = {title: 'j1', publisher: 'j2', authors: [{fname:"1",lname:"1"},{fname:"2",lname:"2"}]};
      //  let authors = model.authors.slice(); //make a copy, something about best pracice immuttable data, yada yada
      model.authors.splice(index,1); //remove index
      //  model.authors = authors; //re assign
      let formKeys = Form2Obj.fromObj(model);
      this.refs.form.resetModel(formKeys)
    }
  },
  render() {
    console.log('Render MmForm called')
    let baseButtonClass = 'pure-button';
    let disabledButtonClass = 'pure-button-disabled';
    let buttonClass = this.state.canSubmit ? baseButtonClass : this.appendClass(baseButtonClass,disabledButtonClass);

    let titleErrMsg = this.state.validationContext.keyErrorMessage("title");
    let pubErrMsg = this.state.validationContext.keyErrorMessage("publisher");

    return (
      <div>
        <h2> Book Form </h2>
        <Formsy.Form ref="form" className="pure-form pure-form-stacked" onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
          <fieldset>
            <legend>Add a book!</legend>
            <MyOwnInput name="title" validations="validateKey:title" label="Title" validationError={titleErrMsg} required/>
            <MyOwnInput name="publisher" validations="validateKey:publisher" label="Publisher" validationError={pubErrMsg} required/>
            <Authors clickHandler={this.removeAuthor} validationContext={this.state.validationContext} num={this.state.numAuthors}/>
            <a onClick={this.addAuthor} className={baseButtonClass} href="javascript:void(0)">Add Author</a>
            <button className={buttonClass} type="submit" disabled={!this.state.canSubmit}>Submit</button>
          </fieldset>
        </Formsy.Form>
    </div>
    );
  }
});
module.exports = MmForm;
