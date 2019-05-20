import React, { Component } from 'react';
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import { createForm } from 'rc-form';
import { getMsgList, sendMsg, recvMsg, readMsg } from "../../redux/chat";
import {getChatId}  from '../../utils/util'
import AuthRoute from "../../compontent/authroute";
import emoji from '../../utils/emoji'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fixCarousel = this.fixCarousel.bind(this)
    this.addEmoji = this.addEmoji.bind(this)
    this.state = {
      msg: [],
      emoji: [],
      showEmoji: false
    }
  }
  
  componentDidMount() {
    let emojiOrigin = []
    emojiOrigin = emoji.map(v => ({text: v}))
    this.setState({
      emoji: emojiOrigin
    })
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }

  componentWillUnmount() {
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }

  handleSubmit() {
    const {text} = this.props.form.getFieldsValue();
    const from = this.props.user._id
    const to = this.props.match.params.user
    this.props.sendMsg({from, to, msg: text})
    this.props.form.resetFields();
  }

  fixCarousel() {
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'))
    }, 0)
  }

  addEmoji(el) {
    const {getFieldsValue, setFieldsValue} = this.props.form;
    const {text} = getFieldsValue();
    setFieldsValue({
      text: text + el.text
    })
  }

  render() {
    const { getFieldProps } = this.props.form;
    const userid = this.props.match.params.user;
    const Item = List.Item
    const users = this.props.chat.users
    if (!users[userid]) {
      return null
    }
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid)
    return (
      <div id="chat-page">
        <NavBar mode="dark" icon={<Icon type="left" />} onLeftClick={() => this.props.history.goBack()} >
          {users[userid].name}
        </NavBar>
        {
          chatmsgs.map(v => {
            const avatar = require(`../../static/img/${users[v.from].avatar}.png`)
            return v.from === userid ? (
              <List key={v._id}>
                <Item thumb={avatar} >{v.content}</Item>
              </List>
            ) : (
              <List key={v._id}>
                <Item extra={<img alt="avatar" src={avatar}/>} className="chat-me">{v.content}</Item>
              </List>
            )
          })
        }
        <div className="stick-footer">
          <List>
            <InputItem
            placeholder="请输入"
            {...getFieldProps('text', {
              initialValue: ''
            })}
            extra={
              <div>
                <span style={{marginRight: 15}} onClick={() => {
                  this.setState({
                    showEmoji: !this.state.showEmoji
                  }, function() {
                    this.fixCarousel()
                  })
                }}>😏</span>
                <span onClick={() => this.handleSubmit()} >发送</span>
              </div>
            }
            />
          </List>
          {
            this.state.showEmoji ? <Grid data={this.state.emoji} columnNum={9} carouselMaxRow={4} isCarousel={true} onClick={el => this.addEmoji(el)} /> : null
          }
        </div>
      </div>
    );
  }
}

export default connect(
  state => state,
  {getMsgList, sendMsg, recvMsg, readMsg}
)(createForm()(AuthRoute(Chat)));
