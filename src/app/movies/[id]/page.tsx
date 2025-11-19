'use client'

import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import styled from 'styled-components'
import useSWR from 'swr'
import Cast from '../../../../components/Cast'
import { MovieDetailSkeleton } from '../../../../components/Skeleton'

const ModalContainer = styled.div`
  margin: 0;
  margin-top: 30px;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-bottom: 50px;
`

const Description = styled.div`
  margin: 10px;
  padding: 0;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  word-wrap: break-word;
  > div {
    word-wrap: break-word;
  }
  @media screen and (max-width: 600px) {
    width: 100%;
  }
  @media screen and (min-width: 1200px) {
    max-width: 700px;
  }
`

const Modal = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #050505d2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  color: white;
  max-width: 1200px;
  ${Description} div h2 {
    font-size: 38px;
    font-weight: bold;
    letter-spacing: 2px;
    margin-bottom: 15px;
  }
  ${Description} div p {
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 0.3px;
    line-height: 1.7;
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
    padding: 15px;
    align-items: center;
    ${Description} div h2 {
      font-size: 28px;
    }
    ${Description} div p {
      font-size: 15px;
      font-weight: 400;
      line-height: 1.6;
    }
  }
  @media screen and (min-width: 1200px) {
    padding: 30px;
    ${Description} div h2 {
      font-size: 44px;
    }
    ${Description} div p {
      font-size: 20px;
      font-weight: 400;
      line-height: 1.7;
    }
  }
`

const Close = styled.div`
  position: absolute;
  right: 30px;
  top: -10px;
  width: 32px;
  height: 32px;
  transition: all 0.3s;
  cursor: pointer;
  z-index: 10;
  :hover {
    transform: rotateZ(90deg);
    transition: all 0.6s;
  }
  ::before {
    content: '';
    position: absolute;
    top: 15px;
    right: 0;
    width: 25px;
    border: 1px solid;
    border-image-source: linear-gradient(
      to bottom,
      #ffaf7b,
      rgb(204, 215, 109),
      rgb(97, 113, 28)
    );
    border-image-slice: 1;
    transform: rotate(45deg);
    transition: 0.3s;
  }
  ::after {
    content: '';
    position: absolute;
    top: 15px;
    right: 0;
    width: 25px;
    border: 1px solid;
    border-image-source: linear-gradient(
      to bottom,
      #ffaf7b,
      rgb(204, 215, 109),
      rgb(97, 113, 28)
    );
    border-image-slice: 1;
    transform: rotate(-45deg);
    transition: 0.3s;
  }
`

const Cover = styled.div`
  margin: 10px;
  padding: 0;
  border-radius: 5px;
  width: 50%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  position: relative;
  min-height: 450px;
  flex-shrink: 0;
  @media screen and (max-width: 600px) {
    width: 100%;
    max-width: 100%;
    min-height: 450px;
    margin: 0;
    margin-bottom: 15px;
  }
  @media screen and (min-width: 1200px) {
    min-height: 600px;
  }
`

const Star = styled.span`
  margin-right: 5px;
  background: #3a1c71;
  background: -webkit-linear-gradient(
    to bottom,
    #ffaf7b,
    rgb(204, 215, 109),
    rgb(97, 113, 28)
  );
  background: linear-gradient(
    to bottom,
    #ffaf7b,
    rgb(204, 215, 109),
    rgb(97, 113, 28)
  );
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
`

const ImdbContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`

const Imdb = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 10px;
  width: 55px;
  height: 26px;
  border-radius: 5px;
  overflow: hidden;
  @media screen and (min-width: 1200px) {
    width: 65px;
    height: 30px;
  }
`

const Point = styled.h3`
  display: inline-block;
  margin: 0;
  font-size: 20px;
  @media screen and (min-width: 1200px) {
    font-size: 24px;
  }
`

const Point2 = styled.span`
  display: inline-block;
  opacity: 0.4;
  font-size: 18px;
  @media screen and (min-width: 1200px) {
    font-size: 22px;
  }
`

const Year = styled.span`
  padding: 0;
  margin: 0;
  margin-left: 10px;
  font-size: 16px;
  letter-spacing: 1px;
  color: tomato;
  @media screen and (min-width: 1200px) {
    font-size: 18px;
  }
`

interface MovieData {
  id: number
  title: string
  overview: string
  poster_path: string | null
  release_date: string
  vote_average: number
}

export default function Movie() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const { data, error, isLoading } = useSWR<MovieData>(
    id ? `/api/movies/${id}` : null,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutos de caché
    }
  )

  if (isLoading || !data) {
    return <MovieDetailSkeleton />
  }

  if (error) {
    return (
      <ModalContainer>
        <h3 style={{ color: '#FFF' }}>Error: {error.message}</h3>
      </ModalContainer>
    )
  }

  return (
    <ModalContainer>
      <Modal>
        <Close
          onClick={(e) => {
            e.preventDefault()
            router.back()
          }}
        />
        <Cover>
          {data.poster_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
              alt={data.title}
              fill
              sizes="(max-width: 600px) 250px, (max-width: 1200px) 300px, 400px"
              style={{ objectFit: 'contain', borderRadius: '5px' }}
              priority
            />
          )}
        </Cover>
        <Description>
          <div>
            <h2>
              {data.title}
              {data.release_date && (
                <Year>{data.release_date.substring(0, 4)}</Year>
              )}
            </h2>
            <p>{data.overview}</p>
          </div>
          <Cast movieId={data.id} />
          <ImdbContainer>
            <Imdb>
              <Image
                src="/images/IMDb.png"
                alt="IMDb"
                fill
                sizes="50px"
                style={{ objectFit: 'contain' }}
              />
            </Imdb>
            <Star>&#x2605; </Star>
            <Point>{data.vote_average.toFixed(1)}</Point>
            <Point2>/10</Point2>
          </ImdbContainer>
        </Description>
      </Modal>
    </ModalContainer>
  )
}
