var React = require('react')

module.exports = React.createClass({
  render: function(){
    var remove = this.props.scope.remove

    return <ul> {this.props.scope.test.map(function(el, index){
      return <li key={index} onClick={remove.bind(this, el)}> {el} </li>
    })} </ul>
  }
})
