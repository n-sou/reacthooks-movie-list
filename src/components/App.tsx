import { MovieList } from './MovieList'
import requests from '../apis/requests'
import styled from 'styled-components'

const PageTitle = styled.h1`
  color: #fff;
  position: relative;
  padding: 0 65px;
  text-align: center;
  font-family: 'Joan', serif;
  &:before {
    position: absolute;
    top: calc(50% - 1px);
    left: 0;
    width: 100%;
    height: 2px;
    content: '';
    background: #fff;
  }
  span{
    position: relative;
    padding: 0 1em;
    background: #203d4a;
  }
`

function App() {
  return (
    <>
      <PageTitle><span>Trending Movies</span></PageTitle>
      <MovieList fetchUrl={requests.fetchTrending} />
    </>
  );
}

export default App;
