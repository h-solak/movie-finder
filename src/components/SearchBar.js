import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Button, Input, InputGroup } from "reactstrap";
import { toast } from "react-hot-toast";
import { application } from "../config";

const SearchBar = ({
  setResponseData,
  setLoading,
  page,
  setPage,
  setKeyword,
  setNotFound,
  setWelcome,
  isSimilar,
  setIsSimilar,
}) => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (!isSimilar) {
      axios
        .request({
          method: "GET",
          url: `https://api.themoviedb.org/3/search/movie?api_key=${application.api_key}&language=en-US&page=${page}&include_adult=false&query=${searchText}`,
          query: searchText,
          page: 1,
        })
        .then(function (response) {
          setResponseData(response.data);
          setTimeout(() => {
            setLoading(false);
          }, 300);
          setKeyword(
            `Total ${response.data.total_results} movies found for "${searchText}"`
          );
          setNotFound(false);
        })
        .catch(function (error) {
          setLoading(false);
        });
    }
  }, [page]);

  const handleSearchClick = () => {
    setIsSimilar(false);
    setPage(1);
    if (searchText.length > 0) {
      setLoading(true);
      axios
        .request({
          method: "GET",
          url: `https://api.themoviedb.org/3/search/movie?api_key=${application.api_key}&language=en-US&page=${page}&include_adult=false&query=${searchText}`,
          query: searchText,
          page: 1,
        })
        .then(function (response) {
          setResponseData(response.data);
          setTimeout(() => {
            setLoading(false);
            if (response.data.total_results === 0) {
              setNotFound(true);
            } else {
              setNotFound(false);
            }
          }, 300);
          setKeyword(
            `Total ${response.data.total_results} movies found for "${searchText}"`
          );
          setWelcome(false);
        })
        .catch((error) => {
          toast.error("Something Went Horribly Wrong!");
          setLoading(false);
        });
    } else {
      toast.error("Enter a Keyword!");
    }
  };

  return (
    <>
      <Col
        xs="12"
        sm="12"
        md="4"
        className="my-3 d-flex w-100 justify-content-center"
      >
        <Col xs="12" sm="12" md="4">
          <InputGroup>
            <Input
              placeholder="Search Before Sunrise..."
              value={searchText}
              onChange={handleSearchChange}
              autoFocus
            />
            <Button
              onClick={handleSearchClick}
              style={{ backgroundColor: "#191919" }}
            >
              Search
            </Button>
          </InputGroup>
        </Col>
      </Col>
    </>
  );
};

export default SearchBar;
