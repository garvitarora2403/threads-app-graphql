import express from 'express'
import { ApolloServer } from '@apollo/server'
import {expressMiddleware} from "@apollo/server/express4"

import createApolloGraphQlServer from './graphql/index'







async function init() {

    const app=express()
    const PORT=Number(process.env.PORT) || 8000
    
    app.use(express.json())
  


    

    app.get('/',(req,res)=>{
        res.json({message:'Server is up and running'})
    })

    // const gqlServer =await createApolloGraphQlServer();


    app.use("/graphql", expressMiddleware(await createApolloGraphQlServer())as any) ;
    
    // Create GraphQl server
    
    app.listen(PORT,()=>console.log(`Server started at PORT : ${PORT}`))
}

init();

