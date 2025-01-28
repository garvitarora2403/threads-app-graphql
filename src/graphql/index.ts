import { ApolloServer } from "@apollo/server";
import {prismaClient} from './../lib/db'
import {User} from './user'

async function createApolloGraphQlServer(){
    const gqlServer=new ApolloServer({
            typeDefs:`
            type Query {
                hello: String 
                say(name:String):String

                
            } 
    
            type Mutation{
                
                 ${User.mutations}
            }
            `, //Schema
            resolvers:{
                Query: {
                    // hello:()=>`hey there i am a graphql server`,
                    // say:(_,{name}:{name:string})=>`Heyy ${name},How are you ? `
                    ...User.resolvers.queries
                },
                Mutation:{

                    // createUser:async(_,
                    //     {firstName,lastName,email,password}:
                    //     {firstName:string;lastName:string;email:string;password:string})=>{
                    //     await prismaClient.user.create({
                    //         data:{
                    //             email,
                    //             firstName,
                    //             lastName,
                    //             password,
                    //             salt:'random salt'
                    //         }
                    //     });
                    //     return true
                    // }
                    ...User.resolvers.mutations
                }
            }, //Resolvers 
    
    
        })
        
        // Start the gql server
        await gqlServer.start()

        return gqlServer
}


export default createApolloGraphQlServer