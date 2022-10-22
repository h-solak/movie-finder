import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  CardTitle,
  CardBody,
  CardText,
  Modal,
  ModalHeader,
} from "reactstrap";
import { AiFillStar, AiOutlineLoading3Quarters } from "react-icons/ai";
import { application } from "../config";
import axios from "axios";
const MovieList = ({
  responseData,
  setResponseData,
  loading,
  setLoading,
  setKeyword,
  notFound,
  setNotFound,
  setWelcome,
  isSimilar,
  setIsSimilar,
  page,
  setPage,
}) => {
  const [genres, setGenres] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState();
  useEffect(() => {
    axios
      .request({
        method: "GET",
        url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${application.api_key}`,
      })
      .then(function (response) {
        setGenres(response.data.genres);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [responseData]);

  useEffect(() => {
    if (isSimilar) {
      axios
        .request({
          method: "GET",
          url: `https://api.themoviedb.org/3/movie/${selectedMovie.id}/recommendations?api_key=${application.api_key}&language=en-US&page=${page}`,
        })
        .then(function (response) {
          setKeyword(
            `${response.data.total_results} Movie Recommendations for "${selectedMovie.title}"`
          );
          setTimeout(() => {
            setLoading(false);
          }, 300);
          if (response.data.total_results === 0) {
            setNotFound(true);
          } else {
            setNotFound(false);
          }
          setResponseData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [page]);

  const handleMovieClick = (selectedMovieID) => {
    setIsSimilar(true);
    setWelcome(false);
    setLoading(true);
    setPage(1);
    axios
      .request({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${selectedMovieID}/recommendations?api_key=${application.api_key}&language=en-US&page=1`,
      })
      .then(function (response) {
        let selectedMovieTitle;
        responseData.results?.map((movie) =>
          movie.id === selectedMovieID
            ? (selectedMovieTitle = movie.title)
            : null
        );
        setKeyword(
          `${response.data.total_results} Movie Recommendations for "${selectedMovieTitle}"`
        );
        setTimeout(() => {
          setLoading(false);
        }, 300);
        if (response.data.total_results === 0) {
          setNotFound(true);
        } else {
          setNotFound(false);
        }
        setResponseData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Row>
      {loading ? (
        <Col sm="12" className="text-center">
          <AiOutlineLoading3Quarters className="fs-4 absolute-center text-white loader" />
        </Col>
      ) : responseData.total_results > 0 ? (
        responseData.results?.map((movie) =>
          movie.backdrop_path !== null ? (
            <Col md="2" key={movie.id} className="mb-4">
              <Card className="p-0 movie-card bg-transparent">
                <div
                  className="default bg-glass d-flex align-items-center px-1 gap-1"
                  style={{
                    position: "absolute",
                    right: "0",
                    borderRadius: "0px 6px 0px 6px",
                  }}
                >
                  <AiFillStar style={{ color: "orange" }} />
                  <span className="text-white">{movie.vote_average}</span>
                </div>
                <img
                  alt={`${movie.title} Movie`}
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.backdrop_path}`}
                  width="100%"
                  style={{ borderRadius: "6px" }}
                />
                <div
                  className="d-flex flex-column bg-glass w-100"
                  style={{
                    position: "absolute",
                    bottom: "0",
                    borderRadius: "0px 0px 6px 6px",
                    padding: "4px",
                  }}
                >
                  <span className="default px-1 text-white text-start">
                    {movie.title.length > 20
                      ? `${movie?.title?.slice(0, 20)}..`
                      : movie.title}{" "}
                  </span>
                  <span
                    className="default px-1 text-muted text-start fs-7"
                    style={{ fontWeight: "600" }}
                  >
                    {movie?.genre_ids.map((id, index) =>
                      genres.map((item) =>
                        id === item.id && movie?.genre_ids?.length === 1
                          ? ` ${item.name}`
                          : id === item.id && index < 2
                          ? index !== 1
                            ? ` ${item.name},`
                            : ` ${item.name}`
                          : null
                      )
                    )}{" "}
                    ({movie?.release_date?.slice(0, 4)})
                  </span>
                </div>

                <div
                  className="hover-text bg-white p-3 default rounded"
                  style={{ fontSize: "14px" }}
                >
                  <a
                    href={`https://www.google.com/search?q=${
                      movie.title
                    } (${movie?.release_date?.slice(0, 4)})`}
                    className="fw-bolder border-bottom pointer"
                    title="Search this movie on Google"
                    target={"_blank"}
                    rel="noopener noreferrer"
                  >
                    {movie.title} ({movie?.release_date?.slice(0, 4)})
                  </a>
                  <br />
                  {movie.overview}
                  <br />
                  <div
                    className="text-muted text-start my-2"
                    style={{ fontWeight: "600" }}
                  >
                    {movie?.genre_ids.map((id, index) =>
                      genres.map((item) =>
                        id === item.id
                          ? ` ${item.name}`
                          : id === item.id
                          ? index !== 1
                            ? ` ${item.name},`
                            : ` ${item.name}`
                          : null
                      )
                    )}
                  </div>
                  <div
                    className="my-1 w-100 p-1 border text-center text-white pointer"
                    style={{
                      backgroundColor: "#8e44ad",
                    }}
                    onClick={() => {
                      handleMovieClick(movie?.id);
                      setSelectedMovie({
                        id: movie?.id,
                        title: movie?.title,
                      });
                    }}
                  >
                    Find Movies Like This
                  </div>
                </div>
              </Card>
            </Col>
          ) : null
        )
      ) : null}
    </Row>
  );
};

export default MovieList;
