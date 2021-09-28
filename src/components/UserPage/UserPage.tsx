import 'bootstrap/dist/css/bootstrap.min.css';
import './UserPage.scss';
import { useState, useEffect } from 'react';
import * as actions from "../../redux/actions";
import classnames from 'classnames';
import { useAppDispatch } from '../../hooks/hooks'
import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import * as Types from '../../types/types';

interface Props {
  user: Types.User;
}

type InputTypes = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>;

const UserPage = (props: Props): JSX.Element => {
  const [user, setUser] = useState({ ...props.user })
  const dispatch =  useAppDispatch();

  const [editMode, setEditMode] = useState(false)
  const [isEmptyField, setIsEmptyField] = useState(true)

  const editUser = () => dispatch(actions.editUser(user))
  const createUser = () => dispatch(actions.createUser(user))
  const deleteUser = () => dispatch(actions.deleteUser(user.id))

  const inputHandler = (e: InputTypes): void => {
    if(e.target.name === 'is_active') {
      setUser(prev => ({ ...prev, [e.target.name]: (e.target as HTMLInputElement).checked  }));
    } else {
      setUser(prev => ({ ...prev, [e.target.name]: e.target.value  }));
    }
    
  }

  useEffect(() => {
    if(
      !user.first_name ||
      !user.last_name ||
      !user.birth_date ||
      !user.gender ||
      !user.job ||
      !user.biography 
      ) {
      setIsEmptyField(true)
    } else {
      setIsEmptyField(false)
    }
  }, [user])

  useEffect(() => {
    setUser(prev => ({ ...prev, ...props.user }))
  }, [props.user])


  return (
    <div className={classnames('card', "userPage")}>
      <div className="userCard-id">
        <span className="userCard-id-text">ID: 
          {user ? user.id : ''} 
        </span>

        {user.id ? (
          <>
            {editMode ? (
              <>
                <button onClick={() => {
                  setEditMode(false)
                  setUser(props.user)
                }}
                  className={classnames('btn', 'btn-outline-info')}
                >CANCEL</button>

                <button onClick={() => {
                  editUser();
                  setEditMode(false)
                  setUser({ ...props.user })
                }}
                  className={classnames('btn', 'btn-success')}
                  disabled={isEmptyField}
                >SAVE</button>

              <button
                  className={classnames('btn', 'btn-danger')}
                  onClick={deleteUser}>DEL</button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className={classnames('btn', 'btn-outline-warning')}
              >EDIT</button>
            )}
          </>
        ) : (
          <>
            <button onClick={() =>{
            createUser();
            setUser(prev => ({...prev, name: '', surname: '', desc: ''}))
            }}
            className={classnames('btn', 'btn-success')}
            disabled={isEmptyField}
            >CREATE USER</button>
          </>
        )}
      </div>
      <div className="userPage-info">
        {editMode ? (
          <form>
          <label htmlFor="first_name">
            <span className="userCard-info-first_name">Name: 
          </span>
            <input
              type='text'
              name='first_name'
              value={user.first_name}
              onChange={inputHandler}
              className={classnames('form-control')}
              placeholder='required field'
              maxLength={256}
            ></input>
          </label>
          <br />
          <label htmlFor="last_name">
            <span className="userPage-info-last_name">Surname: </span>
            <input
              type='text'
              name='last_name'
              value={user.last_name}
              onChange={inputHandler}
              className={classnames('form-control')}
              placeholder='required field'
              maxLength={256}
            ></input>
          </label>
          <br />
          <label htmlFor="birth_date">
            <span className="userPage-info-desc">birth_date: </span>
            <input
              type='date'
              name='birth_date'
              value={user.birth_date}
              onChange={(e) => inputHandler(e)}
              className={classnames('form-control')}
              placeholder='required field'
            ></input>   
          </label>
          <br />
          <label htmlFor="gender">
            <span className="userPage-info-desc">gender: </span>
            <select
              name="gender"
              onChange={(e) => inputHandler(e)}
              value={user.gender}
            >
              <option value="" >Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <br />
          <label htmlFor="job">
            <span className="userPage-info-job">job: </span>
            <input
              type='text'
              name='job'
              value={user.job}
              onChange={(e) => inputHandler(e)}
              className={classnames('form-control')}
              placeholder='required field'
              maxLength={256}
            ></input>   
          </label>
          <br />
          <label htmlFor="biography">
            <span className="userPage-info-biography">biography: </span>
            <textarea
              name='biography'
              value={user.biography}
              onChange={(e) => inputHandler(e)}
              className={classnames('form-control')}
              placeholder='required field'
              maxLength={1024}
            ></textarea>   
          </label>
          <br />
          <label htmlFor="is_active" className={classnames('form-check-label')}>
          <input
              type='checkbox'
              name='is_active'
              checked={user.is_active}
              onChange={(e) => inputHandler(e)}
              className={classnames('form-check-input', )}
              placeholder='required field'
            ></input>   
            <span className="userPage-info-is_active"> is_active: </span>
          </label>
        </form>
        ) : (
          <form>
          <label htmlFor="first_name">first_name: <br />
            <span className="userPage-info-first_name">
              {user.first_name} 
          </span>
          </label>
          <br />
          <label htmlFor="last_name">last_name: <br />
            <span className="userPage-info-last_name"> 
            { user.last_name}  
            </span>
          </label>
          <br />
          <label htmlFor="birth_date">birth_date: <br />
            <span className="userPage-info-birth_date">
              {user.birth_date} 
            </span> 
          </label>
          <br />
          <label htmlFor="gender">gender: <br />
            <span className="userPage-info-gender">
              {user.gender} 
            </span> 
          </label>
          <br />
          <label htmlFor="job">job: <br />
            <span className="userPage-info-job">
              {user.job} 
            </span> 
          </label>
          <br />
          <label htmlFor="biography">biography:<br />
            <span className="userPage-info-biography"> 
              {user.biography} 
            </span> 
          </label>
          <br />
          <label htmlFor="is_active">
              {user.is_active ? 'active' : 'not active'}
          </label>
        </form>
        )}
        
      </div>

    </div>
  )
}

export default UserPage;