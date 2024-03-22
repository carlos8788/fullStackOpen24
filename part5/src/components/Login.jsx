
const Login = ({handleSubmit}) => {

    return (
        <>
            <h2>Log in to application</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" />
                </div>
                <input type="submit" value={'Log in'} />
            </form>
        </>
    )
}
export default Login