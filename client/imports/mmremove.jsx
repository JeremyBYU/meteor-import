module.exports = React.createClass({
  render: function () {
    let divStyle = {
      display: '',
      background: 'rgb(202, 60, 60)'
    };
    let iconStyle = {
      color: '#fff',
    };
    if(this.props.hidden)(
      divStyle.display = "none"
    )
    return(
      <a onClick={this.props.clickHandler} className='pure-button' style={divStyle}>
        <i style={iconStyle} className="fa fa-times"></i>
      </a>
    );
  }
});
