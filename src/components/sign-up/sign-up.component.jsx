import React, { useState } from 'react';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';



const SignUp = ({ setToggle }) => {
    const [newUser, setNewUser] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = newUser;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, { displayName });
            setNewUser({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });

        } catch (error) {
            console.error(error);

        }
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setNewUser(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    return (
        <div className='sign-up w-full flex flex-col space-y-2 pt-24 justify-center items-center items justify-items-center h-full'>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form w-1/3 border-gray-900 bg-gray-50 justify-items-center justify-center items-center p-10 space-y-4' onSubmit={handleSubmit}>
                <div>
                    <p className='text-xl font-medium capitalize' >display name</p>

                    <input
                        className='w-full bg-gray-100 p-1 outline-none rounded-sm ring-1 ring-gray-300 focus:ring-gray-600'
                        type='text'
                        name='displayName'
                        value={newUser.displayName}
                        onChange={handleChange}
                        label='Display Name'
                        required
                    ></input>
                </div>
                <div>
                    <p className='text-xl font-medium capitalize' >Email</p>

                    <input
                        className='w-full bg-gray-100 p-1 outline-none rounded-sm ring-1 ring-gray-300 focus:ring-gray-600'
                        type='email'
                        name='email'
                        value={newUser.email}
                        onChange={handleChange}
                        label='Email'
                        required
                    ></input>
                </div>
                <div>
                    <p className='text-xl font-medium capitalize' >Password</p>

                    <input
                        className='w-full bg-gray-100 p-1 outline-none rounded-sm ring-1 ring-gray-300 focus:ring-gray-600'
                        type='password'
                        name='password'
                        value={newUser.password}
                        onChange={handleChange}
                        label='Password'
                        required
                    ></input>
                </div>
                <div>
                    <p className='text-xl font-medium capitalize' >Confirm password</p>

                    <input
                        className='w-full bg-gray-100 p-1 outline-none rounded-sm ring-1 ring-gray-300 focus:ring-gray-600'
                        type='password'
                        name='confirmPassword'
                        value={newUser.confirmPassword}
                        onChange={handleChange}
                        label='Confirm Password'
                        required
                    ></input>
                </div>
                <div className='w-full flex justify-items-center justify-center' >
                <button type='submit ' className='bg-gray-300 hover:bg-gray-400 hover:text-gray-100 px-10 py-1  text-gray-500 my-2 rounded-sm'>SIGN UP</button>
                </div>
            </form>
            <p onClick={() => setToggle(prev => !prev)} className='text-center text-blue-700 underline cursor-pointer' >Sign In Using Email And Password?</p>

        </div>
    );
};

export default SignUp;
