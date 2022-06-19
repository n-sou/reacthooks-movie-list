import { MouseEventHandler } from "react"
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const MovieCard = styled.div`
    font: 14px/22px "Joan", Arial, sans-serif;
    color: #A9A8A3;
    padding: 40px 0;
`

const Container = styled.div`
    margin: 0 auto;
    width: 50vw;
    height: 60vh;
    background: #F0F0ED;
    border-radius: 5px;
    position: relative;
`

const Hero = styled.div<{ backdropImg?: string }>`
    height: 60%;
    margin:0;
    position: relative;
    overflow: hidden;
    z-index:1;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    &:before {
        content:'';
        width:100%;
        height:100%;
        position:absolute;
        overflow: hidden;
        top:0;
        left:0;
        background: ${(props) => `url(${props.backdropImg})`};
        background-size: cover;
        background-repeat: no-repeat;
        z-index:-1;
        transform: skewY(-2.2deg);
        transform-origin:0 0;
        -webkit-backface-visibility: hidden;
    }

    &:after{
        background-color: rgba(0,0,0,0.6);
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        content: ' ';
        transform: skewY(-2.2deg);
        transform-origin:0 0;
        -webkit-backface-visibility: hidden;
    }
`

const Cover = styled.img`
    position: absolute;
    width: 20%;
    height: 50%;
    top: 160px;
    left: 40px;
    z-index: 2;
`

const Details = styled.div`
    padding: 20% 0 0 30%;
`

const MainTitle = styled.div`
    color: white;
    font-size: 40px;
    position: relative;
    z-index: 1;
    line-height: 1.2em;
`

const Description = styled.div`
    bottom: 0px;
    height: 200px;
    font-size: 16px;
    line-height: 26px;
    color: #B1B0AC;
    display: flex;
`

const Column1 = styled.div`
    padding-left: 28px;
    padding-top: 120px;
    width: 220px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`

const MovieTag = styled.span`
    background: white;
    border-radius: 10px;
    padding: 0px 8px;
    font-size: 14px;
    margin-right: 4px;
    line-height: 35px;
    height: 32px;
`

const Column2 = styled.div`
    padding-left: 56px;
    width: 480px;
    float: left;
`

const CloseButton = styled(FontAwesomeIcon)`
    color: #ffffff;
    font-size: 2.0em;
    position: absolute;
    top: 48px;
    right: 16px;
    z-index: 2;
    cursor: pointer;
    &:hover{
        opacity: 0.8;
    }
`

export const MovieModal = ({ closeModal, title, genres, backdropImg, posterImg, overview }: { closeModal: MouseEventHandler, title?: string, genres?: { id: string, name: string }[], backdropImg?: string, posterImg?: string, overview?: string }) => {
    return (
        <MovieCard>
            <CloseButton icon={faXmark} onClick={closeModal} />
            <Container>
                <Cover src={posterImg} />
                <Hero backdropImg={backdropImg}>
                    <Details>
                        <MainTitle>{title}</MainTitle>
                    </Details>
                </Hero>
                <Description>
                    <Column1>
                        {genres?.map((genre, i) => (
                            <MovieTag key={genre.id}>{genre.name}</MovieTag>
                        ))}
                    </Column1>
                    <Column2>
                        <p>{overview}</p>
                    </Column2>
                </Description>
            </Container>
        </MovieCard>
    )
}