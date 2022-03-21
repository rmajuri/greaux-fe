import { useState } from 'react'
import { Avatar, Box, Button, Card, CardContent, Grid, Divider, FormControl, InputLabel, Select, MenuItem, Link, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography } from "@mui/material"
import Layout from "../../../components/Layout"
import { styled } from '@mui/material/styles';
import axios from "axios";
import AverageReview from "../../../components/AverageReview";

const Business = ({ business, averageReview }) => {

    const [reviewFilter, setReviewFilter] = useState('')

    return (
        <Layout>
            <CustomGrid container>
                <Grid item xs={12} md={6}>
                    <Typography variant="h2">{business.name}</Typography>
                    <Typography variant="h4">{business.price_range}</Typography>
                    <AverageReview value={averageReview} />

                    <div>
                        <Button variant="contained" color="primary">Write a review</Button>
                    </div>

                    <div><Typography variant="p">{business.description}</Typography></div>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card>
                        <List>
                            <ListItem>
                                <ListItemText primary="Website" secondary={business.website} />
                            </ListItem>    
                        </List>    
                        <List>
                            <ListItem>
                                <ListItemText primary="Address" secondary={`${business.street_address} ${business.city}, ${business.state}`} />
                            </ListItem>    
                        </List>    
                        <List>
                            <ListItem>
                                <ListItemText primary="Phone" secondary={business.phone} />
                            </ListItem>    
                        </List>    
                        <List>
                            <ListItem>
                                <ListItemText primary="Hours" secondary={business.hours} />
                            </ListItem>    
                        </List>    
                    </Card>
                </Grid>
            </CustomGrid>

            <Grid container>
                <Grid item xs={12} md={3}>
                <Box>
                    <Grid container>
                    <Grid item xs={12}>
                        <Typography variant='h5'>Filter the Reviews</Typography>
                        <Divider />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth>
                        <InputLabel id='reviews'>Review</InputLabel>
                        <Select
                            labelId='reviews'
                            id='reviewsComponent'
                            value={reviewFilter}
                            onChange={e => setReviewFilter(e.target.value)}
                        >
                            <MenuItem value={0}>0+ Stars</MenuItem>
                            <MenuItem value={1}>1+ Stars</MenuItem>
                            <MenuItem value={2}>2+ Stars</MenuItem>
                            <MenuItem value={3}>3+ Stars</MenuItem>
                            <MenuItem value={4}>4+ Stars</MenuItem>
                            <MenuItem value={5}>5 Stars</MenuItem>
                        </Select>
                        </FormControl>
                    </Grid>

                    <Grid item>
                        <Button variant='outlined' color='secondary' onClick={() => setReviewFilter('')}>Clear Filters</Button>
                    </Grid>
                    </Grid>
                </Box>
                </Grid>

                <Grid item xs={12} md={8}>
                {business && business.reviews && business.reviews.map(review => (
                    reviewFilter <= review.stars && (
                    <Card>
                        <Box>
                        <CardContent>
                            <AverageReview value={review.stars} />
                            <Typography variant='h5'>{review.title}</Typography>
                            <Typography variant='subtitle1'>{review.content}</Typography>
                        </CardContent>
                        </Box>
                    </Card>
                    )
                    ))}
                </Grid>
            </Grid>
        </Layout>
    )
}

export default Business
 

export async function getServerSideProps({query: {slug}}) {
    const { data } = await axios.get(`http://localhost:8000/businesses?slug=${slug}`)

    console.log(data.results[0])

    let averageReview = null;

    if (data && data.results && data.results[0].reviews) {
        let totalReviewsStars = 0;

        for (let i = 0; i < data.results[0].reviews.length; i++) {
            totalReviewsStars = totalReviewsStars + Number(data.results[0].reviews[i].stars)
        }

        const inverse = 1 / 2

        averageReview = Math.round((totalReviewsStars / data.results[0].reviews.length / inverse) * inverse)
    }

    return {
        props: {
        business: data.results[0] || null,
        averageReview: averageReview
        }
    }
}

const CustomGrid = styled(Grid)(() => ({
    margin: '25px auto',
    maxWidth: '95vw'
}));