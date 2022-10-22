import React, { useState, useEffect } from "react";
import { Row, Col, Button, Input, InputGroup } from "reactstrap";
import { toast } from "react-hot-toast";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import Fade from "react-reveal/Fade";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import NotFoundIllustration from "../materials/UndrawHorrorIllustration.svg";
import HomeCinemaIllustration from "../materials/UndrawCinema.svg";
const Home = ({
  page,
  setPage,
  loading,
  setLoading,
  responseData,
  setResponseData,
  keyword,
  setKeyword,
  notFound,
  setNotFound,
  welcome,
  setWelcome,
  isSimilar,
  setIsSimilar,
}) => {
  useEffect(() => {
    console.log(isSimilar);
  }, [isSimilar]);
  return (
    <>
      <div className="d-flex flex-column m-0 p-0">
        <span className="w-100 m-0 px-3 pt-3 fs-3 fw-bolder default text-center mb-1">
          Movie Finder
        </span>
        <div className="px-3">
          <SearchBar
            setResponseData={setResponseData}
            setLoading={setLoading}
            page={page}
            setPage={setPage}
            setKeyword={setKeyword}
            notFound={notFound}
            setNotFound={setNotFound}
            setWelcome={setWelcome}
            isSimilar={isSimilar}
            setIsSimilar={setIsSimilar}
          />
          {welcome ? (
            <div className="m-0 d-flex flex-column justify-content-center absolute-center gap-2">
              <Fade right>
                <img
                  src={HomeCinemaIllustration}
                  alt="Not Found"
                  style={{ width: "250px" }}
                />
              </Fade>
              <Fade left>
                <span
                  className="text-dark text-center"
                  style={{ fontWeight: "600", color: "#8e44ad" }}
                >
                  Find the movies you are looking for!
                </span>
              </Fade>
            </div>
          ) : null}
          <p className="text-muted text-center" style={{ color: "#8e44ad" }}>
            {keyword}
          </p>
          <MovieList
            responseData={responseData}
            setResponseData={setResponseData}
            page={page}
            setPage={setPage}
            loading={loading}
            setLoading={setLoading}
            setKeyword={setKeyword}
            notFound={notFound}
            setNotFound={setNotFound}
            setWelcome={setWelcome}
            isSimilar={isSimilar}
            setIsSimilar={setIsSimilar}
          />
          {responseData?.total_pages > 1 && !loading ? (
            <Col
              sm="12"
              className="arrows text-white d-flex justify-content-center align-items-center gap-2 mt-4"
            >
              <div
                className="p-1 d-flex align-items-center justify-content-center rounded-circle"
                style={{ backgroundColor: "#8e44ad" }}
              >
                <BiLeftArrow
                  className="fs-5 pointer"
                  onClick={page !== 1 ? () => setPage(page - 1) : null}
                />
              </div>
              <span className="text-dark" style={{ fontSize: "14px" }}>
                Page {page}
              </span>
              <div
                className="p-1 d-flex align-items-center justify-content-center rounded-circle"
                style={{ backgroundColor: "#8e44ad" }}
              >
                <BiRightArrow
                  className="fs-5 pointer"
                  onClick={
                    page < responseData.total_pages
                      ? () => setPage(page + 1)
                      : () => toast.error("You are at the last page!")
                  }
                  style={{ backgroundColor: "#8e44ad" }}
                />
              </div>
            </Col>
          ) : null}
        </div>
        {notFound ? (
          <div className="d-flex flex-column align-items-center absolute-center">
            <img
              src={NotFoundIllustration}
              alt="Not Found"
              style={{ width: "300px" }}
            />
            <span
              className="text-dark"
              style={{ fontWeight: "600", color: "#8e44ad" }}
            >
              Sorry, I couldn't find any movies :/
            </span>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Home;
