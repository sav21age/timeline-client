import { Container } from '@mui/material';
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
import { appConfig } from "../appConfig";

function Home() {
  return (
    <Container maxWidth={false}>
      <Helmet>
        <title>Football Timeline</title>
      </Helmet>
      <h1>Home</h1>

      <Grid container spacing={4}>
        {appConfig.INDEX.map((item: any, index: number) => {
          return (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                variant="outlined"
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardActionArea
                  component={RouterLink}
                  to={item.link}
                >
                  <CardMedia
                    component="img"
                    height="150"
                    image={`${appConfig.MEDIA_ROOT}/background/${item.backgroundPlaceholder}`}
                    data-src={`${appConfig.MEDIA_ROOT}/background/${item.background}`}
                    alt=""
                    className="lazyload"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
export default Home;
