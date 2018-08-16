import {Component} from 'react'
import {observable} from 'mobx'
import {observer} from 'mobx-react'
import sift from 'sift'

import sync from '../utils/sync'
// import app from '../utils/feathers'

function getOptions(props) {
  let {query, sifter, id} = props
  const options = {}

  if (query) {
    options.query = query
    options.publication = sift(sifter || query)
  }

  if (id) {
    id = parseInt(id, 10) || id

    options.query = {id}
    options.publication = sift({id})
  }

  return options
}

@observer
export default class Query extends Component {
  @observable
  data = []

  @observable
  loading = true

  @observable
  error = false

  async componentDidMount() {
    await this.setup()
  }

  setup = async () => {
    const options = getOptions(this.props)
    let {service, id} = this.props

    options.subscriber = (records, {action, ...event}) => {
      this.data = id ? records[0] : records

      console.log(`[> Sync ${service}]`, action, records, event)
    }

    this.sync = await sync(service, options)
    this.loading = false
  }

  async componentDidUpdate(prev) {
    if (this.props.id !== prev.id || this.props.query !== prev.query) {
      console.log('Query or ID Updated. Re-syncing...', this.props)

      await this.sync.disconnect()
      await this.setup()
    }
  }

  componentWillUnmount() {
    this.sync.disconnect()
  }

  render() {
    const {id, children} = this.props
    const data = this.data

    const isLoading = (id && data && !data.id) || this.loading

    return children(data, isLoading, this.error)
  }
}
