import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom"
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
  const history = useHistory()

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
  }, [])

  if (isLoading || actorLoading) {
    return (
      <Spinner/>
    )
  }
  return (
    <div style={{backgroundImage: `url(https://www.themoviedb.org/t/p/original${film.backdrop_path})`}}
         className='bg'>
      <div className={"row"}>
        <div>
          <button className="back" onClick={() => history.goBack()}>Back</button>
        </div>
        <div className="col-md-6">
          <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${film.poster_path}`} alt={film.title}
               width={"400"}/>
        </div>
        <div className="col-md-6">
          <h3>Name: {film.title}</h3>
          <p>Overview: {film.overview}</p>
          <p>Language: {film.original_language}</p>
          <p>Rating: {film.vote_average}</p>
          <p>Budget: {film.budget.toLocaleString()}$</p>
          <p>Revenue: {film.revenue?.toLocaleString()}$</p>
          <p>Release date: {film.release_date}</p>
          <h5>Producers:</h5>
          {
            film.production_companies.map(company =>
              <div key={company.id}>{company.name}</div>
            )
          }
          <div>
            <p><span>Genre:  </span>{film.genres?.map(item => <div
              key={item}>{item.name}</div>)}

            </p>
            <p>
              <span>Film duration: </span> {Math.floor(film.runtime / 60)}h {Math.floor(film.runtime % 60)}m
            </p>
          </div>
          {
            film.production_countries.map(item => item).length > 1 ?
              <h5>Countries:</h5> : film.production_countries.length === 0 ? "" : <h5>Country:</h5>
          }
          {
            film.production_countries.map(country =>
              <div key={country.id}>{country.name}</div>
            )
          }
          <h5 className={"mt-5"}>Actors:</h5>
          <OwlCarousel className='owl-theme mt-3' loop margin={10} dots={false} items={4} nav>
            {
              actors.slice(actors, 10).map(actor =>
                <div>
                  <Link to={`/actorsdetails/${actor.id}`}>
                    {
                      actor.profile_path === null ?
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjZn8mOw7F4rtWWKbEIIHOr_w_GAeHiXPgA&usqp=CAU"
                          height={"193.5"} alt=""/>
                        :
                        <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt=""/>
                    }
                  </Link>
                  <div>{actor.name}</div>
                </div>
              )
            }
            <Link to={`/actors/${params.id}`}>View more --></Link>
          </OwlCarousel>
        </div>
        {
          trailers.map(item =>
            <Fancy key={item.key} id={item.key}/>
          )
        }
      </div>
    </div>
  )
}

export default FilmDetails;