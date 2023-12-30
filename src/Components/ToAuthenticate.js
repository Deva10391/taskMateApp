import { auth, gP } from '../config/firebase';
import { useState } from 'react';
import { connect } from 'react-redux';
import { authTrue, authFalse } from '../actions/requestActions';
import SignIn from './AuthComps/SignIn';
import Register from './AuthComps/Register';

const ToAuthenticate = () => {

    let [firstTime, setFirstTime] = useState(true);
    let text = '';
    if (firstTime)
        text = 'Register';
    else
        text = 'Sign in'

    return (
        <main>
            <div className='authMain'>
                {firstTime ? <SignIn /> : <Register />}
                <div className='alignMid' style={{ marginTop: '20px', marginBottom: '20px' }}>
                   <button onClick={() => { setFirstTime(!firstTime) }}>{text} instead</button>
                </div>
            </div>
        </main>
    )
}


const mapStateToProps = (state) => {
    return ({
        userData: state.action.userData
    });
};

export default connect(mapStateToProps, { authTrue, authFalse })(ToAuthenticate);