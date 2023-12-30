import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { authFalse } from '../../actions/requestActions';

const SignOutButton = () => {

    const dispatch = useDispatch();

    const signOutF = async () => {
        console.log('signing you out');
        try {
            await signOut(auth);
            dispatch(authFalse());
            console.log('done');
        }
        catch (error) {
            console.error('Error: ', error.message);
        }
    }

    return (
        <div className='alignMid' style={{ marginTop: '10px', marginBottom: '10px', border: '1px solid white', width: '150px', borderRadius: '10px' }}>
            <button
                type='submit'
                onClick={() => signOutF()}
            >Sign Out</button>
        </div>
    );
}

export default SignOutButton;