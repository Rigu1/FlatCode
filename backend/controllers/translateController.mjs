import axios from 'axios';

export const translateText = async (req, res) => {
  const { text, target } = req.body;
  const apiKey = process.env.GOOGLE_API_KEY;
  const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  console.log('Received request:', { text, target });

  try {
    const response = await axios.post(apiUrl, {
      q: text,
      target: target,
      format: 'text'
    });

    console.log('Google API response:', response.data);

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error during API request:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({ error: error.response ? error.response.data.error.message : 'Failed to fetch translation' });
  }
};
