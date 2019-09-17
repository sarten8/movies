import React from 'react'
import styled from 'styled-components'
import '@zendeskgarden/react-pagination/dist/styles.css'
import { ThemeProvider } from '@zendeskgarden/react-theming'
import { Pagination } from '@zendeskgarden/react-pagination'

const Container = styled.div``

export default ({ totalPages, currentPage, changePage, history }) => {
  return (
    <Container>
      <ThemeProvider>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          pagePadding={0}
          onChange={page => {
            window.scroll(0,0)
            history.push({
              pathname: '/movies',
              search: `?page=${page}`,
            })}
        }
        />
      </ThemeProvider>
    </Container>
  )
}
