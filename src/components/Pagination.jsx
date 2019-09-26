import React from 'react'
import styled from 'styled-components'
import '@zendeskgarden/react-pagination/dist/styles.css'
import { ThemeProvider } from '@zendeskgarden/react-theming'
import { Pagination } from '@zendeskgarden/react-pagination'

const Container = styled.div``

export default ({ totalPages, currentPage, history }) => {
  return (
    <Container>
      <ThemeProvider>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          pagePadding={1}
          onChange={page => {
            history.push({
              pathname: history.location.pathname,
              search: `?page=${page}`,
            })}
        }
        />
      </ThemeProvider>
    </Container>
  )
}
