import { MouseEventHandler } from "react"
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faLink } from '@fortawesome/free-solid-svg-icons'

const MovieCard = styled.div`
    font: 14px/22px "Joan", Arial, sans-serif;
    color: #A9A8A3;
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
        background-color: rgba(0,0,0,0.7);
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

const CoverOverlay = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: .3s ease;
    background-color: #1C1C1C;
`

const CoverWrapper = styled.div`
    position: absolute;
    width: 20%;
    height: 51%;
    top: 160px;
    left: 40px;
    z-index: 2;
    cursor:pointer;

    &:hover ${CoverOverlay} {
        opacity: 0.6;
    }
`

const Cover = styled.img`
    display: block;
    width: 100%;
    height: auto;
`

const Link = styled.div`
    color: #85f9ff;
    font-size: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
`

const Details = styled.div`
    padding: 16% 0 0 30%;
`

const MainTitle = styled.div`
    color: #ffffff;
    font-size: 40px;
    position: relative;
    z-index: 1;
    line-height: 1.2em;
`

const TagLine = styled.div`
    color: #979797;
    font-size: 24px;
    font-weight: 300;
    margin-top: 8px;
    line-height: 1.2em;
    z-index: 1;
    position: relative;
`

const Description = styled.div`
    bottom: 0px;
    height: auto;
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
    width: 60%;
    float: left;
`

const CloseButton = styled(FontAwesomeIcon)`
    color: #ffffff;
    font-size: 2.0em;
    position: absolute;
    top: 8px;
    right: 16px;
    z-index: 2;
    cursor: pointer;
    &:hover{
        opacity: 0.8;
    }
`

export const MovieModal = ({ closeModal, title, genres, backdropImg, posterImg, overview, tagLine, homePage }: { closeModal: MouseEventHandler, title?: string, genres?: { id: string, name: string }[], backdropImg?: string, posterImg?: string, overview?: string, tagLine?: string, homePage?: string }) => {
    const onClickCover: MouseEventHandler = (e) => {
        e.preventDefault()
        window.open(homePage, '_blank', 'noopener')
    }

    return (
        <MovieCard>
            <CloseButton icon={faXmark} onClick={closeModal} />
            <Container>
                <CoverWrapper onClick={onClickCover}>
                    <Cover src={posterImg} />
                    <CoverOverlay>
                        <Link><FontAwesomeIcon icon={faLink} /></Link>
                    </CoverOverlay>
                </CoverWrapper>
                <Hero backdropImg={backdropImg}>
                    <Details>
                        <MainTitle>{title}</MainTitle>
                        <TagLine>{tagLine}</TagLine>
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