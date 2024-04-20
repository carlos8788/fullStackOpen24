export const getUser = () => {
  const data = JSON.parse(window.localStorage.getItem('user'));
  const token = JSON.parse(window.localStorage.getItem('token'));
  // console.log(data, 'data')
  if (data) {
    return {
      name: data?.name,
      username: data?.username,
      id: data?.id,
      token: token
    }
  }
  return null
}

export const setLogin = (user) => {
  window.localStorage.setItem('user', JSON.stringify({ username: user.username, name: user.name, id: user.id }));
  window.localStorage.setItem('token', JSON.stringify(user.token));
}

export const setLogout = () => {
  window.localStorage.clear();
}