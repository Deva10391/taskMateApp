import InputValues from './HomeComps/InputValues';
import TaskValues from './HomeComps/Tasks';
import SignOutButton from './HomeComps/SignOutButton';
import { connect } from 'react-redux';

const UserHomePage = () => {

    return (
        <main className='homeMain' style={{ marginTop: '20px' }}>

            <div className='flexRow'>
                <div style={{ width: '30px' }}></div>
                <img src="https://th.bing.com/th/id/OIP.nSpmnThS4JJSfQ8qyjM1mgHaFj?w=265&h=199&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="logo" height={'30px'} />
                <div style={{ width: '15px' }}></div>
                <h2 style={{ marginBottom: '0px', marginTop: '0px' }}>TaskMate: Your Personal To Do List</h2>
                <div style={{ width: '45%' }}></div>
                <div id='def'><SignOutButton /></div>
            </div>
            <InputValues />
            <TaskValues />
        </main>
    );
}

const mapStateToProps = (state) => {
    return ({
        userData: state.action.userData,
    })
}

export default connect(mapStateToProps, {})(UserHomePage);