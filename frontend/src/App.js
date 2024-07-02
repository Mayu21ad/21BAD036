import React, { useState, useEffect } from "react";
import { Typography, styled } from "@mui/material";
import Button from "@mui/material/Button";
import { useLoaderData, Link } from "react-router-dom";

const App = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const laptopdata = useLoaderData();

  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:8000/test/companies/:companyname/categories/:categoryname/products?top=n&minPrice=p&maxPrice=q");
      const jsonResponse = await response.json();
      setResponse(jsonResponse);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClick}>
        Click me
      </Button>
      {response && (
        <Typography variant="h5">
          Response: {JSON.stringify(response)}
        </Typography>
      )}
      {error && (
        <Typography variant="h5" color="error">
          Error: {error}
        </Typography>
      )}
    </div>
  );
};

export default App;