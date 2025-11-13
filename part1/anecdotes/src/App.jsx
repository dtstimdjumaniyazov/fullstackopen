import { useState } from 'react'


const getRandomInt = (max) => {
  return Math.floor(Math.random() * max)
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Vote = ({voteQuantity}) => (
  <>has {voteQuantity} votes</>
)
  
const createVotesArray = (arr) => arr.map(() => 0);


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(createVotesArray(anecdotes));

  const handleVotes = () => {
    const newVotes = [...vote]
    newVotes[selected] += 1;
    setVote(newVotes);
    // console.log('New Votes', newVotes);
  }
   
  const handleNext = () => {
    setSelected(getRandomInt(anecdotes.length));
  }
  
  const maxVotes = Math.max(...vote);
  const maxIndex = vote.indexOf(maxVotes);
  // console.log(maxIndex);

  return (
    <div>
      <h1>Anectode of the day</h1>
      {anecdotes[selected]}
      <br/>
      <Vote voteQuantity={vote[selected]} />
      <br/>
      <Button onClick={() => handleVotes(anecdotes[selected])} text='vote'/>
      <Button onClick={() => handleNext()} text='next anectode' />
      
      <h1>Anectode with most votes</h1>
      {anecdotes[maxIndex]}
      <br/>
      has {maxVotes} votes
    </div>
  )
}

export default App