import React from 'react'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from 'react-bootstrap';

const SearchMenu = ({ bookmark }) => {

  return (
    <div className='search-menu-area'>
      <div className="search">
        <input type="text" placeholder="검색어 입력" className='ser-bar' />
        <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon searchbar-icon' />
      </div>
      <div className='Bookmark'>
        {bookmark.map((item, index) => (
          <Button className='Bookmark-move' key={index}>{item}</Button>
        ))}
      </div>

    </div>
  )
}

export default SearchMenu