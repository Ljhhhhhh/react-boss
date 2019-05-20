import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

class UserCard extends Component {
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }

  handleClick(v) {
    this.props.history.push(`/chat/${v._id}`)
  }

  render() {
    const Header = Card.Header
    const Body = Card.Body
    return (
      <WingBlank>
      <WhiteSpace/>
        {
          this.props.userlist.map(v => (
            v.avatar ? (<Card key={v._id} style={{marginBottom: 10}} onClick={() => {this.handleClick(v)}}>
              <WhiteSpace/>
                <Header title={v.user} thumb={require(`../../static/img/${v.avatar}.png`)} extra={<span>{v.title}</span>} />
                <Body>
                {v.type === 'boss' ? <div>公司{v.company}</div> : null}
                {v.desc.split('\n').map(v => (
                  <div key={v}>{v}</div>
                ))}
                {v.type === 'boss' ? <div>薪资：{v.money}</div> : null}
                </Body>
            </Card>) : null
          ))
        }
      </WingBlank>
    );
  }
}

export default withRouter(UserCard);
