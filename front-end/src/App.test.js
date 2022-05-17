import { render, fireEvent, getByText, findByText, screen, getByTestId, queryByTestId, queryByText, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App, { handleSubmit } from './App';
import userEvent from "@testing-library/user-event";
import ResponseCard from './components/response-card/ResponseCard.jsx'
import LoadingView from './components/loadingView/LoadingView';
import mockAxios from 'axios'

const setup = () => {
  const utils = render(<App />)
  const input = utils.getByTestId('prompt-textarea')
  return {
    input,
    ...utils
  }
}

// jest.mock('axios', () => ({

// }));


describe('App consumes OpenAI and renders ResponseCards correctly', () => {

  it('renders App properly', () => {
    render(<App />)
  })

  it('has the engine select box', () => {
    const {getByTestId} = render(<App />)
    expect(getByTestId('engine-select')).toBeInTheDocument();
  })

  it('displays the LoadingView on pending API call', async () => {
    const {input} = setup()
    expect(input.value).toBe('') //test empty input
    fireEvent.change(input, {target: {value: 'Tell me a story about a radical shark'}})
    expect(input.value).toBe('Tell me a story about a radical shark') //test input stores value
    
    userEvent.click(screen.getByText('Submit')) // grab submit button and simulate click event

    await waitFor(() => expect(screen.getByTestId("loading-view")).toBeInTheDocument()); // test if Loading View has displayed
  })
  
  // it('removes spinner after API call has returned and new ResponseCard has loaded', async () => {
  //   const { input } = setup();
  //   expect(input.value).toBe(""); //test empty input
  //   fireEvent.change(input, {
  //     target: { value: "Tell me a story about a radical shark" },
  //   });
  //   expect(input.value).toBe("Tell me a story about a radical shark"); //test input stores value

  //   userEvent.click(screen.getByText("Submit")); // grab submit button and simulate click event

  //   await waitForElementToBeRemoved(() => screen.queryByTestId("loading-view"));
  // })
})
