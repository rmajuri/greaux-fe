import { Grid, Avatar, Card, CardHeader } from '@mui/material';
import { styled } from '@mui/material/styles';
import Layout from '../components/Layout';
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Home({ categories }) {
  const router = useRouter()

  return (
    <Layout>
      <CustomGrid container spacing={3}>
        {categories.map(category=> (
                  <CustomGridItem item xs={12} md={4}>
                    <CustomCard onClick={() => router.push(`/categories/${category.slug}`)}>
                      <CardHeader avatar={
                        <Avatar aria-label='category'>C</Avatar>
                      } 
                      title={category.name}
                      subheader={`See all ${category.name} businesses`}
                      />
                    </CustomCard>
                </CustomGridItem>
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

const CustomGridItem = styled(Grid)(() => ({
  paddingLeft: 0,
  paddingRight: '24px'
}));

const CustomCard = styled(Card)(() => ({
  cursor: "pointer"
}));

export async function getServerSideProps() {
  const { data } = await axios.get('http://localhost:8000/categories')

  return {
    props: {
      categories: data.results
    }
  }
}
