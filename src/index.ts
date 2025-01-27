import express from 'express'
import { ApolloServer } from '@apollo/server'
import {expressMiddleware} from "@apollo/server/express4"




// Define resolvers to match the schema
const resolvers = {
  Query: {
    hello: () => 'Hello, world!',  // Sample resolver for the 'hello' query
  },
};


async function init() {

    const app=express()
    const PORT=Number(process.env.PORT) || 8000
    
    app.use(express.json())
  


    const gqlServer=new ApolloServer({
        typeDefs:`
        type Query {
            hello: String 
            say(name:String):String
        } 
        `, //Schema
        resolvers:{
            Query: {
                hello:()=>`hey there i am a graphql server`,
                say:(_,{name}:{name:string})=>`Heyy ${name},How are you ? `
            },
        }, //Resolvers 
    })
    
    // Start the gql server
    await gqlServer.start()

    app.get('/',(req,res)=>{
        res.json({message:'Server is up and running'})
    })


    app.use("/graphql", expressMiddleware(gqlServer)as any) ;
    
    // Create GraphQl server
    
    app.listen(PORT,()=>console.log(`Server started at PORT : ${PORT}`))
}

init();

