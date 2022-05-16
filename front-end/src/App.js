import './App.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ResponseCard from './components/response-card/ResponseCard';

function App() {

  const [prompt, setPrompt] = useState('');
  const [engine, setEngine] = useState("text-curie-001");
  const [history, setHistory] = useState([]);
  const [engines, setEngines] = useState([]);

  useEffect(() => {
    if (sessionStorage.history) {
      setHistory(JSON.parse(sessionStorage.history))
    }
    if (sessionStorage.engines) {
      setEngines(JSON.parse(sessionStorage.engines))
    }
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3001/api/engines')
      .then((response) => {
        const fetchedEngines = response.data.data.map((singleEngine) => {
          return (
            singleEngine.id
          )
        })
        setEngines(fetchedEngines)
        sessionStorage.setItem("engines", JSON.stringify(fetchedEngines));
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const userPrompt = { prompt: prompt, engine: engine };
    axios.post('http://localhost:3001/api/prompt', userPrompt)
      .then((response) => {
        const currResponse = {
          prompt: prompt,
          response: response.data.choices[0].text,
          id: Math.floor(
            Math.random() * Math.floor(Math.random() * Date.now())
          ),
        };
        const data = [currResponse, ...history];

        setHistory(data)
        sessionStorage.setItem("history", JSON.stringify(data));
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='main-container'>
      <div className="create">
      <h1 className='create__header'>Fun with AI</h1>
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
            {engines.length && engines.map((singleEngine) => {
              return (
                <option value={singleEngine} key={singleEngine}>{singleEngine}</option>
              )
            })}
          </select>
          <button>Submit</button>
        </form>
        <h1 className='create__header'>Responses</h1>
        <ul className='create__history'>
          {history.length > 0 && history.map((reply) => {
            return (
              <li key={reply.id}>
                <ResponseCard response={reply.response} prompt={reply.prompt} />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
