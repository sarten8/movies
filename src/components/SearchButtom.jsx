import React from 'react'
import styled from 'styled-components'
import search from "../utils/images/search.png";

const SearchImage = styled.img`
  height: 20px;
  width: 20px;
  transition: all .5s;
  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */
  user-select: none;          /* Likely future */      
`

const SearchButtom = styled.button`
  position: absolute;
  right: 10px;
  height: 50px;
  width: 50px;
  background: linear-gradient(45deg, tomato, purple);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  border: 0;
  transition: all .5s;
  outline: none;
  :hover > ${SearchImage} {
    transform: rotateZ(90deg);
    transition: all .5s;
  }
  
`

export default () => (
  <SearchButtom type='submit'>
    <SearchImage src={search} />
  </SearchButtom>
)