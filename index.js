const {ApolloServer} = require('apollo-server')
const mongoose = require ('mongoose')
const {MONGODB} = require('./config.js')
const resolvers = require('./Graphgql/resolvers')
const typeDefs = require('./Graphgql/typeDefs')
//const pubsub = new PubSub()
const PORT =process.env.port ||5000
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (req)=>(req) 
})
mongoose.connect(MONGODB, {useUnifiedTopology:true,  useNewUrlParser: true})
.then(()=>{
    console.log('mongodb connected');
return server.listen({port:PORT})
})
.then(res=>{
    console.log(`server running at ${res.url} `)
})
.catch(err=>{
    console.err(err);
})