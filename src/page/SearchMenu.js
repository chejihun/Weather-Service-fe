import React from 'react'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from 'react-bootstrap';
import { useState } from 'react';

const SearchMenu = ({ bookmark, setCity, searchWeather, closeMenu }) => {
  
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInput = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchWeather(searchTerm);
    }
  };

  return (
    <div className='search-menu-area'>
      <div className="search">
        <input
          type="text"
          placeholder="검색어 입력"
          className='ser-bar'
          onChange={(e) => handleSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className='search-icon searchbar-icon'
        />
        
      </div>
      <div className='Bookmark'>
        {bookmark.map((item, index) => (
          <Button className='Bookmark-move'
            key={index}
            onClick={() => setCity(item)}
          >
            {item}
          </Button>
        ))}
      </div>
      <Button className='close_button' onClick={closeMenu} > X </Button>

    </div>
  )
}

export default SearchMenu;