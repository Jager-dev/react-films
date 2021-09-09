import React, {useState} from 'react';
import {useHistory} from "react-router-dom";

const Browse = () => {
  const [inputValue, setInputValue] = useState("")
  const [isOpen, setIsOpen] = useState(true)
  const history = useHistory()

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
    <div>
      <header className={"d-flex justify-content-center"}>
        <input type="text" className={""} placeholder={"Search a film, serial, actor..."} onKeyDown={enterPress} value={inputValue} onChange={input}/>
        <button className={"d-flex justify-content-center align-items-center"} onClick={handleClick} disabled={!inputValue.trim()}>
          search
        </button>
        <button className={"d-flex justify-content-flex-end align-items-center"} onClick={handleClear} disabled={!inputValue.trim()}>
          clear
        </button>
      </header>
    </div>
  );
};

export default Browse;