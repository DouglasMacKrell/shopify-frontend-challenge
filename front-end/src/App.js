import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [prompt, setPrompt] = useState('');
  const [engine, setEngine] = useState('engine1')
  const [aiResponse, setAiResponse] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    const userPrompt = { prompt: prompt, engine: engine };
    console.log(userPrompt)
    // fetch('http://localhost:3001/prompt', {
    //   method: 'POST',
    //   body: JSON.stringify(userPrompt)
    // })
    //   .then((response) => {
    //     console.log(response)
    //   })
    axios.post('http://localhost:3001/prompt', userPrompt)
      .then((response) => {
        console.log(response.data.choices)
        console.log(response.data.choices[0].text)
        setAiResponse(response.data.choices[0].text)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // useEffect(() => {
  //   const askQuestion = (query) => {

  //   }
  // })

  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
        <label>Enter prompt</label>
        <textarea
          required
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
        <select
          value={engine}
          onChange={(e) => setEngine(e.target.value)}
        >
          <option value="engine1">Engine 1</option>
          <option value="engine2">Engine 2</option>
        </select>
        <button>Submit</button>
      </form>
      <p>{aiResponse}</p>
    </div>
  );
}

export default App;
