import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, caption}) => {
  return (
    <>
      <button onClick={onClick}>{caption}</button>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = () => (good + neutral + bad)

  const average = () => {
    return (
      (good - bad) / all()
    )
  }
  
  const positive = () => {
    return (
      (good / all()) * 100
    )
  }

  if (!all()) {
    return <div>
      <>No feedback given</>
    </div>
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text={'good'} value={good} />
          <StatisticLine text={'neutral'} value={neutral} />
          <StatisticLine text={'bad'} value={bad} />
          <StatisticLine text={'average'} value={average()} />
          <StatisticLine text={'positive'} value={positive() + ' %'} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>
        give feedback
      </h1>

      <Button onClick={handleGood} caption='good' />
      <Button onClick={handleNeutral} caption='neutral' />
      <Button onClick={handleBad} caption='bad' />
      
      <h1>
        statistics
      </h1>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))