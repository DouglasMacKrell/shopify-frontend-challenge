import React from 'react'
import './ResponseCard.scss'

const ResponseCard = ({response, prompt}) => {
  return (
    <div className="response-card">
      <div className="response-card__container">
        <h3 className="response-card__label">Prompt:</h3>
        <p className="response-card__text">{prompt}</p>
      </div>
      <div className="response-card__container response-card__response">
        <h3 className="response-card__label">Response:</h3>
        <p className="response-card__text">{response}</p>
      </div>
    </div>
  );
}

export default ResponseCard