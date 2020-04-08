import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

class PlayerListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <li>
        <span>{this.props.name}</span>
        <span>
          <button>Ready?</button>
        </span>
      </li>
    )
  }
};

export default connect(null)(PlayerListItem)