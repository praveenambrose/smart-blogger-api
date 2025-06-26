const { Ollama } = require('ollama');

async function ollamaResponse(topic) {
    const client = new Ollama();
    try {
        const result = await client.generate({
            model: "smart-blogger",
            prompt: topic
        });
        return result.response.split('\n');
    } catch (err) {
        console.error("Error communicating with Ollama:", err);
    }
}

module.exports = ollamaResponse;