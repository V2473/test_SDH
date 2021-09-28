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
  const currentPage = +location.pathname.slice(1, 7);
  const currentUser = +location.pathname.slice(9) || undefined ;
  const pagesTotal = Math.ceil(usersList.length / 5);
  const currenUsersList = usersList.slice((currentPage - 1) * 5, ((currentPage - 1) * 5) + 5);

  useEffect(() => {
    console.log(currentUser)
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
        
          // <Page
          //   users={currenUsersList}
          //   pagesTotal={pagesTotal}
          //   currentPage={currentPage} 
          //   key={currentPage}
          // />
        
        
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