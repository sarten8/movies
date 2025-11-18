import { useRouter } from 'next/router'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
  font-family: 'Advent Pro', sans-serif;
`

const Button = styled.button`
  padding: 8px 12px;
  background: ${props => props.active ? '#fc2f70' : 'transparent'};
  color: white;
  border: 1px solid #fc2f70;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background: #fc2f70;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const PageInfo = styled.span`
  color: white;
  font-size: 14px;
  margin: 0 10px;
`

export default function Pagination({ totalPages, currentPage }) {
  const router = useRouter()

  const handlePageChange = (page) => {
    const pathname = router.pathname
    router.push({
      pathname,
      query: { ...router.query, page },
    })
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    let startPage = Math.max(1, currentPage - 2)
    let endPage = Math.min(totalPages, startPage + maxVisible - 1)

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1)
    }

    if (startPage > 1) {
      pages.push(
        <Button key={1} onClick={() => handlePageChange(1)}>
          1
        </Button>
      )
      if (startPage > 2) {
        pages.push(<PageInfo key="ellipsis1">...</PageInfo>)
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<PageInfo key="ellipsis2">...</PageInfo>)
      }
      pages.push(
        <Button key={totalPages} onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </Button>
      )
    }

    return pages
  }

  return (
    <Container>
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      {renderPageNumbers()}
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </Container>
  )
}
