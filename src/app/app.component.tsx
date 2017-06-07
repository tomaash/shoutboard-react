import * as React from 'react'
import { Link } from 'react-router-dom'
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
        <Link to='home'>Home</Link>&nbsp;
        <Link to='posts'>Posts</Link>
      </div>
      <div>
        {this.props.children}
        {this.renderDevTool()}
      </div>
    </div>
  }
}
