import React, { Component } from 'react';
import PropTypes from "prop-types";
import {TabBar} from 'antd-mobile'
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux'

class NavLink extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired
  }
  render() {
		const navList = this.props.data.filter(v => !v.hide)
    const {pathname} = this.props.location
		return (
			<TabBar>
				{navList.map(v=>(
					<TabBar.Item
						badge={v.path === '/msg' ? this.props.unread : null}
						key={v.path}
						title={v.text}
						icon={{uri: require(`../../static/img/navimg/${v.icon}.png`)}}
						selectedIcon={{uri: require(`../../static/img/navimg/${v.icon}-active.png`)}}
						selected={pathname===v.path}
						onPress={()=>{
							this.props.history.push(v.path)
						}}
					>
					
					</TabBar.Item>
				))}
			</TabBar>
		)
  }
}

export default connect(
	state => state.chat
)(withRouter(NavLink));
