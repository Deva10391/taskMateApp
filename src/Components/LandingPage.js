import { connect } from 'react-redux';
import ToAuthenticate from './ToAuthenticate';
import UserHomePage from './UserHomePage';
import { useEffect } from 'react';

export const LandingPage = ({ userData }) => {

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    if (!userData) {
        return <ToAuthenticate />
    }
    else {
        return <UserHomePage />
    }
}

const mapStateToProps = (state) => {
    return ({
        userData: state.action.userData
    });
};

export default connect(mapStateToProps, {})(LandingPage);