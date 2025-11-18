import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'
import Loading from '../../components/Loading'
import Pagination from '../../components/Pagination'
import { getTrendingMovies } from '../../lib/tmdb'

const TrendingTitle = styled.h1`
  margin: 0;
  margin-top: 30px;
  margin-bottom: 20px;
  padding: 0 10px;
  padding-bottom: 35px;
  display: block;
  font-family: 'Raleway', monospace, sans-serif;
  font-size: 36px;
  font-weight: 900;
  color: white;
  text-align: center;
  border-bottom: 1px dotted white;
  border-bottom-width: 7px;
  border-bottom-right-radius: 90%;
  background: -webkit-linear-gradient(7deg, white, white, #202020);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media (min-width: 380px) {
    font-size: 48px;
  }
  @media (min-width: 720px) {
    font-size: 52px;
  }
`

const Contratapa = styled.div`
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-image: linear-gradient(
    to right top,
    #050505,
    #050505cc,
    #3d2b3acc,
    #844b5acc,
    #c87462cc,
    #f4af60cc,
    #f9f871cc
  );
  z-index: 9997;
  transition: all 0.5s;
`

const ImageContainer = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
  transition: 0.6s;
`

const MoviesContainer = styled.div`
  margin: 0;
  width: 99%;
  max-width: 99%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0;
  padding: 10px;
  width: 180px;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 34px;
  letter-spacing: -2px;
  color: white;
  text-align: center;
`

const MoviesContent = styled.div`
  margin: 0;
  margin-top: 20px;
  padding: 20px;
  max-width: 100%;
  height: auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`

const Card = styled.div`
  margin: 25px;
  padding: 0;
  height: 300px;
  width: 200px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.5s;
  overflow: hidden;
  position: relative;
  &:hover ${Contratapa} {
    display: flex;
    transition: all 0.5s;
  }
  &:hover ${ImageContainer} {
    transform: scale(1.1);
    transition: all 0.5s;
  }
`

export default function Movies({ data, error }) {
  if (error) {
    return (
      <MoviesContainer>
        <h3 style={{ color: '#FFF', marginTop: '50px' }}>Error: {error}</h3>
      </MoviesContainer>
    )
  }

  if (!data) {
    return (
      <MoviesContainer>
        <Loading />
      </MoviesContainer>
    )
  }

  return (
    <>
      <Head>
        <title>Trending Movies This Week</title>
        <meta name="description" content="Discover the most trending movies this week" />
      </Head>
      <MoviesContainer>
        <TrendingTitle>Trending week</TrendingTitle>
        <MoviesContent>
          {data.results.map((movie, index) => (
            <Link key={movie.id || index} href={`/movies/${movie.id}`}>
              <Card>
                <Contratapa>
                  <Title>{movie.title}</Title>
                </Contratapa>
                <ImageContainer>
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      sizes="200px"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: '#333' }} />
                  )}
                </ImageContainer>
              </Card>
            </Link>
          ))}
        </MoviesContent>
        {data && (
          <Pagination
            totalPages={Math.min(data.total_pages, 500)}
            currentPage={data.page}
          />
        )}
      </MoviesContainer>
    </>
  )
}

export async function getServerSideProps(context) {
  const { page = 1 } = context.query

  try {
    const data = await getTrendingMovies(page)

    return {
      props: {
        data,
        error: null,
      },
    }
  } catch (error) {
    console.error('Error fetching trending movies:', error.message)
    return {
      props: {
        data: null,
        error: error.message,
      },
    }
  }
}
