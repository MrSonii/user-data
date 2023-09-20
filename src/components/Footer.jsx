import React, { useEffect, useState } from 'react'
import { DEFAULT_PAGE_ORDER_COUNT, LEFT_ARROW_ICON, RIGHT_ARROW_ICON } from '../lib/config';
import { getDataFromLocalStorage } from '../lib/storageHelpers';

function Footer(props) {
  const { skip, setSkip } = props;
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const userData = getDataFromLocalStorage('allUsersData');
    const count = userData && userData.length > 6 ? Math.ceil(userData.length / DEFAULT_PAGE_ORDER_COUNT) : 1;

    setPageCount(count);
  }, [])
  
  return (
    <div className='footer-cont'>
      <img src={LEFT_ARROW_ICON} alt="Left Page" width={30}/>
      {Array(pageCount).fill(1).map((val, ind) => <span className='page-button' key={ind} onClick={() => {setSkip(ind === 0 ? 0 : ind * 6)}}>{ind + 1}</span>)}
      <img src={RIGHT_ARROW_ICON} alt="Right Page" width={30}/>
    </div>
  )
}

export default Footer;