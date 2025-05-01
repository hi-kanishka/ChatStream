//initializing sample data for db
const mongoose = require('mongoose');
const Chat = require("./Models/chats.js");
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
main()
    .then(() => {
        console.log("connection successfull");
    })
    .catch((err) => {
        console.log(err);
    })
let allchats = [
    {
        from: "Neha",
        to: 'priya',
        msg: "Have you downloaded your admit card",
        created_at: new Date(),
    },
    {
        from: "kanishka",
        to: 'harsh',
        msg: "Are you comming for hackathon?",
        created_at: new Date(),
    },
    {
        from: "anshika",
        to: 'meenu',
        msg: "Can i borrow 2000rupees",
        created_at: new Date(),
    },
    {
        from: "peehu",
        to: 'preeti',
        msg: "I had eaten my breakfast before i left home",
        created_at: new Date(),
    },
    {
        from: "aman",
        to: 'souvik',
        msg: "lets go for swimming",
        created_at: new Date(),
    },
]
Chat.insertMany(allchats);