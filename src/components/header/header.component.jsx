import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';

const Header = ()=> {
    const [activeHeader, setActiveHeader] = useState('exchange');
    const currentUser = useSelector(state=>state.user.currentUser);
    const handleActiveHeaderChange = (e) => {
        setActiveHeader(e.target.dataset.type);
    }
    return (
        <nav className='w-full h-10 text-gray-50 t-0 flex flex-row justify-between bg-blue-600' >
            <div className='flex flex-row space-x-10' >
              <p className='text-2xl' >Logo</p>
              <div className='flex flex-row' >
                <Link onClick={handleActiveHeaderChange} data-type='exchange' className={`py-2 text-sm px-4 uppercase hover:bg-blue-700  ${activeHeader === 'exchange' &&  'bg-blue-800 shadow-main-header-active'}`} to='/'>Exchange</Link>
                <Link onClick={handleActiveHeaderChange} data-type ='funds' className={`py-2 text-sm px-4 uppercase hover:bg-blue-700 ${activeHeader !== 'exchange' &&  'bg-blue-800 shadow-main-header-active'}`} to='/funds'>Funds</Link>
              </div>
            </div>
            <div className='flex flex-row mr-10' >
            { 
            currentUser ?(
              <div className='flex flex-row space-x-1' >
              <p className='text-gray-50 text-base p-2' >Hi! {currentUser.displayName}</p>
            <p  className=' p-2  hover:bg-blue-700 cursor-pointer' onClick={ async ()=> await auth.signOut()}>SIGN OUT</p>
            </div>
            )
            :
            <Link className=' p-2  hover:bg-blue-700 ' to='/signin'>SIGN IN</Link>
          }
            </div>
        </nav>
    );
}

export default Header;