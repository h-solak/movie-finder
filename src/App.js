import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Button, Input, InputGroup } from "reactstrap";
import { Toaster } from "react-hot-toast";
import { FiGithub } from "react-icons/fi";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import Home from "./pages/Home";

function App() {
  const [responseData, setResponseData] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [welcome, setWelcome] = useState(true);

  return (
    <Fragment>
      <Toaster position="top-center" />
      <Row
        className="m-0 h-100 d-flex justify-content-around"
        style={{ minHeight: "80vh" }}
      >
        <Home
          responseData={responseData}
          setResponseData={setResponseData}
          loading={loading}
          setLoading={setLoading}
          page={page}
          setPage={setPage}
          tab={tab}
          setTab={setTab}
          keyword={keyword}
          setKeyword={setKeyword}
          notFound={notFound}
          setNotFound={setNotFound}
          welcome={welcome}
          setWelcome={setWelcome}
        />
      </Row>
      <Col
        sm="12"
        className="d-flex align-items-center justify-content-center gap-1 mt-5 py-3 footer"
        style={{
          borderTop: "2px rgba(0,0,0,0.1) solid",
          borderBottom: "2px rgba(0,0,0,0.1) solid",
        }}
      >
        <a
          className="text-dark d-flex align-items-center gap-1"
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noreferrer"
        >
          <span className="text-dark d-none d-md-inline">Data provided by</span>
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
            alt=""
            width={50}
          />
        </a>
        <span className="fs-6 text-dark fw-bolder mx-2">·</span>
        <a className="" href="https://h-solak.github.io/">
          <FiGithub className="fs-5 text-dark" />
          <span className="text-dark d-none d-md-inline">
            {" "}
            Visit My Portfolio
          </span>
        </a>
      </Col>
    </Fragment>
  );
}

export default App;
