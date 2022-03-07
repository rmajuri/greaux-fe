import { Grid, Avatar, Card, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';
import Layout from '../components/Layout';
import axios from 'axios'

export default function Home({ categories }) {
  return (
    <Layout>
      <CustomGrid container spacing={3}>
        {categories.map(category=> (
                  <Grid item xs={12} md={4}>
                  <Card>
                    <CardHeader avatar={
                      <Avatar aria-label='category'>C</Avatar>
                    } 
                    title={category.name}
                    subheader={`See all ${category.name} businesses`}
                    />
                  </Card>
                </Grid>
        ))
        }
      </CustomGrid>
    </Layout>
  )
}

const CustomGrid = styled(Grid)(() => ({
  margin: '25px auto',
  maxWidth: '95vw',
  display: 'flex',
  justifyContent: 'flex-start',
  alignContent: 'center'
}));

export async function getServerSideProps() {
  const { data } = await axios.get('http://localhost:8000/categories')

  return {
    props: {
      categories: data.results
    }
  }
}