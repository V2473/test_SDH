import 'bootstrap/dist/css/bootstrap.min.css';
import './UserCard.scss';
import { useState, useEffect } from 'react';
import classnames from 'classnames';
import { User } from '../../types/types';
import { useAppDispatch } from '../../hooks/hooks'
import * as actions from "../../redux/actions";


import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';


interface Props {
  user: User;
  edit?: boolean;
}

type InputTypes = React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>;

const UserCard = (props: Props): JSX.Element => {
  const history = useHistory();
  
  const [user, setUser] = useState({ ...props.user })
  const dispatch =  useAppDispatch();

  const deleteUser = () => dispatch(actions.deleteUser(user.id))


  const clickHandler = (e: InputTypes): void => {

    if ((e.target as HTMLButtonElement).nodeName === "BUTTON") {

      deleteUser()
      return
    }
    history.push('/contact/' + props.user.id)
    
  }

  useEffect(() => {
    setUser({ ...props.user })
  }, [props.user])


  return (
    <div 
      className={classnames('card', "userCard")}
      onClick={clickHandler}
    >
      <div className="userCard-id">
        <span className="userCard-id-text">ID: 
          {user ? user.id : ''} 
        </span>
        <button
          className={classnames('btn', 'btn-danger')}
        >DELETE</button>

      </div>
      <div className="userCard-info">
        
          <form>
          <label htmlFor="first_name">first_name: <br />
            <span className="userCard-info-first_name">
              {user.first_name} 
          </span>
          </label>
          <br />
          <label htmlFor="last_name">last_name:  <br />
            <span className="userCard-info-last_name">
              {user.last_name}  
        </span>
          </label>
          <br />
          <label htmlFor="birth_date">birth_date: <br />
            <span className="userCard-info-birth_date">
              {user.birth_date} 
            </span> 
          </label>
          <br />
          <label htmlFor="gender">gender: <br />
            <span className="userCard-info-gender">
              {user.gender} 
            </span> 
          </label>
          <br />

        </form>
        
      </div>

    </div>
  )
}

export default UserCard;