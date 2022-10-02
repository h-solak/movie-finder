import React, { useState, useEffect } from "react";
import { Row, Col, Button, Input, InputGroup } from "reactstrap";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import { FiGithub } from "react-icons/fi";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

function App() {
  const [responseData, setResponseData] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  return (
    <>
      <Toaster position="top-center" />
      <Row
        className="mx-0 h-100 d-flex justify-content-around"
        style={{ minHeight: "80vh" }}
      >
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
      </Row>
      <Col
        sm="12"
        className="d-flex align-items-center justify-content-center gap-1 mt-5 py-3 footer"
        style={{
          borderTop: "2px rgba(255,255,255,0.1) solid",
          borderBottom: "2px rgba(255,255,255,0.1) solid",
        }}
      >
        <a
          className="text-white d-flex align-items-center gap-1"
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noreferrer"
        >
          Data provided by
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
            alt=""
            width={50}
          />
        </a>
        <span className="fs-6 text-white fw-bolder mx-2">·</span>
        <a className="" href="https://h-solak.github.io/">
          <FiGithub className="fs-5 text-white" />
          <span className="text-white"> Visit My Portfolio</span>
        </a>
      </Col>
    </>
  );
}

export default App;
