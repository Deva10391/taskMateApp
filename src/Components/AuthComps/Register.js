import { auth, gP } from '../../config/firebase';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { connect } from 'react-redux';
import { authTrue, authFalse } from '../../actions/requestActions';

const Register = ({ authTrue, authFalse }) => {
    const [em, setEm] = useState('');
    const [p, setP] = useState('');
    const [msg, setMsg] = useState('');

    const unPSignUp = async (e) => {
        e.preventDefault();
        console.log('registering');
        if (p.length < 6) {
            console.log("password is too short");
            return false;
        }
        try {
            await createUserWithEmailAndPassword(auth, em, p);
            authTrue();
            console.log('registering done');
        }
        catch (error) {
            authFalse();
            if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                setMsg('email already registered');
            }
        }
    }

    const googlePopUp = async () => {
        console.log('getting your pop up window');
        try {
            await signInWithPopup(auth, gP);
            authTrue();
            console.log('signing in done');
        }
        catch (error) {
            authFalse();
            console.error('Error: ', error.message);
        }
    }

    return (
        <main id='authMain'>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }} className='flexCol'>
                <div className='alignMid' style={{ marginTop: '20px' }}>
                    <fieldset>
                    <h3>Register</h3>
                    <h4 style={{ color: 'red', wordWrap: 'true' }}>{msg}</h4>
                        <form onSubmit={unPSignUp} style={{ display: 'flex', justifyContent: 'center', width: '100%' }} className='flexCol'>
                            <input
                                type='email'
                                placeholder='email'
                                onChange={(e) => setEm(e.target.value)}
                            />
                            <input
                                type='password'
                                placeholder='password'
                                onChange={(e) => setP(e.target.value)}
                            />
                            <button
                                type='submit'
                            >Register</button>
                        </form>
                        <div className='alignMid' style={{ marginTop: '20px' }}>
                            <button
                                onClick={() => googlePopUp()}
                            >Google</button>
                        </div>
                    </fieldset>
                </div>
            </div>
        </main>
    );
}

const mapStateToProps = (state) => {
    return ({
        userData: state.action.userData
    });
};

export default connect(mapStateToProps, { authTrue, authFalse })(Register);