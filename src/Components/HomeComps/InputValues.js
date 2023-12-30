import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { loadTrue } from '../../actions/requestActions';
import { connect } from 'react-redux';

const InputValues = ({ loadTrue }) => {

    const [newTask, setNewTask] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const [newDate, setNewDate] = useState('');

    const collRef = collection(db, 'coll01');

    const saveToDB = async (e) => {
        e.preventDefault();
        console.log(auth.currentUser.email, newTask, newDesc, newDate);
        try {
            await addDoc(collRef, { userEmail: auth.currentUser.email, dataTask: newTask, description: newDesc, date: newDate, displaying: 'inProgress' });
            loadTrue();
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setNewTask('');
            setNewDesc('');
            setNewDate('');
        }
    }

    return (
        <div>
            <div className='alignMid'><h3>Add tasks</h3></div>
            <div className='alignMid'>
                <form onSubmit={saveToDB} className='flexCol' style={{ width: '60%' }} >
                    <input placeholder='task' onChange={(e) => setNewTask(e.target.value)} value={newTask} />
                    <input placeholder='description' onChange={(e) => setNewDesc(e.target.value)} value={newDesc} />
                    <input type='date' placeholder='date' onChange={(e) => setNewDate(e.target.value)} value={newDate} />
                    <button type='submit'>Add task</button>
                </form>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return ({
        load: state.action.load,
    })
}

export default connect(mapStateToProps, { loadTrue })(InputValues);