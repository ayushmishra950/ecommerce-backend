import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const headerStyle = {
  height: '60px',
  backgroundColor: 'linear-gradient(to right, #4b0082, #1a1a80);',
  color: '#ecf0f1',
  padding: '0 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginLeft: '220px', // sidebar width
  boxSizing: 'border-box',
};

export default function AdminHeader({ title }) {
const navigate = useNavigate();

 

//   useEffect(()=>{
//      if(title == 'Dashboard')
//     {
//  console.log('hiii...');
//     dispatch(openAdminSidebar());
//     }
//   },[])

  return (

    <header style={headerStyle}>
      <h1>{title}</h1>
            <button style={{marginLeft:'645px',cursor:'pointer'}} onClick={()=>{navigate('/')}}>Go To Home</button>
      <div>User Admin</div>
    </header>
  );
}
