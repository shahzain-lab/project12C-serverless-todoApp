import React, {useContext} from 'react'
import {Router,Link} from '@reach/router'
import { Container, Flex, Heading, Button, NavLink } from "theme-ui";
import { IdentityContext } from '../identity-context';
import Dash from '../component/dashboard'


const LoggedOut= () =>{
    const {netlifyIdentity} = useContext(IdentityContext);

    return(
        <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1">Get Stuff Done</Heading>
        <Button
          sx={{ marginTop: 2 }}
          onClick={() => {
            netlifyIdentity.open();
          }}
        >
          Log In
        </Button>
      </Flex>
    )
};

export default () => {
    const {user} = useContext(IdentityContext);
    if(!user){
        return(
        <Router>
            <LoggedOut path="/app" />
        </Router>
    )
        }
        if(user){
            return(
                <Router>
                    <Dash path="/app"/>
                </Router>
            )
        }
}