import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import Loading from '../../components/Loading'
import Cast from '../../components/Cast'
import { getMovieById } from '../../lib/tmdb'

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
  max-width: 540px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  font-family: 'Advent Pro', sans-serif;
  word-wrap: break-word;
  > div {
    word-wrap: break-word;
  }
`

const Modal = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 11px;
  border-radius: 10px;
  background-color: #050505d2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow: hidden;
  color: white;
  ${Description} div h2 {
    font-size: 32px;
    font-weight: bold;
    letter-spacing: 2px;
  }
  ${Description} div p {
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 1px;
  }
  @media screen and (max-width: 600px) {
    flex-direction: column;
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
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  position: relative;
  min-width: 300px;
  min-height: 450px;
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
  width: 50px;
  height: 24px;
  border-radius: 5px;
  overflow: hidden;
`

const Point = styled.h3`
  display: inline-block;
  margin: 0;
`

const Point2 = styled.span`
  display: inline-block;
  opacity: 0.4;
`

const Year = styled.span`
  padding: 0;
  margin: 0;
  margin-left: 10px;
  font-size: 12px;
  letter-spacing: 1px;
  color: tomato;
`

export default function Movie({ data, error }) {
  const router = useRouter()

  if (router.isFallback || !data) {
    return (
      <ModalContainer>
        <Loading />
      </ModalContainer>
    )
  }

  if (error) {
    return (
      <ModalContainer>
        <h3 style={{ color: '#FFF' }}>Error: {error}</h3>
      </ModalContainer>
    )
  }

  return (
    <>
      <Head>
        <title>{data.title} - Movie Details</title>
        <meta name="description" content={data.overview} />
      </Head>
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
                sizes="(max-width: 600px) 100vw, 300px"
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
              <Point>{data.vote_average}</Point>
              <Point2>/10</Point2>
            </ImdbContainer>
          </Description>
        </Modal>
      </ModalContainer>
    </>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params

  try {
    const data = await getMovieById(id)

    return {
      props: {
        data,
        error: null,
      },
    }
  } catch (error) {
    console.error('Error fetching movie:', error.message)
    return {
      props: {
        data: null,
        error: error.message,
      },
    }
  }
}
