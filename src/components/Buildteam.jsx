import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { isAddedBy } from '../lib/auth'

const Buildteam = () => {
    const navigate = useNavigate()

    const [players, setPlayers] = useState([])
    const [money, setMoney] = useState(20000000)
    const [team, setTeam] = useState([])
  
    useEffect(() => {
      async function fetchPlayers() {
        const resp = await fetch(`/api/players`)
        const data = await resp.json()
        console.log(data)
        setPlayers(data)
      }
      
      fetchPlayers()
    }, [])

    const handleAddPlayer = (index) => {
        if (money >= players[index].playerCost) {
          const newTeam = structuredClone(team)
          newTeam.push(players[index])
          setTeam(newTeam)
    
          const payment = money - players[index].playerCost
          setMoney(payment)
    
        } else {
          return "not enough money"
        }
      }
    
      async function handleSubmit(e) {
        //e.preventDefault()
        try {
          // ! Get our token from localStorage
          const token = localStorage.getItem('token')
          // ! Attach the token as a header when posting our new cheese
          const { data } = await axios.post('/api/teams', {team}, {
            headers: { Authorization: `Bearer ${token}` }
          })
          console.log(data)
          // ! Navigate to the cheeses page
          navigate('/')
        } catch (err) {
          console.log(err.response.data)
        }
      }

    console.log(team)

    return <div className="cardContainer">
        <h1>${money}</h1>
    <div className='team-container'>
    <button onClick={() => handleSubmit()}>Submit Team</button>
      <ul>
        <h1>Team</h1>
        {team.map((player, index) => {
          return <li key={index}>
            <img src={player.image} />

            </li>})}</ul>
    </div>


        {players.map((player, index) => {
            return <div key={index}>
                <h2>
                {player.name}
                </h2>
                <img src={player.image} />
                <button onClick={() => {handleAddPlayer(index)}}>Add to team</button>
            </div>
        }
    )}
    </div>
  
  }
  
  export default Buildteam
  
  