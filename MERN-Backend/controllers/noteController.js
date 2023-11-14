const { request } = require('express')

const bcrypt = require('bcrypt')
const User = require('../models/user')

const { MongoClient } = require('mongodb')
const { WebSocket } = require('ws')
const moment = require('moment/moment')

const uri =
    'mongodb+srv://paba278:123Atd@luzifer.sawu766.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const getRfidCard = async (req, res, wss) => {
    try {
        await client.connect()

        const database = client.db('test')
        const usersCollection = database.collection('users')

        const rfidData = req.body.rfidData

        const user = await usersCollection.findOne({ cardNo: rfidData })

        if (user.cardNo) {

            updateUser(user)

            console.log(user)

            wss.clients.forEach((userClient) => {
                if (userClient.readyState === WebSocket.OPEN) {
                    userClient.send(JSON.stringify(user)) // Convert data to JSON string if needed
                }
            })

            res.status(200).json({
                message: 'RFID Card Data matched with a user.',
                userData: user,
            })

           


        } else {
            res.status(404).json({
                message: 'RFID Card Data does not match any user.',
            })
        }
    } catch (error) {
        console.log(error)

        res.status(400).json({ error: error.message })
    } finally {
        await client.close()
    }
}

const registerUser = async (req, res) => {
    const { email, password, cardNo, role, time, signIn } = req.body

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            email,
            password: hashedPassword,
            cardNo,
            role,
            time,
            signIn,
        })

        await user.save()

        res.status(200).json({ message: 'Registration successful' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        // Find user by email
        const user = await User.findOne({ email })

        // If user is not found, send an error response
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' })
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password)

        // If passwords do not match, send an error response
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' })
        }

        // If passwords match, send a success response
        res.status(200).json({ message: 'Login successful', user })
    } catch (error) {
        // Handle login error
        res.status(400).json({ error: error.message })
    }
}

const getAllUsers = async (req, res) => {
    try {
        // Retrieve all users from the database
        const users = await User.find({})

        // If no users are found, send a 404 response
        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' })
        }

        // If users are found, send a success response with the users data
        res.status(200).json(users)
    } catch (error) {
        // Handle database query error
        res.status(500).json({ error: error.message })
    }
}

const updateUser = async (singleUser) => {
    try {
       const tappedTime =moment().unix()
       
        if (singleUser) {
            console.log(singleUser.signIn)

            if (singleUser.signIn == 0) {

          


                const user = await User.findOneAndUpdate(
                    { cardNo: singleUser.cardNo },
                    { time: tappedTime, signIn: 1 }
                )

             
            } else if (singleUser.signIn == 1) {
                const user = await User.findOneAndUpdate(
                    { cardNo: singleUser.cardNo },
                    { time: tappedTime, signIn: 0 }
                )
             
            }
            
           
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getRfidCard,
    registerUser,
    loginUser,
    getAllUsers,
    updateUser,
}
