const postResolvers = require ('./posts')
const usersResolvers = require('./users')
const commentResolvers = require('./comment')
module.exports={
Post:{
       likeCount:(parent)=>{
           return parent.likes.length
       },
       commentCount:(parent)=>{ return parent.likes.length}
},
    Query:{
        ...postResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation
    }
}