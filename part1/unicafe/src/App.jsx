import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={() => handleClick(text)}>{text}</button>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <>
      <tr>
        <td>{text}</td> 
        <td>{value}</td>
      </tr>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const valueGood = 1;
  const valueNeutral = 0;
  const valueBad = -1;

  const all = good + neutral + bad;
  const average = ((good * valueGood) + (neutral * valueNeutral) + (bad * valueBad)) / all;
  const percentage = all > 0 ? (100 * good / all) : 0;

  return (
    <div>
        <table>
          <tbody>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <tr>
              <td>all</td>
              <td>{all}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{average || 0}</td>
            </tr>  
            <tr>
              <td>percentage</td>
              <td>{percentage} %</td>
            </tr>
          </tbody>
        </table>
      </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (feedback) => {
    if (feedback === 'good') setGood(good + 1);
    if (feedback === 'neutral') setNeutral(neutral + 1);
    if (feedback === 'bad') setBad(bad + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleClick} text={'good'} />
      <Button handleClick={handleClick} text={'neutral'} />
      <Button handleClick={handleClick} text={'bad'} />
      {good === 0 && neutral === 0 && bad === 0 ? (
        <div><p>No feedback given</p></div>
      ) : (
        <div>
          <h1>statistics</h1>
          <Statistics good={good} neutral={neutral} bad={bad}/>
      </div>
      )}
    </div>
  )
}

export default App;