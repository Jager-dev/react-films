import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import Spinner from "../../components/Spinner";

const Actors = () => {
  const [actors, setActors] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const params = useParams()

  useEffect(() => {
    axios(`https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=6f19f87e3380315b9573c4270bfc863c`)
      .then(({data}) => {
        setActors(data.cast)
        setIsLoading(false)
      })
  }, [params.id])

  if (isLoading && actors){
    return (
      <Spinner />
    )
  }

  return (
    <div className={"row"}>
      {
        actors.map(actor =>
          <div className={"col-3"}>
            <Link to={`/actorsdetails/${actor.id}`}>
              {
                actor.profile_path === null ?
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBjZn8mOw7F4rtWWKbEIIHOr_w_GAeHiXPgA&usqp=CAU" height={"300"} width={"200"} alt=""/>
                  :
                  <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt=""/>
              }
            </Link>
            <div>{actor.name}</div>
          </div>
        )
      }
    </div>
  );
};

export default Actors;