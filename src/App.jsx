import { Fragment, useState, /* useEffect */ } from 'react';
import Axios from 'axios';
import './App.css';

function App() {

const [usernameReg, setusernameReg] = useState()
const [userpasswordReg, setpasswordReg] = useState()

const [nombre, setnombre] = useState('')
const [password, setpassword] = useState('')

const [log, setlog] = useState('')

Axios.defaults.withCredentials = true; 

const register = () =>{
Axios.post('http://localhost:3001/register',
{
  nombre: usernameReg,
  password: userpasswordReg
}).then((response)=> {
console.log(response)
});
}

const login = () =>{

  Axios.post('http://localhost:3001/login',
  {
    nombre: nombre,
    password: password
  }).then((response)=> {
  if (response.data.message) {
    setlog(response.data.message)
    
  }else{
    setlog(response.data[0].nombre)
  }
  });
  }

  
 useEffect(() => {
  Axios.get('http://localhost:3001/login').then((response) => {
    if (response.data.loggedIn == true) {
      setlog(response.data.user[0].nombre)
    }
   
  })
}, []) 


  return (
    <Fragment>
      <div >
        <div>
          <h1>Registration</h1>
          <label>username</label>
          <input type="text" onChange={(e)=> {setusernameReg(e.target.value) }}  />
          <label>password</label>
          <input type="text"  onChange={(e)=> {setpasswordReg(e.target.value) }} />
          <button  onClick={register} >Register</button>
        </div>





        <div className='login'>
          <h1>login</h1>
          <input type="text" placeholder='nombre' onChange={(e)=> {setnombre(e.target.value) }} />
          <input type="password" placeholder='password'  onChange={(e)=> {setpassword(e.target.value) }} />
          <button  onClick={login} >Register</button>
        </div>

        <h1>{log}</h1>
      </div>
    </Fragment>
  );
}

export default App;
