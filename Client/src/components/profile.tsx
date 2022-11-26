import '../css/profile.css';
import { User} from "@auth0/auth0-react";
import { useAppSelector } from '../features/hooks';
import apiService from '../services/apiService';
import { Buffer } from "buffer";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { refreshData } from '../features/user_slice';

function Profile() {
  const [username,setUsername] = useState('');
  const user  = useAppSelector((state)=>state.user);
  const [img,setImg] = useState()

  useEffect(()=>{
    const base64String:any = Buffer.from(user.avatar.data.data).toString("base64");
    setImg(base64String);
  },[user])
  function changeUsername(e:any){ //TODO if type is EVENT, value not recognized
    const { value } = e.target;
    setUsername(value);
  }
  const dispatch = useDispatch();
  async function updateProfile(e:any){
    e.preventDefault();
    console.log(username)
    const {user,message} = await apiService.updateProfile({username: username});
    console.log(user)
    if (user) dispatch(refreshData(user));
    else console.log(message);
  }
  return (
    <div>
      <div className='logo-img'>
        <img src={"data:image/jpeg;base64,"+ img} />
      </div>
      {
        <h1>HELLO {user.username ?(user as User).username: 'THERE'},</h1>
      }
      <input
          type="text"
          placeholder={user.username}
          name="username"
          onChange={changeUsername}
        />
      <button onClick={updateProfile} >
          &nbsp;Save&nbsp;
        </button>
      <h1>Your learning progress</h1>
      <h2>Sorting Algorithms: {user.sortingPath}</h2>
      <h2>Path Finding Algorithms: {user.pathFindPath}</h2>
      <h1>Your games' stats</h1>
      <h2>Wins: {user.overallWins.wins}</h2>
      <h2>Losses: {user.overallWins.losses}</h2>
      <h2>Draws: {user.overallWins.draws}</h2>
      {user.games?
      <div>
        <h2>Game history</h2>
        <p>user.games.map</p>
      </div>
      :
      <h2>No games played yet</h2>}
    </div>
  );
}

export default Profile;