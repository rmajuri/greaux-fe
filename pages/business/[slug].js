import { Grid, Card, Typography, Button, List, ListItem, ListItemText } from "@mui/material"
import Layout from "../../components/Layout"
import { styled } from '@mui/material/styles';
import axios from "axios";
// import { useRouter } from 'next/router'
import AverageReview from "../../components/AverageReview";

const Business = ({ business, averageReview }) => {

    // const router = userRouter()

    // const handleBusinessClick = business => {
    //     router.push(`/business/${business.slug}`)
    // }

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