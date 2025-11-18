import Image from 'next/image'
import styled from 'styled-components'

const SearchImage = styled.div`
  position: relative;
  height: 20px;
  width: 20px;
  transition: all .5s;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
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
  :hover ${SearchImage} {
    transform: rotateZ(90deg);
    transition: all .5s;
  }
`

export default function SearchButton() {
  return (
    <SearchButtom type='submit'>
      <SearchImage>
        <Image
          src="/images/search.png"
          alt="Search"
          width={20}
          height={20}
        />
      </SearchImage>
    </SearchButtom>
  )
}
