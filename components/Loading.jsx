'use client'

import styled, { keyframes } from 'styled-components'

const animation = keyframes`
  50% {
    transform: rotate(360deg) scale(0.4, 0.33);
    border-width: 8px;
  }
  100% {
    transform: rotate(720deg) scale(1, 1);
    border-width: 3px;
  }
`

const LoadingSpinner = styled.div`
  width: 5em;
  height: 5em;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top-color: #fc2f70;
  border-bottom-color: #fc2f70;
  border-radius: 50%;
  animation: ${animation} 2s ease infinite;
`

export default function Loading() {
  return <LoadingSpinner />
}
