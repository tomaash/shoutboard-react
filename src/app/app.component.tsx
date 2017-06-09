import * as React from 'react'
import { NavLink } from 'react-router-dom'
import * as style from './app.css'

export class App extends React.Component<any, any> {

  renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default
      return (<DevTools />)
    }
  }

  render() {
    return <div className={style.container}>
      <h1>Shoutboard Application</h1>
      <div>
        <NavLink to='/home' activeClassName={style.active}>Home</NavLink>&nbsp;
        <NavLink to='/posts' activeClassName={style.active}>Posts</NavLink>
      </div>
      <div>
        {this.props.children}
        {this.renderDevTool()}
      </div>
    </div>
  }
}
