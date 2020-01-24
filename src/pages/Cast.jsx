import React, { Fragment, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { fetchCast as fetchCastActionCreator } from '../actions/cast/fetchCast'
import Person from '../components/Person'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
const Cast = ({ fetchCast }) => {
  const { cast } = useSelector(state => state)
  const { loading, error, data } = cast

  useEffect(() => {
    fetchCast()
  }, [])

  return (
    <Container>
      {loading ? (
        ''
      ) : error ? (
        ''
      ) : data ? (
        <Fragment>
          {
            data.cast.slice(0, 10).map(c => <Person avatar={c.profile_path} name={c.name} />)
          }
        </Fragment>
      ) : (
        ''
      )}
      </Container>
  )
}

const mapStateToProps = state => ({
  loading: state.cast.loading,
  error: state.cast.error,
  data: state.cast.data,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchCast: () => dispatch(fetchCastActionCreator(ownProps.movie)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cast)
