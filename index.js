import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/ia', async (req, res) => {
  const { text } = req.body;
  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama3',
      prompt: text,
      stream: false,
    });
    const respData = response.data.response.toString();
    res.send(respData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao processar a requisição');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});