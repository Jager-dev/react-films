import React, {useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";

const Browse = () => {
  const [inputValue, setInputValue] = useState("")
  const [isOpen, setIsOpen] = useState(true)
  const history = useHistory()

  const params = useParams()

  const input = (e) => {
    setInputValue(e.target.value)
  }
  const handleClick = () => {
    history.push(`/browse/${inputValue}`)
    setTimeout(() => setInputValue(""), 1000)
  }
  const handleClear = () => {
    setIsOpen(false)
  }
  const enterPress = (e) => {
    if (e.key === "Enter"){
      handleClick()
    }
  }

  return (
    <div className={"browse"}>
      <header className={"d-flex justify-content-between"}>
        <nav>
          <ul className={"d-flex justify-content-between"}>
           <Link to={'/'}><li>Home</li></Link>
            <Link to={'/'}><li>Films</li></Link>
            <Link to={`/actors/${params.id}`}><li>Actors</li></Link>
          </ul>
        </nav>
        <div className={"d-flex"}>
          <input type="text" className={"browse__input"} placeholder={"Search a film, serial, actor..."} onKeyDown={enterPress} value={inputValue} onChange={input}/>
          <button className={"d-flex justify-content-center align-items-center"} onClick={handleClick} disabled={!inputValue.trim()}>
            search
          </button>
          <button className={"d-flex justify-content-flex-end align-items-center"} onClick={handleClear} disabled={!inputValue.trim()}>
            clear
          </button>
        </div>
      </header>
    </div>
  );
};

export default Browse;