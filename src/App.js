import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Button, Input, InputGroup } from "reactstrap";
import { Toaster, toast } from "react-hot-toast";
import { FiGithub } from "react-icons/fi";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import Home from "./pages/Home";

function App() {
  const [responseData, setResponseData] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  return (
    <Fragment>
      <Toaster position="top-center" />
      <Row
        className="mx-0 h-100 d-flex justify-content-around"
        style={{ minHeight: "80vh" }}
      >
        <Home
          responseData={responseData}
          setResponseData={setResponseData}
          loading={loading}
          setLoading={setLoading}
          page={page}
          setPage={setPage}
        />
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
          <span className="text-white d-none d-md-inline">
            Data provided by
          </span>
          <img
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
            alt=""
            width={50}
          />
        </a>
        <span className="fs-6 text-white fw-bolder mx-2">·</span>
        <a className="" href="https://h-solak.github.io/">
          <FiGithub className="fs-5 text-white" />
          <span className="text-white d-none d-md-inline">
            {" "}
            Visit My Portfolio
          </span>
        </a>
      </Col>
    </Fragment>
  );
}

export default App;
