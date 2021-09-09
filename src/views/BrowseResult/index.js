import React, {useEffect, useState} from 'react';
import axios from "axios"
import {Link, useParams} from "react-router-dom";
import Spinner from "../../components/Spinner";

const BrowseResult = () => {
  const [browseResult, setBrowseResult] = useState({})
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const {name} = useParams()

  useEffect(() => {
    axios(`https://api.themoviedb.org/3/search/multi?query=${name}&page=${page}&language=en&api_key=6f19f87e3380315b9573c4270bfc863c`)
      .then(({data}) => {
        setBrowseResult(data)
        setIsLoading(false)
      })
  }, [page, name])

  if (isLoading){
    return (
      <Spinner />
    )
  }

  return (
    <div>
      <div>
        <div className={"row mt-5"}>
          {
            browseResult.results?.length ?
            <>
              {
                browseResult.results?.map(result =>
                  <div className={"col-md-6 mb-4 link"}>
                    <Link to={`/film/${result.id}`}>
                      {result.poster_path ?
                        <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${result.poster_path}`}
                             alt={result.title?.slice(0, 2)}/> :
                        <img src={""} alt=""/>
                      }
                      <div className={"d-flex flex-column justify-content-center ms-3"}>
                        <h2>{result.title}</h2>
                        <p>{result.release_date?.split("-").reverse().join(".")}</p>
                        {
                          result.overview ?
                            ((result.overview).length > 120) ?
                              <p>{((result.overview).substring(0, 120 - 3)) + '...'}</p> :
                              <p>{result.overview}</p> : ""
                        }
                      </div>
                    </Link>
                  </div>
                )
              }

            </>
          : <p>Not Found :(</p>
          }
        </div>
      </div>
    </div>
  );
}
export default BrowseResult;