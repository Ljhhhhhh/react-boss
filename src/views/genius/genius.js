import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser'
import UserCard from '../../compontent/usercard'

class Genius extends Component {
  componentDidMount() {
    // const {type} = this.props.user
    this.props.getUserList('genius')
  }
  render() {
    return <UserCard userlist={this.props.userlist} />
  }
}

export default connect(
  state => state.chatuser,
  {getUserList}
)(Genius);
