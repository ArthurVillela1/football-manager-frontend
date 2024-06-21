import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { baseUrl } from '../config';



  const Home = () => {

    const [teams, setTeams] = useState([])
    
    useEffect(() => {
      const fetchTeams = async () => {
        try{
          const response = await axios.get(`${baseUrl}/teams`)
          setTeams(response.data)
        }catch(err){
          console.log('Did not fetch')
        }
      }
      fetchTeams()
    },[])


    return (
      <div className='teams-display'>
        {teams.map((team) => (
          <div key={team._id} className='team-box'>
            <h2>{team.manager.username}'s Team</h2>
            {team.manager.username === "admin"? (
              <p>Budget: {team.budget}</p>
            ) : (
              <p>Budget: ${team.budget}</p>
            )}
            <ul className='players-list'>
              {team.players.map((player) => (
                <li key={player._id} className='player-item'>
                  <img className='player-card' src={player.image}  />
                  
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };
  export default Home