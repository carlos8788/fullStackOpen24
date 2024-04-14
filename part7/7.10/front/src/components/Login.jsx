import PropTypes from 'prop-types';



const Login = ({handleSubmit}) => {

    return (
        <>
            <h2>Log in to application</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id='username'/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id='password'/>
                </div>
                <input type="submit" value={'Log in'} id='loginBtn'/>
            </form>
        </>
    )
}
Login.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };
export default Login