const {gql} = require ('apollo-server')

module.exports = typeDefs = gql`
type Post{
    id: ID!
    body:String!
    created: String
    username: String!
    comments: [Comment]!
    likes:[Like]!
    likeCount:Int!
    commentCount:Int!
}
type Comment{
    id:ID!
    created:String!
    username:String!
    body:String!
}
type Like{
    id:ID!
    created:String!
    username:String
}
type User{
    id: ID!
    email: String!
    token: String!
    username: String!
    created: String!
}
input RegisterInput{
    username: String!
    password: String!
    confirmPassword: String!
    email: String!

}
type Mutation{
 register (registerInput: RegisterInput): User!
 login(username:String!, password:String!):User!
 createPost(body:String!):Post!
 deletePost(postId: ID):String!
 createComment(postId: ID!, body:String!):Post!
 deleteComment(postId:ID!, commentId:ID!):Post!
 likePost(postId: ID!):Post!
}
type Query{
    getPosts: [Post]
    getPost(postId:ID):Post
}
`