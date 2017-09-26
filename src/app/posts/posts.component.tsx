import * as React from 'react'
import { inject, observer, Provider } from 'mobx-react'
import { observable, action } from 'mobx'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card'
import { NavLink } from 'react-router-dom'
import { Button } from 'react-toolbox/lib/button'
import { PostsStore } from './posts.store'
import { AppStore } from '../app.store'
import * as style from './posts.css'
import * as appStyle from '../app.css'

@observer
export class Posts extends React.Component<any, any> {

  postsStore: PostsStore
  componentWillMount() {
    this.postsStore = new PostsStore()
    this.postsStore.initializePosts()
  }

  componentWillUnmount() {
    this.postsStore.destructor()
  }

  render() {
    return <Provider postsStore={this.postsStore}>
      <PostsComponent />
    </Provider>
  }
}

interface PostsComponentProps {
  appStore?: AppStore,
  postsStore?: PostsStore
}

@inject('appStore', 'postsStore')
@observer
export class PostsComponent extends React.Component<PostsComponentProps, any> {
  render() {
    const { postsStore, appStore } = this.props
    return <div>
      <NavLink to='form'>
        <Button icon='add' floating accent className={appStyle.floatRight} />
      </NavLink>
      <h3>Hello {appStore.username}</h3>
      {postsStore.posts.map(post =>
        <Card key={post.id} className={style.messageCard}>
          <CardTitle
            title={post.title}
            subtitle={post.name}
          />
          <CardText>{post.message}</CardText>
        </Card>
      )}
    </div>
  }
}
