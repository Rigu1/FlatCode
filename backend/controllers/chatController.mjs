import axios from 'axios';

const openaiApiKey = process.env.OPENAI_API_KEY;

export const chatHandler = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('Received prompt:', prompt);

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 100
        }, {
            headers: {
                'Authorization': `Bearer ${openaiApiKey}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('OpenAI response:', response.data);

        res.json(response.data);
    } catch (error) {
        console.error('Error during OpenAI API request:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
        res.status(500).json({ error: 'Failed to fetch response from OpenAI API' });
    }
};
