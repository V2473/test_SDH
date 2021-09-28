import 'bootstrap/dist/css/bootstrap.min.css';
import './Contacts.scss';
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { useEffect, useState } from "react";
import * as actions from "../../redux/actions";
import React from 'react';
import UserPage from '../UserPage/UserPage';
import UserCard from '../UserCard/UserCard';

function Contacts(): JSX.Element {

  const dispatch =  useAppDispatch();
  const usersList = useAppSelector(state => state.usersList);
  const user = useAppSelector(state => state.singleUser)
  const location = useLocation();
  const history = useHistory();
  const currentPage = +location.pathname.slice(1, 7);
  const [currentURL, setCurrentURL] = useState(currentPage)
  const currentUser = +location.pathname.slice(9) || undefined ;

  history.listen((locationN, action) => {
    console.log(action, locationN.pathname, location.state)
    setCurrentURL(+locationN.pathname.slice(9))
  })
  useEffect(() => {
    console.log(currentUser)
    !currentUser ? 
    dispatch(actions.requestUsersList()) : 
    dispatch(actions.requestSingleUser(currentUser))
  }, [currentURL]);

  return (
    <>
      {!currentUser ? (
        usersList.map(user => (
          <UserCard user={user} key={user.id + user.first_name}></UserCard>
        ))
      ) : (
        <UserPage 
          user={user}
          key={user.id}
        />
      )}
    </>
  )
}

export default Contacts;