import express from 'express'
import { User } from '../models/user'
import {Avatar} from '../models/avatar'


async function getUserData(req: express.Request, res: express.Response) {
    try {
        const {email,sub} = req.body;
        console.log('Request opened to retrieve information from: ',email)
        const user = await User.findOne({ email: email })
        if (user) {
            const resUser = await User.findOne({ email: email }).populate('avatar');
            console.log(resUser)
            res.status(201).json({ "statusCode": 201, "message": "Retrieving information of the user", user: resUser });
        } else {
            const username = email.substr(0,email.indexOf('@'));
            const {id} = await Avatar.findOne({contentType: 'monkey.png'});
            const newUser = await User.create({ id: sub, email: email, username: username, avatar:id });
            const resUser = await User.findOne({email:newUser.email}).populate('avatar');
            res.status(201).json({ "statusCode": 201, "message": "User created", user: resUser });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ "statusCode": 500, "message": error });
    }
}

async function updateUsername(req: express.Request, res: express.Response) {
    try {
        const {username,email} = req.body;
        const user = await User.findOneAndUpdate({ email: email }, {username:username}, {new:true});
        console.log('User changed username to',user.username);
        res.status(201).json({ "statusCode": 201, "message": "New username has been stored", user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ "statusCode": 500, "message": error });
    }
}

async function updateSortLearning(req: express.Request, res: express.Response) {
    try {
        const {email, sortArr} = req.body;
        console.log(sortArr, 'controller learning update')
        const user = await User.findOneAndUpdate({ email:email }, {sortLessons:sortArr}, {new:true});
        console.log(user)
        console.log('User increased learning Progress',user.username);
        res.status(201).json({ "statusCode": 201, "message": "learning Progress has been stored", user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ "statusCode": 500, "message": error });
    }
}




// export { getUserData, updateLearning, updateUsername,updateGameStats };

export {getUserData, updateUsername, updateSortLearning}