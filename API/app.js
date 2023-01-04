const express = require('express')
const fs = require('fs')
var cors = require('cors');
const { title } = require('process');

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:4200'
  }));


app.get('/user/list', (req, res) => {
    const users = getUserData()
    res.send(users)
})
app.get('/:title', (req, res) => {
   
   const id = req.params.title;
    const existUsers = getUserData();
    const findExist = existUsers.find(i =>i.MovieName === id)
    res.send(findExist)
})


app.get('/Gener/:title', (req, res) => {
   
    const id = req.params.title;
     const existUsers = getUserData();
     const findExist = existUsers.filter(i =>i.Gener === id)
     res.send(findExist)
 })
app.patch('/user/update/:username', (req, res) => {
    //get the username from url
    const username = req.params.username
    //get the update data
    const userData = req.body
    //get the existing user data
    const existUsers = getUserData()
    //check if the username exist or not       
    const findExist = existUsers.find( user => user.MovieName === username )
    if (!findExist) {
        return res.status(409).send({error: true, msg: 'username not exist'})
    }
    //filter the userdata
    const updateUser = existUsers.filter( user => user.MovieName !== username )
    //push the updated data
    updateUser.push(userData)
    //finally save it
    saveUserData(updateUser)
    res.send({success: true, msg: 'User data updated successfully'})
})
app.post('/user/add', (req, res) => {
    //get the existing user data
    const existUsers = getUserData()
    console.log("hello")
    //get the new user data from post request
    const userData = req.body
    //check if the userData fields are missing
    //append the user data
    existUsers.push(userData)
    //save the new user data
    saveUserData(existUsers);
    res.send({success: true, msg: 'User data added successfully'})
})
app.delete('/delete/:username', (req, res) => {
    const username = req.params.username
    //get the existing userdata
    const existUsers = getUserData()
    //filter the userdata to remove it
    const filterUser = existUsers.filter( user => user.MovieName !== username )
    if ( existUsers.length === filterUser.length ) {
        return res.status(409).send({error: true, msg: 'username does not exist'})
    }
    //save the filtered data
    saveUserData(filterUser)
    res.send({success: true, msg: 'User removed successfully'})
    
})
const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('users.json', stringifyData)
}
const getUserData = () => {
    const jsonData = fs.readFileSync('users.json')
    return JSON.parse(jsonData)    
}

app.listen(3000, () => {
    console.log('Server runs on port 3000')
})