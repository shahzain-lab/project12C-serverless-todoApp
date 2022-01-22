import React,{createContext, useState, useEffect} from "react"
import netlifyIdentity from 'netlify-identity-widget';

export const IdentityContext = createContext({});

export const IdentityProvider = ({children}) => {
    const [user, setUser] = useState()
    useEffect(() => {
        netlifyIdentity.init({});
      });
    netlifyIdentity.on("login", user => {
        setUser(user)
    })
    netlifyIdentity.on("logout", () => {
        setUser()
    })
    return(
        <IdentityContext.Provider value={{netlifyIdentity,user}}>
         {children}
        </IdentityContext.Provider>
    )
}
