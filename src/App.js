import React, { Component } from 'react'
import {
  CardColumns,
  Form,
  FormGroup,
  Input
} from 'reactstrap'
import _ from 'lodash'
import Navigation from './components/Navigation'
import Venue from './components/Venue'
import VenueFinder from './modules/VenueFinder'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

function getVenues () {
  this.finder.getVenues(this.state.radius, this.state.query)
    .then(results => {
      const items = results.response.groups[0].items
      this.setState({
        showingResults: items.length,
        total: results.response.totalResults,
        results: items.map((item) => {
          return (
            <Venue data={item.venue} key={item.venue.id} />
          )
        })
      })
    })
}

class App extends Component {
  constructor (props) {
    super(props)
    this.finder = new VenueFinder()
    this.state = {
      query: '',
      results: [],
      radius: 500,
      showingResults: 0,
      total: 0
    }
    this.getVenues = _.debounce(getVenues.bind(this), 300)
    this.getVenues()
  }
  printTerm (preffix) {
    if (this.state.query) {
      return (
        <span>{preffix} <strong>{this.state.query}</strong></span>
      )
    }
  }
  renderResults () {
    return this.state.results
  }
  render () {
    return (
      <div>
        <Navigation title='Foursquare API' />
        <div className='container'>
          <div className='text-center'>
            <h1 className='display-4'>Venue Finder</h1>
            <p className='lead mb-4'>Find venues near you</p>
            <Form className='mb-5' onSubmit={event => event.preventDefault()}>
              <FormGroup>
                <Input
                  type='text'
                  id='query'
                  placeholder='Search term...'
                  onChange={event => {
                    this.setState({ query: event.target.value })
                  }}
                  onKeyUp={event => {
                    this.getVenues()
                  }}
                  value={this.state.query}
                />
              </FormGroup>
              <FormGroup>
                <p className='range-field'>
                  <input
                    className='custom-range'
                    type='range'
                    id='slider'
                    min='1'
                    max='5000'
                    value={this.state.radius}
                    onChange={e => this.setState({radius: e.target.value})}
                    onMouseUp={e => this.getVenues()}
                  />
                </p>
              </FormGroup>
              <p>
                Showing <strong>{this.state.showingResults}</strong> of {this.state.total} venues found {this.printTerm('for')} within <strong>{this.state.radius}</strong>mts.
              </p>
            </Form>
          </div>
          <CardColumns>
            {this.renderResults()}
          </CardColumns>
        </div>
      </div>
    )
  }
}

export default App
