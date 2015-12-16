module.exports = React.createClass({
  render: function () {
    let divStyle = {
      display: '',
      background: 'rgb(202, 60, 60)'
    };
    let iconStyle = {
      color: '#fff',
    };
    if(this.props.numAuthors < 2)(
      divStyle.display = "none"
    )
    return(
      <a className='pure-button' style={divStyle}>
        <i style={iconStyle} className="fa fa-times"></i>
      </a>
    );
  }
});
