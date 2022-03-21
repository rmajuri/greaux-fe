import { useState } from 'react'
import { Typography, FormControl, TextField, InputLabel, Select, MenuItem, Button } from "@mui/material"
import Layout from "../../../../components/Layout"
import axios from 'axios'

const AddReview = ({ business }) => {
    const [stars, setStars] = useState('3')
    const [title, setTitle] = useState('')
    const [review, setReview] = useState('')

    const getCookie = name => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const submitHandler = () => {
        const csrftoken = getCookie('csrftoken');

        const config ={
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            }
        }

        const body = {
            title,
            content: review,
            stars,
            business: business.url
        }

        const res = axios.post('http://localhost:8000/reviews/', body, config)

        console.log(res)
    }

    return (
        <Layout>
            <div>
                {/* TODO */}
                <Typography variant="h3">
                    Creating a review for {business.name}
                </Typography>
            </div>

            <div>
                <FormControl fullWidth>
                    <InputLabel id="stars">Stars rating out of 5</InputLabel>
                    <Select 
                        labelId="stars"
                        id="starsComponent"
                        label="stars"
                        onChange={e => setStars(e.target.value)}
                        value={stars}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={1.5}>1.5</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={2.5}>2.5</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={3.5}>3.5</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={4}>4.5</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        label="Title"
                        id="titleComponent"
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        label="Tell us about your experience"
                        id="reviewComponent"
                        multiline
                        minRows={4}
                        onChange={e => setReview(e.target.value)}
                        value={review}
                    />
                </FormControl>

                <Button variant="contained" color="primary" onClick={submitHandler}>Submit Review</Button>
            </div>
        </Layout>
    )
}

export default AddReview

export async function getServerSideProps({query: {slug}}) {
    const { data } = await axios.get(`http://localhost:8000/businesses?slug=${slug}`)

    return {
        props: {
            business: data.results[0] || null,
        }
    }
}