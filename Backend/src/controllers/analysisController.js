import axios from "axios";

export const analyzeResponse = async (req, res) => {
  try {
    const { question, response } = req.body;

    if (!question || !response) {
      return res
        .status(400)
        .json({ error: "Both question and response are required." });
    }

    // Send data to Python API (Flask)
    const pythonResponse = await axios.post(process.env.FLASK_API_URL, {
      question,
      response,
    });
    console.log("Python response:", pythonResponse.data);
    res.json(pythonResponse.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
