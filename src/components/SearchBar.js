import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col, Button, Input, InputGroup } from "reactstrap";
import { toast } from "react-hot-toast";
import { application } from "../config";

const SearchBar = ({ setResponseData, setLoading, page }) => {
  const [searchText, setSearchText] = useState("");

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/search/movie?api_key=${application.api_key}&language=en-US&page=${page}&include_adult=false&query=${searchText}`,
    query: searchText,
    page: 1,
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .request(options)
      .then(function (response) {
        setResponseData(response.data);
        setLoading(false);
        if (response.data.total_results === 0) {
          toast.error("No results found!");
        }
      })
      .catch(function (error) {
        setLoading(false);
      });
  }, [page]);

  const handleSearchClick = () => {
    if (searchText.length > 0) {
      setLoading(true);
      axios
        .request(options)
        .then(function (response) {
          setResponseData(response.data);
          setLoading(false);
          if (response.data.total_results === 0) {
            toast.error("No results found!");
          }
        })
        .catch(function (error) {
          toast.error("Something Went Horribly Wrong!");
          setLoading(false);
        });
    } else {
      toast.error("Enter a Keyword!");
    }
  };

  return (
    <>
      <Col sm="12" md="4" className="my-5">
        <InputGroup>
          <Input
            placeholder="Before Sunrise..."
            value={searchText}
            onChange={handleSearchChange}
          />
          <Button
            onClick={handleSearchClick}
            style={{ backgroundColor: "#8e44ad" }}
          >
            Search
          </Button>
        </InputGroup>
      </Col>
    </>
  );
};

export default SearchBar;

//http://www.omdbapi.com/?apikey=[c62cc61f]&
//http://img.omdbapi.com/?apikey=[c62cc61f]&
