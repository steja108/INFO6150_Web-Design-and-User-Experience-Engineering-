import React, {Component} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Card from './Components/Card'
import { useState } from 'react';

function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



const handleSubmit =event => {
    console.log('handleSubmit ran');
    event.preventDefault(); // 👈️ prevent page refresh

    // let data=JSON.stringify({
    //         email: email,
    //         password:password
    //       });
    // axios.post('http://localhost:4000/user/login',data)
    // .then(res=>{
    // console.log(res);
    
    // //window.location = "/retrieve" //This line of code will redirect you once the submission is succeed
    // })

    fetch("http://localhost:8090/user/login", {
      mode:'no-cors',
  "method": "POST",
  "headers": {
    "X-Powered-By": "Express",
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods":"GET, POST, OPTIONS, PUT, DELETE",
    "content-type": "application/json; charset=utf-8",
    "content-length":"168",
    "ETag": "W/'a8-f3GbHqXzqDjSTzPu31DtFAwmeIA'",
    "Date":"Mon, 21 Nov 2022 03:56:00 GMT",
    "Connection":"keep-alive",
    "Keep-Alive":"timeout=5"
  },
  "body": JSON.stringify({
    email: email,
    password: password
  })
})
.then(response => {
    if(response.status===200){
    console.log(response);
    window.location.assign('http://localhost:3000/home');

    }
    else{
        alert("Unsuccessful");
    }

})
.catch(err => {
  console.log(err);

});
        
    console.log('email 👉️', email);
    console.log('password 👉️', password);
};
return (
  <form onSubmit={handleSubmit}>
    <div>
        <label ><b>Username</b></label>
        <input type="username" id="name" placeholder="Enter Username" name="uname" required/>

        <label ><b>Email</b></label>
        <input type="email" placeholder='Enter E-mail' name="email" required id="email"
        onChange={event => setEmail(event.target.value)} value={email}/>

        <label><b>Password</b></label>
        <input type="password" placeholder='Enter Password' name="pasword" required id="password"
        onChange={event => setPassword(event.target.value)} value={password}/>
        <button type="submit" >Login</button> 
    </div>
  </form>
   
)
}
export default Login
    
    

