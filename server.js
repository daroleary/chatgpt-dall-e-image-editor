const PORT = 8000;
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

const { Configuration, OpenAIApi } = require("openai");
const { reset } = require("nodemon");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/images", async (req, res) => {
  const prompt = req.body.message;

  try {
    await openai
      .createImage({
        prompt: prompt,
        n: 3,
        size: "1024x1024",
      })
      .then((completion) => {
        res.send(completion.data.data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
