
let messages = []
let id = 0

//using module.exports so I can export the methods we put them in an obj for easy access
module.exports = {
    //takes in req and res
    create: (req,res) => {
        //obj deconstruction 2 new variables crated with key value pairs from req.body that match the same name
        const { text,time } = req.body
        //pushing id, text, time to the empty messages array we created above
        messages.push({id,text,time})
        //adding 1 to id that we declared on top of page
        id++
        //result status 200 means good and we are then sending the messages array that we populated with id, text, and time.
        res.status(200).send(messages)
    },
    read: (req, res) => {
        //read only so we are just sending the user the message array
        res.status(200).send(messages)

    },
    update: (req, res) => {
        //first we need to deconstruct the text key value pair from the body
        const { text } = req.body
        //We need to create a variable that has the res.params.id assigned to it so we can compare it to the message.id
        //we are getting the id of the item that needs to be updated from the url that is why we use params.id
        const updateID = req.params.id
        //we are using findIndex to find the index of where the id's match, as you can see we are using the variable updateID that we delcared above.
        //we are then assigning the results of findIndex to a new variable called messageIndex.
        const messageIndex = messages.findIndex(message => message.id === +(updateID))
        //we are assigning message the value of whatever is at messages[messageIndex] ie the whole object at that index.
        let message = messages[messageIndex]
        //noew we are selecting messages at the messageIndex location
        messages[messageIndex] = {
            //id will stay the same as the id on the message
            id: message.id,
            //text will be either the text we put in the body when using postman OR the default text in the message.
            text: text || message.text,
            //time will stay the same as the time on the message a this index
            time: message.time
        }
        res.status(200).send(messages)
    },
    delete: (req, res) => {
        const deleteID = req.params.id
        //messageIndex we are finding the index of the params and comparing it to the index of id in messages
        const messageIndex = messages.findIndex(message => message.id === +(deleteID))
        //using .splice to remove the index from the messages array
        messages.splice(messageIndex, 1)
        res.status(200).send(messages)
    }
}



