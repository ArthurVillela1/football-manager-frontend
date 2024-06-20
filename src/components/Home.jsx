import React, { useEffect, useState} from 'react'
import axios from 'axios'



  const Home = () => {

    const [teams, setTeams] = useState([])
    
    useEffect(() => {
      const fetchTeams = async () => {
        try{
          const response = await axios.get('/api/teams')
          setTeams(response.data)
        }catch(err){
          console.log('Did not fetch')
        }
      }
      fetchTeams()
    },[])


    return (
      <div>
        <h1>Teams</h1>
        {teams.map((team) => (
          <div key={team._id}>
            <h2>{team.manager.username}'s Team</h2>
            <p>Budget: ${team.budget}</p>
            <ul>
              {team.players.map((player) => (
                <li key={player._id}>
                  {player.name} - {player.position}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };
  
  
  export default Home