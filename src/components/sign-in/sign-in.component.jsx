import React, { useState } from 'react';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

const SignIn = ({ setToggle }) => {
    let [user, setUser] = useState({
        email: '',
        password: ''
    })
    const handleSubmit = async e => {
        e.preventDefault();

        const { email, password } = user;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            setUser({
                email: '',
                password: ''
            });
        } catch (error) {
            console.error(error);

        }

    }

    const handleChange = e => {
        const { name, value } = e.target;
        setUser(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    }

    return (
        <div className='w-full flex flex-col space-y-2 pt-24 justify-center items-center items justify-items-center h-full' >
            <form onSubmit={handleSubmit} className='w-1/3 border-gray-900 bg-gray-50 items-center p-10' >
                <div className='flex flex-col space-y-8' >
                    <div className='flex flex-col space-y-2' >
                        <p className='text-xl font-medium capitalize' >Email</p>
                        <input type='email' name='email' value={user.email} className='bg-gray-100 p-1 outline-none rounded-sm ring-1 ring-gray-300 focus:ring-gray-600'
                            onChange={handleChange} />
                    </div>
                    <div className='flex flex-col space-y-2 ' >
                        <p className='text-xl font-medium capitalize' >Password</p>
                        <input type='password' name='password' value={user.password} className='bg-gray-100 p-1 outline-none rounded-sm ring-1 ring-gray-300 focus:ring-gray-6001'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-row justify-center items-center' >
                        <div className='space-x-3 ' >
                            <button type='submit' className='bg-gray-300 hover:bg-gray-400 hover:text-gray-100 px-10 py-1  text-gray-500 my-2 rounded-sm'  >Login</button>
                            <button onClick={signInWithGoogle} className='bg-blue-600 hover:bg-blue-700  px-2 py-1 text-gray-100 my-2 rounded-sm'  >Sign In with Google</button>
                        </div>
                    </div>
                    <p onClick={() => setToggle(prev => !prev)} className='text-center text-blue-700 underline cursor-pointer' >Sign UP Using Email And Password?</p>
                </div>
            </form>
            <p className=' text-base text-red-500' >Use email ID: test123@test.com and password:123456</p>
        </div>
    )
}

export default SignIn;