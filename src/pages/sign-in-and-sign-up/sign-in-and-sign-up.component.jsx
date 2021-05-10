import React, { useState } from 'react';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

const SignInAndSignUp = () =>{
    let [toggleHidden, setToggle] = useState(true);
return(
    <div className='w-full flex items-center justify-items-center justify-center ' >
{    
    toggleHidden
        ?
    <SignIn setToggle={setToggle} />
    :
    <SignUp setToggle={setToggle} />}
    </div>
)
}

export default SignInAndSignUp;