import React, { useState, useRef, useEffect, MouseEventHandler, memo } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faStar } from '@fortawesome/free-solid-svg-icons'
import { useModal } from 'react-hooks-use-modal'
import { MovieModal } from './MovieModal'
import requests from '../apis/requests'
import { instance } from '../apis/axios'
import { MovieDetail } from '../types/MovieDetail'

const hoverEasing = 'cubic-bezier(0.23, 1, 0.32, 1);'
const returnEasing = 'cubic-bezier(0.445, 0.05, 0.55, 0.95);'

const CardBg = styled.div.attrs<{ backgroundImageUrl: string, tX: number, tY: number }>(({ backgroundImageUrl, tX, tY }) => ({
  style: {
    backgroundImage: `url(${backgroundImageUrl})`,
    transform: `translateX(${tX}px) translateY(${tY}px)`
  }
})) <{ backgroundImageUrl: string, tX: number, tY: number }>`
  opacity: 0.5;
  position: absolute;
  top: -20px;
  left: -20px;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: 1s ${returnEasing}, opacity 5s 1s ${returnEasing};
  pointer-events: none;
`

const CardStyle = styled.div.attrs<{ rX: number, rY: number }>(({ rX, rY }) => ({
  style: {
    transform: `transform: rotateY(${rX}deg) rotateX(${rY}deg)`
  }
})) <{ rX: number, rY: number }>`
  position: relative;
  flex: 0 0 240px;
  width: 280px;
  height: 320px;
  background-color: #333;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 66%) 0 30px 60px 0, inset #333 0 0 0 5px, inset rgb(255 255 255 / 50%) 0 0 0 6px;
  transition: 1s ${returnEasing};
`

const CardInfo = styled.div`
  padding: 20px;
  position: absolute;
  bottom: 0;
  color: #fff;
  transform: translateY(40%);
  transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);

  p {
    opacity: 0;
    text-shadow: rgba(black, 1) 0 2px 3px;
    transition: 0.6s 1.6s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  h1 {
    font-family: 'Joan', serif;
    font-size: 28px;
    font-weight: 700;
    text-shadow: rgba(black, 0.5) 0 10px 10px;
  }

  * {
    position: relative;
    z-index: 1;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(#000, 0.6) 100%
    );
    background-blend-mode: overlay;
    opacity: 0;
    transform: translateY(100%);
    transition: 5s 1s ${returnEasing};
  }
`

const CardWrap = styled.div`
margin: 10px;
transform: perspective(800px);
transform-style: preserve-3d;
cursor: pointer;
  &:hover {
    ${CardInfo} {
      transform: translateY(0);
    }
    ${CardInfo} p {
      opacity: 1;
    }
    ${CardInfo},
    ${CardInfo} p {
      transition: 0.6s ${hoverEasing};
    }
    ${CardInfo}:after {
      transition: 5s ${hoverEasing};
      opacity: 1;
      transform: translateY(0);
    }
    ${CardBg} {
      transition: 0.6s ${hoverEasing}, opacity 5s ${hoverEasing};
      opacity: 0.8;
    }
    ${CardStyle} {
      transition: 0.6s ${hoverEasing}, box-shadow 2s ${hoverEasing};
      box-shadow: rgba(white, 0.2) 0 0 40px 5px, rgba(white, 1) 0 0 0 1px,
        rgba(black, 0.66) 0 30px 60px 0, inset #333 0 0 0 5px,
        inset white 0 0 0 6px;
    }
  }
`

const MovieInfo = styled.span`
  padding-left: 12px;
`
export const MovieItem = memo(({ movieId, movieImg, movieName, voteCount, movieRate }: { movieId: string, movieImg: string, movieName: string, voteCount: number, movieRate: number }) => {
  const cardDom = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [mouseLeaveDelay, setMouseLeaveDelay] = useState<any>(null)
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null)

  useEffect(() => {
    setWidth(cardDom.current?.offsetWidth!)
    setHeight(cardDom.current?.offsetHeight!)
    fetchMovieDetailById()
  }, [])

  const mousePX = () => mouseX / width
  const mousePY = () => mouseY / height

  //MouseEvent
  const handleMouseMove: MouseEventHandler = (e) => {
    setMouseX(e.pageX - cardDom.current?.offsetLeft! - width / 2)
    setMouseY(e.pageY - cardDom.current?.offsetTop! - height / 2)
  }
  const handleMouseEnter = () => {
    clearTimeout(mouseLeaveDelay)
  }
  const handleMouseLeave = () => {
    setMouseLeaveDelay(setTimeout(() => {
      setMouseX(0)
      setMouseY(0)
    }, 1000))
  }
  const handleOnClick = async () => {
    await fetchMovieDetailById()
    console.log(movieDetail)
    open()
  }

  //Modal
  const [Modal, open, close] = useModal('root', {
    closeOnOverlayClick: false
  })

  //GetMovieDetail By MovieId
  const fetchMovieDetailById = async () => {
    const request = await instance.get(`/movie/${movieId}${requests.fetchDetails}`)
    setMovieDetail(request.data)
  }

  const imageBaseUrl = 'https://image.tmdb.org/t/p/original/'

  return (
    <div>
      <CardWrap ref={cardDom} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => handleOnClick()}>
        <CardStyle rX={mousePX() * 30} rY={mousePY() * -30}>
          <CardBg backgroundImageUrl={movieImg} tX={mousePX() * -40} tY={mousePY() * -40} />
          <CardInfo>
            <h1>{movieName}</h1>
            <p><FontAwesomeIcon icon={faEye} /><MovieInfo>{voteCount}</MovieInfo></p>
            <p><FontAwesomeIcon icon={faStar} /><MovieInfo>{movieRate.toFixed(1)}</MovieInfo></p>
          </CardInfo>
        </CardStyle>
      </CardWrap>
      <Modal>
        <MovieModal
          title={movieDetail?.original_title}
          genres={movieDetail?.genres}
          backdropImg={`${imageBaseUrl}${movieDetail?.backdrop_path}`}
          posterImg={`${imageBaseUrl}${movieDetail?.poster_path}`}
          overview={movieDetail?.overview}
          closeModal={close} />
      </Modal>
    </div>
  )
})