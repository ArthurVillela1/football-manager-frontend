import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "../App.css"
import { toast } from 'react-toastify';
import React from 'react'
import { baseUrl } from '../config';

const Buildteam = () => {

  const navigate = useNavigate()

  const [players, setPlayers] = useState([])
  const [money, setMoney] = useState(0)
  const [team, setTeam] = useState([])

  useEffect(() => {
    async function fetchPlayers() {
      const resp = await fetch(`${baseUrl}/players`)
      const data = await resp.json()
      console.log(data)
      setPlayers(data)
    }
    async function fetchTeam() {
      const token = localStorage.getItem("token")
      const { data } = await axios.get(`${baseUrl}/userteam`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTeam(data.players)
      setMoney(data.budget)
    }

    fetchTeam()
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
      toast.error('You dont have enough money');
    }
  }

  const handleRemovePlayer = (removeIndex) => {
    const playerToRemove = team[removeIndex]
    const newTeam = structuredClone(team).filter((player, index) => index !== removeIndex)

    setMoney(Number(money) + Number(playerToRemove.playerCost))
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
        const { data } = await axios.put('/api/teams', postedteam, {
          headers: { Authorization: `Bearer ${token}` }
        })
        console.log(data)
        // ! Navigate to the cheeses page
        navigate('/')
      } catch (err) {

        console.log(err)

        // console.log(err.response.data)

      }
    } else {
      toast.error('You Need 7 Players To Submit ! ');
      console.log()
    }
  }

  function filterPlayers() {
    const filteredPlayers = players.filter(player => {
      const strikerFilled = team.filter(player => player.position === 'Striker').length >= 2
      const defenderFilled = team.filter(player => player.position === 'Defender').length >= 2
      const midfielderFilled = team.filter(player => player.position === 'Midfielder').length >= 2
      const GoalkeeperFilled = team.filter(player => player.position === 'Goalkeeper').length >= 1
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
      <h1 id="team"><b>Team</b></h1>
      <br></br>
    <ul className='main-container'>
      <div className='create-team-container'>

        {team.map((player, index) => {
          return <li key={index}>
            <img className="card-create" src={player.image} />
            <h2>{player.position}</h2>
            <button className="button" onClick={() => handleRemovePlayer(index)}>Remove Player</button>
          </li>
        })}

      </div>
    </ul>
    <br></br>
    <button id="savebutton" className="button" onClick={() => handleSubmit()}>Save Team</button>
    <div id="budget"><b>Budget:</b> ${new Intl.NumberFormat().format(money)}</div>
    <div id="rules"><b>Choose 7 players for your team: 1 Goalkeeper, 2 Defenders, 2 Midfielders and 2 Strikers </b></div>
    <br></br>
    <div className="cardContainer">
      <div className='team-container'>
        {filterPlayers().map((player, index) => {
          return <div className="center-of-card" key={index}>
            <img className="card" src={player.image} />
            <h2>{player.position}</h2>
            <h2 class='playerCost'>
              ${new Intl.NumberFormat().format(player.playerCost)}
            </h2>
            <button className="button" onClick={() => { handleAddPlayer(index) }}>Add to team</button>
            <br></br>
          </div>
        }
        )}
      </div>
    </div>
  </>
}

export default Buildteam

