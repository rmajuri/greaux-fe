import { useState } from 'react'
import { Grid, Card, CardContent, Typography, Box, Link, InputLabel, Select, FormControl, MenuItem, Divider } from "@mui/material"
import Layout from "../../components/Layout"
import { styled } from '@mui/material/styles';
import axios from "axios";
import { useRouter } from 'next/router'
import AverageReview from "../../components/AverageReview";

const Category = ({ category, averageReviews }) => {

    const [price, setPrice] = useState(null)
    const [numReviews, setNumReviews] = useState(null)
    const [avgReview, setAvgReview] = useState(averageReviews)

    const router = useRouter()

    const handleBusinessClick = business => {
        router.push(`/business/${business.slug}`)
    }

    return (
        <Layout>
            <CustomGrid container>
                <Grid item xs={12} md={3}>
                    <Box>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h5">Filter the results</Typography>
                                <Divider />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="price">Price</InputLabel>
                                    <Select 
                                        labelId="price"
                                        id="priceInput"
                                        label="price"
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                    >
                                        <MenuItem value={"$"}>Very cheap</MenuItem>
                                        <MenuItem value={"$$"}>Cheap</MenuItem>
                                        <MenuItem value={"$$$"}>Moderate</MenuItem>
                                        <MenuItem value={"$$$$"}>Expensive</MenuItem>
                                        <MenuItem value={"$$$$$"}>Very expensive</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="numReviews">Number of Reviews</InputLabel>
                                    <Select 
                                        labelId="numReviews"
                                        id="numReviewsInput"
                                        label="Number of Reviews"
                                        value={numReviews}
                                        onChange={e => setNumberReviews(e.target.value)}
                                    >
                                        <MenuItem value={5}>+</MenuItem>
                                        <MenuItem value={10}>10+</MenuItem>
                                        <MenuItem value={15}>15+</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="avgReview">Average Review</InputLabel>
                                    <Select 
                                        labelId="avgReview"
                                        id="avgReviewInput"
                                        label="Average Review"
                                        value={avgReview}
                                        onChange={e => setAvgReview(e.target.value)}
                                    >
                                        <MenuItem value={3}>3+</MenuItem>
                                        <MenuItem value={4}>4+</MenuItem>
                                        <MenuItem value={5}>5+</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <CustomGrid item xs={12} md={9}>
                    { category ?
                        category.business.map(business => (
                            <CustomCard onClick={() => handleBusinessClick(business)}>
                            <Box>
                                <CardContent>
                                    <Grid container>
                                        <BusinessGridItem item xs={6}>
                                            <Typography variant="h5">
                                               {business.name}
                                            </Typography>
                                            <Typography variant="subititle1">
                                                {business.price_range}
                                            </Typography>
                                            <Link variant="subititle1" href="http://localhost:3000">
                                                {business.website}
                                            </Link>
                                            <Typography variant="subititle1">
                                                {business.phone}
                                            </Typography>
                                            <Description variant="subititle1">
                                                {business.description}
                                            </Description>
                                        </BusinessGridItem>
                                        <BusinessGridItem item xs={6}>
                                            <AverageReview value={averageReviews[business.url]} />
                                            <Typography variant="subititle1">
                                                {business.hours}
                                            </Typography>
                                            <Typography variant="subititle1">
                                                {business.street_address} {business.city}, {business.state} {business.postal_code} {business.country}    
                                            </Typography>
                                        </BusinessGridItem>
                                    </Grid>
                                </CardContent>
                            </Box>
                        </CustomCard>
                        )) : null
                    }
                </CustomGrid>
            </CustomGrid>
        </Layout>
    )
}

export default Category

const CustomGrid = styled(Grid)(() => ({
    margin: '25px auto',
    maxWidth: '95vw'
}));

const BusinessGridItem = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column'
}));
  
const Description = styled(Typography)(() => ({
    color: 'grey'
  }));
  
const CustomCard = styled(Card)(() => ({
    cursor: 'pointer'
  }));

export async function getServerSideProps({query: {slug}}) {
const { data } = await axios.get(`http://localhost:8000/categories?slug=${slug}`)

console.log(data.results[0])

let averageReviews = {}

if (data && data.results && data.results[0].business) {
  for (let i = 0; i < data.results[0].business.length; i++) {
    let totalReviewsStars = 0;
    for (let j = 0; j < data.results[0].business[i].reviews.length; j++) {
      totalReviewsStars = totalReviewsStars + Number(data.results[0].business[i].reviews[j].stars)
    }

    const inverse = 1 / 2

    averageReviews[data.results[0].business[i].url] = Math.round((totalReviewsStars / data.results[0].business[i].reviews.length) / inverse) * inverse
  }
}

return {
    props: {
    category: data.results[0] || null,
    averageReviews: averageReviews
    }
}
}
  