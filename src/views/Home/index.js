import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {Link} from "react-router-dom";

const Home = () => {
  const [page, setPage] = useState(1)
  const [films, setFilms] = useState([])

  const handlePage = (num) => {
    setPage(num)
  }

  useEffect( () => {
    axios(`https://api.themoviedb.org/3/discover/movie?language=en&page=${page}&sort_by=popularity.desc&api_key=6f19f87e3380315b9573c4270bfc863c`)
      .then(({data}) => setFilms(data.results))
  },[page])
  return (
    <div>
      {
        [...Array(6).keys()].map(item =>
          <button type={"button"} key={item} className={`btn btn-warning mx-2 ${page === item + 1 && "btn-danger"}`}
          onClick={ () => handlePage(item + 1)}
          >{item + 1}</button>
        )
      }
      {
        <div className={"row my-5"}>
          {
            films.map(film =>
              <div className={"col-md-3 col-sm-6 mb-4"} key={film.id}>
                <Link to={`/film/${film.id}`}>
                <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${film.poster_path}`} alt={film.title} className={"w100"}/>
                <h4 className={"mt-3"}>{film.original_title}</h4>
                </Link>
              </div>
            )
          }
        </div>
      }
    </div>
  );
};
export default Home;