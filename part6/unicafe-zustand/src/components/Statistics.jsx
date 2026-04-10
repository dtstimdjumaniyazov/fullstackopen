import { useCounterGood, useCounterNeutral, useCounterBad } from "../store/store"


const Statistics = () => {
  const good = useCounterGood()
  const neutral = useCounterNeutral()
  const bad = useCounterBad()
  const all = (good + neutral + bad)
  const average = ((good) + (neutral * 0) + (bad * (-1))) / all
  const positive = all > 0 ? (100 * good / all) : 0
  
  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <tr><td>good</td><td>{good}</td></tr>
          <tr><td>neutral</td><td>{neutral}</td></tr>
          <tr><td>bad</td><td>{bad}</td></tr>
          <tr><td>all</td><td>{isNaN(all) ? 0 : all}</td></tr>
          <tr><td>average</td><td>{isNaN(average) ? 0 : average}</td></tr>
          <tr><td>positive</td><td>{isNaN(positive) ? 0 : positive}</td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics
