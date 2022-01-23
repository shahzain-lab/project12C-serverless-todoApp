import React,{useContext,useRef} from 'react';
import { gql } from "@apollo/client";
import {useQuery, useMutation} from '@apollo/client';
import { IdentityContext } from '../identity-context';
import {
    Flex,
    NavLink,
    Button,
    Label,
    Input,
    Checkbox,
    Container
} from 'theme-ui'
import {Link} from '@reach/router'

const ADD_TODO=gql`
mutation AddTodo($text: String!){
    addTodo(text: $text){
        id
    }
}
`;

const UPDATE_TODO_DONE=gql`
mutation UpdateTodo($id: String!){
    updateTodo(id: $id){
        text
        done
    }
}
`;

const GET_TODOS=gql`
query GetTodos{
    todos{
        id
        text
        done
    }
}`;

export default () => {
    
  const { user,  netlifyIdentity } = useContext(IdentityContext);
  const inputRef = useRef();
  const [addTodo] = useMutation(ADD_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO_DONE);
  const [loading, error, data, refetch] = useQuery(GET_TODOS);

  return(
      <Container>
           <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to={"/app"} p={2}>
          Dashboard
        </NavLink>
        {user && (
          <NavLink
            href="#!"
            p={2}
            onClick={() => {
              netlifyIdentity.logout();
            }}
          >
            Log out {user.user_metadata.full_name}
          </NavLink>
        )}
      </Flex>
      <Flex
       as="form"
       onSubmit={async e => {
           e.preventDefault();
           await addTodo({variables: {text: inputRef.current.value}})
           inputRef.current.value = '';
           await refetch()
       }}
       >
 <Label sx={{ display: "flex" }}>
          <span>Add&nbsp;Todo</span>
          <Input ref={inputRef} sx={{ marginLeft: 1 }} />
        </Label>
        <Button sx={{ marginLeft: 1 }}>Submit</Button>
      </Flex> 
      <Flex sx={{ flexDirection: "column" }}>
        {loading ? <div>loading...</div> : null}
        {error ? <div>{error.message}</div> : null}
        {!loading && !error && (
          <ul sx={{ listStyleType: "none" }}>
            {data?.todos?.map(todo => (
              <Flex
                key={todo.id}
                as="li"
                onClick={async () => {
                  await updateTodo({ variables: { id: todo.id } });
                  await refetch();
                }}
              >
                <Checkbox checked={todo.done} readOnly />
                <span>{todo.text}</span>
              </Flex>
            ))}
          </ul>
        )}
      </Flex>
      </Container>
  )
}