import React from 'react'
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

const Loading = styled.div`
  width: 4em;
  height: 5em;
  border: 3px solid transparent;
  border-top-color: #fc2f70;
  border-bottom-color: #fc2f70;
  border-radius: 50%;
  animation: ${animation} 2s ease infinite;
`

export default () => <Loading />
