import React from 'react'
import { faMagnifyingGlass, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from 'react-bootstrap';
import { useState } from 'react';

const SearchMenu = ({ bookmark, setCityName, searchWeather, closeMenu, loading }) => {
  
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInput = searchTerm => setSearchTerm(searchTerm);

  const handleKeyPress = e => {
    if (e.key === 'Enter' && !loading) {
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
          onChange={e => handleSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        {loading ? 
          <FontAwesomeIcon 
            icon={faSpinner} 
            spin 
            className='search-icon searchbar-icon' 
          /> : 
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className='search-icon searchbar-icon'
            onClick={() => searchWeather(searchTerm)}
            style={{cursor: 'pointer'}}
          />
        }
      </div>
      <div className='Bookmark'>
        {bookmark.map((item, index) => (
          <Button className='Bookmark-move'
            key={index}
            onClick={() => setCityName(item)}
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