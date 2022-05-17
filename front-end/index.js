const PORT = process.env.PORT || 3001;
const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors())

app.use(express.static(path.join(__dirname, "./build")));


app.get("/api/engines", (req, res) => {
  const headers = {
    "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
    };

    axios.get("https://api.openai.com/v1/engines", { headers })
      .then((response) => {
        res.json(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
      
})

app.post("/api/prompt", (req, res) => {
    const body = {
      prompt: req.body.prompt,
      temperature: 0.5,
      max_tokens: 128,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_SECRET}`,
  };

  axios.post(`https://api.openai.com/v1/engines/${req.body.engine}/completions`, body, { headers } )
  .then((response) => {
    res.json(response.data)
  }).catch((error) => {
    console.log(error)
  })
  
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))