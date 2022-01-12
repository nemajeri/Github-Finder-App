import React from 'react'
import Spinner from '../layout/Spinner'
import UserItem from './UserItem'
import PropType from 'prop-types'

const Users = ({users, loading}) => {
        const userStyle = {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridGap: '1rem'
        }   
        if (loading) {
            return <Spinner />
        } else {
            return (
                <div style={userStyle}>
                    {users.map(user => 
                    (<UserItem key={user.id} user={user}/>
                   ))}
                </div>
            )
        }
       
    }
    Users.propType = {
        users: PropType.array.isRequired,
        loading: PropType.bool.isRequired,
    }




export default Users
