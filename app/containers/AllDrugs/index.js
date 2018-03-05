/*
 *
 * AllDrugs
 *
 */

import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Helmet from 'react-helmet'
import { FormattedMessage } from 'react-intl'
import qs from 'query-string'
import { createStructuredSelector } from 'reselect'
import makeSelectAllDrugs from './selectors'
import ListDrugs from '../../components/ListDrugs'
import messages from './messages'
import PageHeader from '../../components/PageHeader'

export class AllDrugs extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super()
    this.state = {
      navigation: {
        orderBy: 'name_ASC',
        limit: 20,
        page: 0,
      },
    }
    this.handlePagination = this.handlePagination.bind(this)
    this.updateQuery = this.updateQuery.bind(this)
  }
  updateQuery() {
    const query = qs.stringify(this.state.navigation)
    browserHistory.push({
      pathname: '/drugs',
      search: `?${query}`,
    })
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('updated')
    if (prevState !== this.state) {
      this.updateQuery()
    }
  }
  handlePagination(page) {
    const navigation = this.state.navigation
    navigation.page = page
    this.setState({
      navigation,
    })
  }
  render() {
    const nav = this.props.location.search !== '' ? this.props.location.query : this.state.navigation
    const currentPage = Number(nav.page)
    const limit = Number(nav.limit)
    const skip = limit * (currentPage)
    const pages = []
    if (!this.props.data.loading) {
      for (let i = 0; i < Math.ceil(this.props.data._allDrugsMeta.count / limit); i += 1) {
        pages.push(i + 1)
      }
    }
    return (
      <div>
        <Helmet
          title="AllDrugs"
          meta={[
            { name: 'description', content: 'Description of AllDrugs' },
          ]}
        />
        <PageHeader>
          <FormattedMessage {...messages.header} />
        </PageHeader>
        <section className="py-4">
          <div className="container">
            <ListDrugs limit={limit} orderBy={nav.orderBy} skip={skip} />
            <nav aria-label="Page navigation example">
              <ul className="pagination list-unstyled">
                <li className="page-item"><button disabled={currentPage === 0} onClick={() => this.handlePagination(currentPage - 1)} className="page-link" href="#">Anterior</button></li>
                { pages.map((page) => (
                  <li className={`page-item ${currentPage === (page - 1) ? 'active' : ''}`}><button onClick={() => this.handlePagination(page - 1)} className="page-link" href="#">{page}</button></li>
                  ))
                }
                <li className="page-item"><button onClick={() => this.handlePagination(currentPage + 1)} className="page-link" href="#">Próximo</button></li>
              </ul>
            </nav>
          </div>
        </section>
      </div>
    )
  }
}

AllDrugs.propTypes = {
  data: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
  AllDrugs: makeSelectAllDrugs(),
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

const Drugs = gql`
  query {
    _allDrugsMeta {
      count
    }
  }
`

export default graphql(Drugs)(connect(mapStateToProps, mapDispatchToProps)(AllDrugs))
