import React, { useState } from 'react'
import { getDataFromLocalStorage, setDataInLocalStorage } from '../lib/storageHelpers';

function UserCard(props) {
  const [flag, setFlag] = useState(false);

  const { userData, dataIndex, handleViewForm, handleEditForm } = props;
  const {dob, favFood, gender, hobbies, userAge, userName} = userData;

  const userAgeInt = parseInt(userAge);

  const handleDataDeletion = () => {
    const allData = getDataFromLocalStorage('allUsersData');
    const filteredData = allData.filter((data, ind) => ind !== dataIndex);

    setDataInLocalStorage('allUsersData', filteredData);
    window.location.reload();
  };

  return (
    <div className='user'>
      <div className='card-header'>
        <p>{userName}</p>
        <span className='colouredCircle'></span>
      </div>
      <div className='card-body'>
        <p>AGE: <span className='bold'>{userAge}</span></p>
        <p>DOB: <span className='bold'>{dob}</span></p>
        <p>GENDER: <span className='bold'>{gender}</span></p>
        <p>FOOD: <span className='bold'>{favFood}</span></p>
        <p>HOBBIES: <span className='bold'>{hobbies}</span></p>
      </div>
      <div className='card-footer'>
        <button className='del-butt' onClick={handleDataDeletion}>DELETE</button>
        <button className='view-butt' onClick={handleViewForm(dataIndex)}>VIEW</button>
        <button className='edit-butt' onClick={handleEditForm(dataIndex)}>EDIT</button>
      </div>

      {/* styles */}
      <style jsx>{`
        .colouredCircle {
          background: ${userAgeInt > 0 && userAgeInt <= 25 ? 'green' : userAgeInt > 25 && userAgeInt <= 50 ? 'purple' : userAgeInt > 50 ? 'orange' : ''}
        }
      `}</style>
    </div>
  )
}

export default UserCard;