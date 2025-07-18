import axios from 'axios';
import FormData from 'form-data';

export const identifyPlant = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }
    const formData = new FormData();
    formData.append("image", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });
    const response = await axios.post("https://img-recognition-3al1.onrender.com/identify", formData, {
      headers: formData.getHeaders(),
    });
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error("error to identifying img :", error.message);
    console.error("🔥 Axios error response:", error?.response?.data || 'No response data');
    res.status(500).json({ error: "Something went wrong" });
  }
};