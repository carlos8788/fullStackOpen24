import PropTypes from 'prop-types';
import { Typography, TextField, Button, Box, Grid } from '@mui/material';

const NewBlog = ({ handleSubmit, cancel }) => {
    return (
        <>
            <Typography component="h2" variant="h6">
                Create New Blog
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <TextField
                            label="Title"
                            variant="outlined"
                            name="title"
                            id="title"
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="Author"
                            variant="outlined"
                            name="author"
                            id="author"
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label="URL"
                            variant="outlined"
                            name="url"
                            id="url"
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>

        </>
    );
}

NewBlog.propTypes = {
    handlesubmit: PropTypes.func.isRequired,
};

export default NewBlog