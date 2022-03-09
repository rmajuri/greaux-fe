import { Grid, Card, CardContent, Typography, Box, Link } from "@mui/material"
import Layout from "../../components/Layout"
import { styled } from '@mui/material/styles';
import axios from "axios";
import { useRouter } from 'next/router'

const Category = ({ category }) => {

    const router = useRouter()

    const handleBusinessClick = business => {
        router.push(`/business/${business.slug}`)
    }

    return (
        <Layout>
            <CustomGrid container>
                <Grid item xs={12} md={3}>
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
                                            <Typography variant="h5">
                                                Reviews
                                            </Typography>
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

return {
    props: {
    category: data.results[0] || null
    }
}
}
  