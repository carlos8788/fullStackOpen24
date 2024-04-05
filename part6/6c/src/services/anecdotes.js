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
    console.log(`Updating vote for ID: ${id}`, object);
    const result = await axios.put(`${baseUrl}/${id}`, object);
    console.log('Update result:', result.data);
    return result.data;
  } catch (error) {
    console.error('Error updating vote:', error);
    throw error; // O manejar el error de forma adecuada
  }
}


export default { getAll, createNew, updateVote }