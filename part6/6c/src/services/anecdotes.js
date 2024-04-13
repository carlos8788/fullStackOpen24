import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, important: false, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateVote = async (id, object) => {
  try {
    const result = await axios.patch(`${baseUrl}/${id}`, object);
    return result.data;
  } catch (error) {
    console.error('Error updating vote:', error);
    throw error; 
  }
}


export default { getAll, createNew, updateVote }