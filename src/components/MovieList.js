import React, { useState } from "react";
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
import { toast } from "react-hot-toast";
import { AiFillStar } from "react-icons/ai";

const MovieList = ({ responseData, loading }) => {
  return (
    <Row>
      {loading ? (
        <Col sm="12" className="text-center">
          <span className="absolute-center text-white">Loading...</span>
        </Col>
      ) : responseData.total_results > 0 ? (
        responseData.results?.map((movie) =>
          movie.backdrop_path !== null ? (
            <Col md="2" key={movie.id} className="mb-4">
              {/* <a href="" target={"_blank"} rel="noreferrer"> */}
              <Card className="p-0 movie-card bg-dark">
                <div
                  className="default bg-dark d-flex align-items-center px-1"
                  style={{
                    position: "absolute",
                    right: "0",
                    borderRadius: "0px 0px 0px 6px",
                  }}
                >
                  <AiFillStar style={{ color: "orange" }} />
                  <span className="text-white">{movie.vote_average}</span>
                </div>
                <img
                  alt={`${movie.title} Movie`}
                  src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.backdrop_path}`}
                  width="100%"
                />
                <span
                  className="default px-1 text-center text-white"
                  title={movie.title}
                >
                  {movie.title.length > 20
                    ? `${movie?.title?.slice(0, 20)}..`
                    : movie.title}
                  <br />
                  <span> ({movie?.release_date?.slice(0, 4)})</span>
                </span>
                <div className="d-flex justify-content-between px-1"></div>
                <div
                  className="hover-text bg-white p-3 default rounded"
                  style={{ fontSize: "14px" }}
                >
                  <span className="fw-bolder border-bottom">
                    {movie.title} ({movie?.release_date?.slice(0, 4)})
                  </span>
                  <br />
                  {movie.overview}
                </div>
              </Card>
              {/* </a> */}
            </Col>
          ) : null
        )
      ) : null}
    </Row>
  );
};

export default MovieList;
