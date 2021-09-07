import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams, useHistory, Link} from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Spinner from "../../components/Spinner";

const ActorsDetails = () => {
  const [actor, setActor] = useState({})
  const [filmsList, setFilmsList] = useState([])
  const [actorsFilms, setActorsFilms] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [actorsLoading, setActorsLoading] = useState(true)


  const {id} = useParams()
  const history = useHistory()

  useEffect(() => {
    axios(`https://api.themoviedb.org/3/person/${id}?&language=en&api_key=ff9e9d0130b0f3c796f426d2bd9285c3&language=en-US`)
      .then(res =>{
        setActor(res.data)
        setIsLoading(false)
      })

    axios(`https://api.themoviedb.org/3/person/${id}/combined_credits?&language=en&api_key=6f19f87e3380315b9573c4270bfc863c`)
      .then(({data}) => setFilmsList(data.cast))

    axios(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=6f19f87e3380315b9573c4270bfc863c`)
      .then(({data}) => {
        setActorsFilms(data.cast)
        setActorsLoading(false)
      })
  }, [id])

  if (isLoading || actorsLoading){
    return (
      <Spinner />
    )
  }

  return (
    <div>
      <div>
        <button className="back" onClick={() => history.goBack()}>Back</button>
      </div>
      <div>
        <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${actor.profile_path}`} alt=""/>
        <p>Имя: {actor.name}</p>
        <p>Пол: {actor.gender === 1 ? "Woman" : "Man"}</p>
        <p>Дата рождения: {actor.birthday}</p>
        <p>Место рождения: {actor.place_of_birth}</p>
        <p>Известен как:</p>{actor?.also_known_as?.map(name =>
        <p>{name}</p>)}
      </div>
      <div>
        <h3>{actor.name}</h3>
        <p>Биография: {actor.biography}</p>
        <h3>Известность за</h3>
        <OwlCarousel className='owl-theme' margin={10} items={8}  dots={false} nav>
          {
            actorsFilms.map(item =>
              <div>
                <Link to={`/film/${item.id}`}>
                  {
                    item.poster_path === null ?
                      <img src="https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132484366.jpg" alt="" height={"180"}/>
                      :
                      <img alt="" src={`https://www.themoviedb.org/t/p/w150_and_h225_bestv2${item.poster_path}`}/>
                  }
                </Link>
              </div>
            )
          }
        </OwlCarousel>
        <h2>Актерское искусство</h2>
        <div>
          {
            filmsList.filter(item => item.release_date).sort((a, b) => new Date(b.release_date) - new Date(a.release_date)).map(el =>
              <div key={el.id} >
                <Link to={`/film/${el.id}`}>
                  <p>{el.release_date.slice(0, 4) }<span> -- </span>{el.title}  <span>в фильме как</span> {el.character}</p>
                </Link>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default ActorsDetails;