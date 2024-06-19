import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { isAddedBy } from '../lib/auth'
import "../App.css"

const Buildteam = () => {

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
    const players = filterPlayers()
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

  console.log(team)

  const handleRemovePlayer = (removeIndex) => {
    const playerToRemove = team[removeIndex]
    const newTeam = structuredClone(team).filter((player, index) => index !== removeIndex)

    setMoney(money + playerToRemove.playerCost)
    setTeam(newTeam)
  }

  async function handleSubmit(e) {
    if (team.length === 7) {
      try {
        const postedteam = {}
        postedteam.budget = money
        postedteam.players = team
        // ! Get our token from localStorage
        const token = localStorage.getItem('token')
        // ! Attach the token as a header when posting our new cheese
        const { data } = await axios.post('/api/teams', postedteam, {
          headers: { Authorization: `Bearer ${token}` }
        })
        console.log(data)
        // ! Navigate to the cheeses page
        //navigate('/')
      } catch (err) {
        console.log(err.response.data)
      }
    } else {
      console.log('You should add 6 players to submit your team')
    }

  }

  function filterPlayers() {
    const filteredPlayers = players.filter(player => {
      const strikerFilled = team.filter(player => player.position === 'Striker').length >= 2
      const defenderFilled = team.filter(player => player.position === 'Defender').length >= 2
      const midfielderFilled = team.filter(player => player.position === 'Midfielder').length >= 2
      const GoalkeeperFilled = team.filter(player => player.position === 'Goalkeeper').length >= 2

      const isPlayerAdded = team.filter(_player => player.name === _player.name).length > 0

      if (isPlayerAdded) {
        return false
      }

      if (player.position === "Striker" && strikerFilled) {
        return false
      }

      if (player.position === "Midfielder" && midfielderFilled) {
        return false
      }

      if (player.position === "Defender" && defenderFilled) {
        return false
      }

      if (player.position === "Goalkeeper" && GoalkeeperFilled) {
        return false
      }

      return true
    })
    return filteredPlayers
  }

  return <>
    <div><b>Budget:</b> ${money}</div>
    <div><b>Choose 7 players for your team: 1 Goalkeeper, 2 Defenders, 2 Midfielders and 2 Strikers </b></div>
    <div className="cardContainer">
      <div className='team-container'>
        <button onClick={() => handleSubmit()}>Submit Team</button>
        <ul>
          <h1>Team</h1>
          {team.map((player, index) => {
            return <li key={index}>
              <img src={player.image} />
              <h1>{player.name} {player.position}</h1>
              <button onClick={() => handleRemovePlayer(index)}>Remove Player</button>
            </li>
          })}</ul>
      </div>
      {filterPlayers().map((player, index) => {
        return <div key={index}>
          <h2>
            {player.name} {player.position}
          </h2>
          <img src={player.image} />
          <button onClick={() => { handleAddPlayer(index) }}>Add to team</button>
        </div>
      }
      )}
    </div>
  </>
}

export default Buildteam
