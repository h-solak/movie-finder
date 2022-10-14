import React, { useState, useEffect } from "react";
import { Row, Col, Button, Input, InputGroup } from "reactstrap";
import { toast } from "react-hot-toast";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";

const Home = ({
  page,
  setPage,
  loading,
  setLoading,
  responseData,
  setResponseData,
}) => {
  return (
    <>
      <span className="fs-3 fw-bolder p-3 text-white default text-center text-md-start">
        Movie Finder
      </span>
      <SearchBar
        setResponseData={setResponseData}
        setLoading={setLoading}
        page={page}
      />
      <MovieList
        responseData={responseData}
        page={page}
        setPage={setPage}
        loading={loading}
      />
      {responseData?.total_pages > 1 ? (
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
          <span style={{ fontSize: "14px" }}>Page {page}</span>
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
    </>
  );
};

export default Home;
