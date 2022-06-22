import { RefObject } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const SearchWrapper = styled.div`
  width: 380px;
  padding: 16px;
  height: 40px;
  margin: 0px auto;
  background: #444;
  background: rgba(0,0,0,.2);
  border-radius: 10px;
  box-shadow: 0 1px 1px rgba(0,0,0,.4) inset, 0 1px 0 rgba(255,255,255,.2);
  display: flex;
`

const SearchInput = styled.input`
  width: 330px;
  font: 20px 'Joan';
  border: 0;
  background: #eee;
  &:focus {
    outline: 0;
    background: #fff;
    box-shadow: 0 0 2px rgba(0,0,0,.8) inset;
  }
`

const SearchButton = styled.button`
  border: 0;
  padding: 0;
  cursor: pointer;
  width: 50px;
  color: #fff;
  background: #B83D4D;
  &:hover {
    background: #a53846;
  }
`

export const Search = ({ searchEl, doSearch }: { searchEl: RefObject<HTMLInputElement>, doSearch: () => void }) => {
  return (
    <SearchWrapper>
      <SearchInput ref={searchEl} type="text" />
      <SearchButton onClick={doSearch}><FontAwesomeIcon icon={faMagnifyingGlass} /></SearchButton>
    </SearchWrapper>
  )
}