import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate, useNavigation } from "react-router";
import axios from "axios";
import { Grid, IconButton } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import { ArrowBack, ArrowBackIos, ArrowBackIosNew } from "@mui/icons-material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";

export default function Show({}) {
  const loc = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [fetchedData, setFetchedData] = React.useState({});

  const getById = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/asset/${id}`
      );

      setFetchedData({
        ...fetchedData,
        images: data.collection.items.filter((v) =>
          v.href.split(".").includes("jpg")
        ),
      });
    } catch (error) {
      console.log("er", error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getById(loc.state?.nasa_id);
  }, [loc.state]);

  console.log("loc--------", loc.state);
  return (
    <Grid
      style={{
        margin: "20px auto 20px auto",
        maxWidth: "80%",
      }}
      container
    >
      <IconButton
        onClick={() => navigate(-1)}
        style={{ marginTop: "30px" }}
        size="large"
      >
        <ArrowBack fontSize="large" />
      </IconButton>
      <Card>
        <Carousel showArrows={true}>
          {fetchedData?.images?.map((v) => {
            return (
              <div>
                <img src={v.href} alt="" />
              </div>
            );
          })}
        </Carousel>
        {/* <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={loc.state.thumbnail}
        /> */}
        <CardContent>
          <Typography variant="h4" style={{}} component="div">
            Date: {dayjs(loc.state.date_created).format("DD-MM-YYYY")}
          </Typography>
          <Typography variant="h5" style={{}} margin={2} marginLeft={0}>
            Photographer: {loc.state.secondary_creator}
          </Typography>
          <Typography variant="h4" component="div">
            {loc.state.title}
          </Typography>
          <Stack margin={2} direction="row" spacing={1}>
            {loc.state.keywords.map((v) => (
              <Chip label={v} />
            ))}
          </Stack>

          <Typography variant="body2" color="text.secondary">
            {loc.state.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
