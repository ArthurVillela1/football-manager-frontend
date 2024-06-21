import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { isAddedBy } from '../lib/auth'
import { baseUrl } from '../config';

const Players = () => {
    const navigate = useNavigate()
  
    const { playerId } = useParams()
    const [player, setPlayer] = useState({})
  
    useEffect(() => {
      async function fetchPlayers() {
        const resp = await fetch(`${baseUrl}/players/${playerId}`)
        const data = await resp.json()
        setPlayer(data)
        
      }
      
      fetchPlayers()
    }, [playerId])

    console.log(player)
  
    async function handleClick() {
      try {
        const token = localStorage.getItem('token')
  
        await axios.delete(`/api/players/${playerId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
  
        //navigate('/')
      } catch (err) {
        console.log(err.response.data)
      }
    }
  
    if (!player.name) {
      return <div className="section">
        <div className="container">
          <div className="title">
            Loading ...
          </div>
        </div>
      </div>
    }
  
    return <div className="section">
      <div className="container">
        <h1 className="title">{player.name}</h1>
      </div>
      <div className="container">
        {isAddedBy(player.addedBy) && <button className="button is-danger" onClick={handleClick}>Delete Player</button>}
      </div>
    </div>
  }
  
  export default Players