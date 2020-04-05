import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

class PlayerListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <li>{this.props.name}</li>
    )
  }
};

export default connect(null)(PlayerListItem)