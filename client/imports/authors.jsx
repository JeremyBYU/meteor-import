let Author = require('./author.jsx');
let MyRemoveButton = require('./mmremove.jsx');
let Authors = React.createClass({
  genName(s1,s2 = undefined){
    if(s2 === undefined)
      return `authors.${s1}`;
    else {
      return `authors.${s1}.${s2}`;
    }
  },
  render() {
    console.log("AuthorS render called")
    let authors = [];
    let hidden = false;
    this.props.num === 1 ? hidden = true : hidden = false
    for(let i = 0; i < this.props.num; i++){
      let keyAuthor = this.genName(i);
      authors.push(<tr key={keyAuthor} ><td> <MyRemoveButton clickHandler={this.props.clickHandler.bind(null,i)} hidden={hidden} index={keyAuthor}/> </td><Author index={i} validationContext={this.props.validationContext}/></tr>)
    }
    return (
      <table className="pure-table pure-table-horizontal">
        <thead>
          <tr>
            <th></th>
            <th>Authors</th>
          </tr>
        </thead>
        <tbody>
          {authors}
        </tbody>
      </table>
    );
  }
});
module.exports = Authors;
