import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {Link} from "react-router-dom";
import Spinner from "../../components/Spinner";

const Home = () => {
  const [page, setPage] = useState(1)
  const [films, setFilms] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  const handlePage = (num) => {
    setPage(num)
  }

  useEffect(() => {
    axios(`https://api.themoviedb.org/3/discover/movie?language=en&page=${page}&sort_by=popularity.desc&api_key=6f19f87e3380315b9573c4270bfc863c`)
      .then(({data}) => {
        setFilms(data.results)
        setIsLoading(false)
      })
  }, [page])

  if (isLoading) {
    return (
      <Spinner/>
    )
  }

  return (
    <div className={"film"}>
      {
        <div className={"row my-5"}>
          {
            films.map(film =>
              <div className={"col-md-3 col-sm-6 mb-4"} key={film.id}>
                <Link to={`/film/${film.id}`}>
                  <div className={"film__card"}>
                    <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${film.poster_path}`} alt={film.title}
                         className={"w100"}/>
                    <div className={"film__info d-flex justify-content-space-between align-items-center"}>
                      <h5>{film.title}</h5>
                      <p>{film.vote_average}</p>
                    </div>
                    <div className={"film__card__over"}>
                      <h5>Overview:</h5>
                      <p>{film.overview}</p>
                    </div>
                  </div>
                </Link>
              </div>
            )
          }
        </div>
      }
      <div className={"d-flex justify-content-center"}>
        {
          [...Array(6).keys()].map(item =>
            <button type={"button"} key={item} className={`btn btn-light mx-2 ${page === item + 1 || "btn-dark"}`}
                    onClick={() => handlePage(item + 1)}>{item + 1}</button>
          )
        }
      </div>
    </div>
  );
};
export default Home;