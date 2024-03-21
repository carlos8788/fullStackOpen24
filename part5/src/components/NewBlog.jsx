const NewBlog = ({ handlesubmit }) => {
    return (
        <>
            <h2>Create new Blog</h2>
            <form onSubmit={handlesubmit}>
                <div>
                    <label htmlFor="title">title</label>
                    <input type="text" name="title" />
                </div>
                <div>
                    <label htmlFor="author">author</label>
                    <input type="text" name="author" />
                </div>
                <div>
                    <label htmlFor="url">url</label>
                    <input type="text" name="url" />
                </div>
                <input type="submit" value="submit" />
            </form>
        </>
    )
}
export default NewBlog