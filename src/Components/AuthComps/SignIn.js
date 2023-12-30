import { auth, gP } from '../../config/firebase';
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { connect } from 'react-redux';
import { authTrue, authFalse } from '../../actions/requestActions';

const SignIn = ({ authTrue, authFalse }) => {

    const [em, setEm] = useState('');
    const [p, setP] = useState('');
    const [msg, setMsg] = useState('');

    const unPSignIn = async (e) => {
        e.preventDefault();
        console.log('signing in');
        try {
            await signInWithEmailAndPassword(auth, em, p);
            authTrue();
            console.log('sign-in done');
        }
        catch (error) {
            authFalse();
            if (error.message === 'Firebase: Error (auth/invalid-login-credentials).') {
                setMsg('invalid credentials');
            }
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, gP);
            authTrue();
            console.log('Google sign-in done');
        } catch (error) {
            authFalse();
            console.error('Error: ', error.message);
        }
    }

    return (
        <main id='authMain'>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }} className='flexCol'>
                <div className='alignMid' style={{ marginTop: '20px' }}>
                    <fieldset>
                        <h3>Sign In</h3><h4 style={{ color: 'red', wordWrap: 'true' }}>{msg}</h4>
                        <form onSubmit={unPSignIn} style={{ display: 'flex', justifyContent: 'center', width: '100%' }} className='flexCol'>
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
                            >Sign In</button>
                        </form>
                        <div className='alignMid' style={{ marginTop: '20px' }}>
                            <button
                                onClick={() => handleGoogleSignIn()}
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

export default connect(mapStateToProps, { authTrue, authFalse })(SignIn);