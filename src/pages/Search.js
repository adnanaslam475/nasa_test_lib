import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  StyledEngineProvider,
  TextField,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";

import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { queryParamsToString } from "../utils/stringFormatter";
import { useNavigate } from "react-router";

function Search() {
  const navigate = useNavigate();
  const [startYear, setStartYear] = React.useState("");
  const [endYear, setEndYear] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => setSearch(e.target.value);

  const searchHandler = async () => {
    setLoading(true);
    try {
      const queryParams = {
        q: search,
        ...(startYear && { year_start: startYear }),
        ...(endYear && { year_end: endYear }),
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/search?${queryParamsToString(
          queryParams
        )}`
      );
      let arr = [];
      // console.log("data.collection.items", data.collection.items);
      data.collection.items.forEach((v) => {
        arr.push({ thumbnail: v?.links[0].href, ...v?.data[0] });
      });
      setSearchResults(arr);
    } catch (error) {
      console.log("error-->", error);
    } finally {
      setLoading(false);
    }
  };
  // console.log("setSearchResults", searchResults);

  return (
    <div>
      <h1></h1>
      <Grid
        spacing={1}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "90%",
        }}
        columnSpacing={5}
        rowSpacing={2}
        container
      >
        <Grid item md={3} className="grid" lg={3} xl={3} sm={6} xs={12}>
          <TextField
            type="text"
            id="search"
            fullWidth
            name="id"
            placeholder="search..."
            className=""
            style={{}}
            onChange={handleChange}
            value={search}
          />
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item md={3} className="grid" lg={3} xl={3} sm={6} xs={12}>
            <FormControl fullWidth>
              <DesktopDatePicker
                label="Start Year"
                inputFormat="YYYY"
                value={startYear || dayjs(new Date()).year()}
                id="search"
                views={["year"]}
                onChange={(date) => setStartYear(date)}
                renderInput={(params) => <TextField {...params} />}
              />{" "}
            </FormControl>
          </Grid>
          <Grid item md={3} className="grid" lg={3} xl={3} sm={6} xs={12}>
            <FormControl fullWidth>
              <DesktopDatePicker
                label="End Year"
                inputFormat="YYYY"
                views={["year"]}
                value={endYear || dayjs(new Date()).year()}
                onChange={(date) => setEndYear(date)}
                renderInput={(params) => <TextField {...params} />}
              />
            </FormControl>
          </Grid>
        </LocalizationProvider>
        <Grid item md={3} lg={3} xl={3} sm={6} xs={12}>
          <FormControl
            fullWidth
            style={{
              display: "flex",
            }}
            className="grid"
          >
            <Button
              onClick={searchHandler}
              type="button"
              style={{ width: "100px" }}
              variant="contained"
              disabled={loading}
            >
              Search
            </Button>
          </FormControl>
        </Grid>
      </Grid>

      <Grid
        style={{
          marginTop: "20px",
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "90%",
        }}
        columnSpacing={2}
        rowSpacing={2}
        container
      >
        {loading ? (
          <CircularProgress
            size={40}
            color="secondary"
            style={{ margin: "auto", marginTop: "200px" }}
          />
        ) : (
          searchResults?.map((v) => {
            return (
              <Grid item md={3} key={v.thumbnail} lg={3} xl={3} sm={6} xs={12}>
                <Card
                  sx={{ maxHeight: 440, minHeight: 440 }}
                  onClick={() =>
                    navigate(`/details/${v.nasa_id}`, { state: v })
                  }
                >
                  <CardMedia
                    sx={{ height: 140 }}
                    image={v.thumbnail}
                    title={v.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {v.title}
                    </Typography>
                    <Typography
                      style={{ height: "100px" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {v.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        )}
      </Grid>
    </div>
  );
}

// thumbanil ittle location , photoraphernae
export default Search;
