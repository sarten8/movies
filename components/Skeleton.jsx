'use client'

import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    #1a1a1a 25%,
    #2a2a2a 50%,
    #1a1a1a 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  border-radius: ${props => props.$radius || '4px'};
`

// Skeleton for movie cards
const CardSkeleton = styled(SkeletonBase)`
  height: 300px;
  width: 100%;
  border-radius: 8px;
`

// Skeleton for text lines
const TextSkeleton = styled(SkeletonBase)`
  height: ${props => props.$height || '16px'};
  width: ${props => props.$width || '100%'};
  margin-bottom: ${props => props.$mb || '8px'};
`

// Skeleton for poster/cover
const PosterSkeleton = styled(SkeletonBase)`
  width: 100%;
  height: 100%;
  min-height: 375px;
  border-radius: 5px;

  @media screen and (max-width: 600px) {
    min-height: 450px;
  }

  @media screen and (min-width: 1200px) {
    min-height: 600px;
  }
`

// Skeleton for cast avatar
const AvatarSkeleton = styled(SkeletonBase)`
  width: 80px;
  height: 80px;
  border-radius: 50%;

  @media screen and (min-width: 1200px) {
    width: 100px;
    height: 100px;
  }
`

// Skeleton for score badge
const ScoreSkeleton = styled(SkeletonBase)`
  width: 50px;
  height: 30px;
  border-radius: 6px;
`

// Container for card skeleton with overlay effect
const CardSkeletonContainer = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
`

const CardSkeletonOverlay = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  z-index: 2;
`

// Movie Card Skeleton Component
export function MovieCardSkeleton() {
  return (
    <CardSkeletonContainer>
      <CardSkeleton />
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <ScoreSkeleton />
      </div>
      <CardSkeletonOverlay>
        <TextSkeleton $width="40%" $height="12px" $mb="8px" />
        <TextSkeleton $width="80%" $height="15px" $mb="0" />
      </CardSkeletonOverlay>
    </CardSkeletonContainer>
  )
}

// Cast Person Skeleton Component
const PersonSkeletonContainer = styled.div`
  margin-right: 8px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export function PersonSkeleton() {
  return (
    <PersonSkeletonContainer>
      <AvatarSkeleton />
      <TextSkeleton $width="70px" $height="12px" $mb="0" style={{ marginTop: '11px' }} />
    </PersonSkeletonContainer>
  )
}

// Movies Grid Skeleton Component
const GridSkeleton = styled.div`
  margin: 0;
  padding: 20px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }
`

export function MoviesGridSkeleton({ count = 10 }) {
  return (
    <GridSkeleton>
      {Array.from({ length: count }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </GridSkeleton>
  )
}

// Cast Section Skeleton Component
const CastSkeletonContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 22px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  @media screen and (min-width: 600px) {
    justify-content: flex-start;
  }
`

export function CastSkeleton({ count = 6 }) {
  return (
    <CastSkeletonContainer>
      {Array.from({ length: count }).map((_, index) => (
        <PersonSkeleton key={index} />
      ))}
    </CastSkeletonContainer>
  )
}

// Movie Detail Skeleton Component
const DetailSkeletonContainer = styled.div`
  margin: 0;
  margin-top: 30px;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-bottom: 50px;
`

const DetailSkeletonModal = styled.div`
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
  max-width: 1200px;
  width: 100%;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    padding: 15px;
    align-items: center;
  }

  @media screen and (min-width: 1200px) {
    padding: 30px;
  }
`

const DetailPosterContainer = styled.div`
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
  flex-shrink: 0;

  @media screen and (max-width: 600px) {
    width: 100%;
    max-width: 100%;
  }
`

const DetailDescriptionContainer = styled.div`
  margin: 10px;
  padding: 0;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;

  @media screen and (max-width: 600px) {
    width: 100%;
  }

  @media screen and (min-width: 1200px) {
    max-width: 700px;
  }
`

export function MovieDetailSkeleton() {
  return (
    <DetailSkeletonContainer>
      <DetailSkeletonModal>
        <DetailPosterContainer>
          <PosterSkeleton />
        </DetailPosterContainer>
        <DetailDescriptionContainer>
          <div>
            <TextSkeleton $width="70%" $height="38px" $mb="15px" />
            <TextSkeleton $width="100%" $height="20px" $mb="10px" />
            <TextSkeleton $width="100%" $height="20px" $mb="10px" />
            <TextSkeleton $width="100%" $height="20px" $mb="10px" />
            <TextSkeleton $width="60%" $height="20px" $mb="10px" />
          </div>
          <CastSkeleton count={6} />
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <SkeletonBase style={{ width: '55px', height: '26px', borderRadius: '5px', marginRight: '10px' }} />
            <TextSkeleton $width="80px" $height="20px" $mb="0" />
          </div>
        </DetailDescriptionContainer>
      </DetailSkeletonModal>
    </DetailSkeletonContainer>
  )
}

export default SkeletonBase
