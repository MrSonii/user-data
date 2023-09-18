import React, { useEffect, useState } from 'react';
import { getDataFromLocalStorage, setDataInLocalStorage } from '../lib/storageHelpers';

function Form(props) {
  const [payload, setPayload] = useState({});
  const [errMsg, setErrMsg] = useState('');

  const { handleUserFormClose, currentUserData, viewOnly, editModel, currentDataInd } = props;

  useEffect(() => {
    if(Object.keys(currentUserData).length) {
      setPayload(currentUserData);
    }
  }, []);
  
  const handleUserData = (key) => (e) => {
    setPayload({
      ...payload,
      [key]: e.target.value
    });
  };

  const handleDataSubmition = () => {
    if(Object.keys(payload).length === 6){
      const allUsersData = getDataFromLocalStorage('allUsersData') || [];
      if(!editModel){
        const newlyUpdatedData = [payload, ...allUsersData];
  
        setErrMsg("");
        setDataInLocalStorage('allUsersData', newlyUpdatedData);
        handleUserFormClose();
      } else {
        const newlyUpdatedData = [...allUsersData];
        newlyUpdatedData[currentDataInd] = payload;
  
        setErrMsg("");
        setDataInLocalStorage('allUsersData', newlyUpdatedData);
        handleUserFormClose();        
      };

      window.location.reload();
    } else {
      setErrMsg("Fill all the fields to Save data");
    }
  };


  return (
    <div className='formCont'>
      <div className='form'>
        <h1 className='t-center'>ADD USER</h1>
        <div className='all-inputs-container'>
          <div className='input-cont'>
            <label htmlFor="USERNAME">NAME</label>
            <input 
              type="text" 
              id='USERNAME' 
              onChange={handleUserData('userName')} 
              disabled={viewOnly} 
              value={payload.userName}
            />
          </div>
          <div className='input-cont'>
            <label htmlFor="USERAGE">AGE</label>
            <input 
              type="text" 
              id='USERAGE' 
              onChange={handleUserData('userAge')} 
              disabled={viewOnly}
              value={payload.userAge}
            />
          </div>
          <div className='input-cont'>
            <label htmlFor="DOB">DOB</label>
            <input 
              type="date" 
              id='USERNAME' 
              onChange={handleUserData('dob')} 
              disabled={viewOnly}
              value={payload.dob}
            />
          </div>
          <div className='input-cont'>
            <p>GENDER</p>
            <div className='radio-cont'>
              <span>
                <input 
                  type="radio" 
                  id="male" 
                  name="gender" 
                  value='MALE' 
                  onChange={handleUserData('gender')} 
                  disabled={viewOnly}
                  checked={payload.gender === 'MALE'}
                />
                <label for="male">MALE</label>
              </span>
              <span>
                <input 
                  type="radio" 
                  id="female" 
                  name="gender" 
                  value='FEMALE' 
                  onChange={handleUserData('gender')} 
                  disabled={viewOnly}
                  checked={payload.gender === 'FEMALE'}
                />
                <label for="female">FEMALE</label>
              </span>
            </div>
          </div>
          <div className='input-cont'>
            <label htmlFor="FOOD">FAVOURITE FOOD</label>
            <select name="Favourite Food" id="FOOD" className='select-input' onChange={handleUserData('favFood')} disabled={viewOnly} value={payload.favFood}>
              <option value="" disabled selected>Select an option</option>
              <option value={'PIZZA'}>PIZZA</option>
              <option value={'BURGER'}>BURGER</option>
              <option value={'PASTA'}>PASTA</option>
            </select>
          </div>
          <div className='input-cont'>
            <label htmlFor="HOBBIES">HOBBIES</label>
            <textarea 
              rows={4} 
              maxlength="100" 
              className='text-area' 
              onChange={handleUserData('hobbies')} 
              disabled={viewOnly}
              value={payload.hobbies}
            />
          </div>
        </div>
        <div className='button-cont'>
          {!!errMsg && <small className='errMsg'>{errMsg}</small>}
          <button className='cancel-button' onClick={handleUserFormClose} >CANCEL</button>
          {!viewOnly && <button className='submit-button' onClick={handleDataSubmition}>SUBMIT</button>}
        </div>
      </div>
    </div>
  )
}

export default Form;