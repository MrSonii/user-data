import React, { useEffect, useState } from 'react'
import Form from './Form';
import { getDataFromLocalStorage } from '../lib/storageHelpers';
import UserCard from './UserCard';

function Body(props) {
  const { skip, slicedData } = props;
  // arr.slice(startIndex, endIndex + 1);
  const [formOpen, setFormOpen] = useState(false);
  const [usersData, setUsersData] = useState(slicedData);
  const [currentUserData, setCurrentUserData] = useState({});
  const [currentDataInd, setCurrentDataInd] = useState(-1);
  const [viewOnly, setViewOnly] = useState(false);
  const [editModel, setEditModel] = useState(false);

  useEffect(() => {
    setUsersData(slicedData);
  }, [formOpen]);

  const handleViewForm = (index) => () => {
    const allData = getDataFromLocalStorage('allUsersData');

    setCurrentUserData(allData[index]);
    setViewOnly(true);
    setEditModel(false);
    setFormOpen(true);
  };

  const handleEditForm = (index) => () => {
    const allData = getDataFromLocalStorage('allUsersData');

    setCurrentUserData(allData[index]);
    setCurrentDataInd(index);
    setViewOnly(false);
    setEditModel(true);
    setFormOpen(true);
  };

  const handleUserFormOpen = () => {
    setFormOpen(true);
  };

  const handleUserFormClose = () => {
    setFormOpen(false);
  };

  return (
    <body className='body'>
      <div className='body-header'>
        <h2>LIST OF USERS</h2>
        <button className='addButton' onClick={handleUserFormOpen}>ADD USERS</button>
      </div>
      <div className='user-data-cont'>
        {
          usersData && 
          usersData.length 
          ?
          usersData.map((user, index) => <UserCard userData={user} dataIndex={index} handleViewForm={handleViewForm} handleEditForm={handleEditForm}/>) 
          : 
          <div className='emptyData'>
            No User Data Added/Found, click on "ADD USERS" button on the top right corner to add data
          </div>
        }
      </div>

      {/* form cont */}
      {
        !!formOpen && <Form handleUserFormClose={handleUserFormClose} currentUserData={currentUserData} viewOnly={viewOnly} editModel={editModel} currentDataInd={currentDataInd}/>
      }
    </body>
  )
}

export default Body;