import PropTypes from 'prop-types';


const NewBlog = ({ handlesubmit }) => {
    return (
        <>
            <h2>Create new Blog</h2>
            <form onSubmit={handlesubmit}>
                <div>
                    <label htmlFor="title">title</label>
                    <input type="text" name="title" id='title'/>
                </div>
                <div>
                    <label htmlFor="author">author</label>
                    <input type="text" name="author" id='author'/>
                </div>
                <div>
                    <label htmlFor="url">url</label>
                    <input type="text" name="url" id='url'/>
                </div>
                <input type="submit" value="submit" id='submit'/>
            </form>
        </>
    )
}

NewBlog.propTypes = {
    handlesubmit: PropTypes.func.isRequired,
};

export default NewBlog