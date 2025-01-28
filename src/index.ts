import express from 'express'
import { ApolloServer } from '@apollo/server'
import {expressMiddleware} from "@apollo/server/express4"
// import { Prisma, PrismaClient } from '@prisma/client';
import {prismaClient} from './lib/db'




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

        type Mutation{
            createUser(firstName:String!,lastName:String!,email:String!,password:String!):Boolean
        }
        `, //Schema
        resolvers:{
            Query: {
                hello:()=>`hey there i am a graphql server`,
                say:(_,{name}:{name:string})=>`Heyy ${name},How are you ? `
            },
            Mutation:{
                createUser:async(_,
                    {firstName,lastName,email,password}:
                    {firstName:string;lastName:string;email:string;password:string})=>{
                    await prismaClient.user.create({
                        data:{
                            email,
                            firstName,
                            lastName,
                            password,
                            salt:'random salt'
                        }
                    });
                    return true
                }
            }
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

