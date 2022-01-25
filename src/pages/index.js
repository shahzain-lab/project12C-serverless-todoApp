import React,{useContext} from "react"
import { gql, useQuery } from "@apollo/client";


export default function Home() {


const GET_HELLO = gql`
  {
    hello
  }
`
  
const {error, loading, data} = useQuery(GET_HELLO)
console.log(error, 'error');
console.log('loading...');


 return <div> 
   this is {data && data.hello}
  </div>
}
