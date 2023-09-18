import { useEffect, useState } from 'react';
import './App.css';
import Body from './components/Body';
import Footer from './components/Footer';
import Header from './components/Header';
import { getDataFromLocalStorage } from './lib/storageHelpers';

function App() {
  const [skip, setSkip] = useState(0);
  const [slicedData, setSlicedData] = useState(getDataFromLocalStorage('allUsersData').slice(skip, skip+6) || []);

  useEffect(() => {
    setSlicedData(getDataFromLocalStorage('allUsersData').slice(skip, skip+6));
  }, [skip]);
  
  
  return (
    <div className="App">
      <Header />
      <Body skip={skip} slicedData={slicedData}/>
      <Footer skip={skip} setSkip={setSkip}/>
    </div>
  );
}

export default App;
