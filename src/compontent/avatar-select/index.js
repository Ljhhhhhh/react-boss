import React, {Component} from 'react'
import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelect extends Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {}
  }
  render () {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'.split(',').map(v => ({
      icon: require(`../../static/img/${v}.png`),
      text: v
    }))
    const state = this.state
    const gridHeader = state.text 
     ? (
       <div><span>已选头像</span><img width={{width: 20}} src={state.icon} alt="avatar"/></div>
       ) : <div>请选择头像</div>

    return (
      <div>
        <List renderHeader={() => gridHeader}>
        <Grid data={avatarList} columnNum={5} onClick={elm => {
          this.setState(elm)
          this.props.selectAvatar(elm.text)
        }} />
        </List>
      </div>
    )
  }
}

export default AvatarSelect;