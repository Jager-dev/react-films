import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom"
import axios from "axios";
import Spinner from "../../components/Spinner";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Fancy from "../../components/Fancy";



const FilmDetails = () => {
  const [film, setFilm] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [actors, setActors] = useState([])
  const [actorLoading, setActorLoading] = useState(true)
  const [trailers, setTrailers] = useState([])


  const params = useParams()

  useEffect(() => {
    axios(`https://api.themoviedb.org/3/movie/${params.id}?api_key=6f19f87e3380315b9573c4270bfc863c`)
      .then(({data}) => {
        setFilm(data)
        setIsLoading(false)
      })

    axios(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=6f19f87e3380315b9573c4270bfc863c`)
      .then(({data}) => {
        setTrailers(data.results)
      })

    axios(`https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=6f19f87e3380315b9573c4270bfc863c`)
      .then(({data}) => {
        setActors(data.cast)
        setActorLoading(false)
      })
  },[])

  if (isLoading && actorLoading){
    return (
      <Spinner />
    )
  }
  return (
    <div className={"row"}>
      <div className="col-md-5">
        <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${film.poster_path}`} alt={film.title}/>
      </div>
      <div className="col-md-6">
        <h3>Название: {film.title}</h3>
        <p>Описание: {film.overview}</p>
        <p>Рейтинг: {film.vote_average}</p>
        <p>Бюджет: {film.budget.toLocaleString()}$</p>
        <h5>Производители:</h5>
        {
          film.production_companies.map(company =>
            <div key={company.id}>{company.name}</div>
          )
        }
        <h5>Страны:</h5>
        {
          film.production_countries.map(country =>
            <div key={country.id}>{country.name}</div>
          )
        }
        <h5 className={"mt-5"}>Актёры:</h5>
        <OwlCarousel className='owl-theme mt-3' loop margin={10} dots={false} items={4} nav>
          {
            actors.map(actor =>
              <div>
                <img src={`https://www.themoviedb.org/t/p/w138_and_h175_face${actor.profile_path}`} alt={actors.character}/>
                <div>{actor.character}</div>
              </div>
            )
          }
          <Link to={`/actors/${params.id}`}>Show more</Link>
        </OwlCarousel>
      </div>
      {
          trailers.map(item =>
            <Fancy key={item.key} id={item.key}/>
          )
        }
    </div>
  )
}

export default FilmDetails;