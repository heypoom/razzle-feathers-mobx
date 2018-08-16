import React, {Component} from 'react'
import styled from 'react-emotion'
import {inject, observer} from 'mobx-react'

// import app from '../utils/feathers'

// import Query from '../common/Query'

// import {Link} from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 100vh;
  border: 20px solid #2d2d30;
`

const Heading = styled.h1`
  font-weight: 300;
  font-size: 3.8em;
  color: #333;
`

@inject('landing')
@observer
export default class Landing extends Component {
  render() {
    // const {data, landing} = this.props

    return (
      <Container>
        <h1 className="is-size-1">
          <strong>RAZZLE</strong>
          TEMPLATE
        </h1>
      </Container>
    )
  }
}
