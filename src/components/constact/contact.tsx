import 'bootstrap/dist/css/bootstrap.min.css';
import './PaginationWindow.scss';
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { useEffect } from "react";
import * as actions from "../../redux/actions";
import React from 'react';
import UserPage from '../UserPage/UserPage';
import UserCard from '../UserCard/UserCard';

function PaginationWindow(): JSX.Element {
  const dispatch =  useAppDispatch();
  const usersList = useAppSelector(state => state.usersList);
  const user = useAppSelector(state => state.singleUser)
  const location = useLocation();
  const currentUser = +location.pathname.slice(9) || undefined ;

  useEffect(() => {
    !currentUser ? 
    dispatch(actions.requestUsersList()) : 
    dispatch(actions.requestSingleUser(currentUser))
  }, []);

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

export default PaginationWindow;