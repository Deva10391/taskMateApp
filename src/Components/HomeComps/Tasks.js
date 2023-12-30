import { useState, useEffect } from 'react';
import { getDocs, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { connect } from 'react-redux';
import { loadFalse, loadTrue } from '../../actions/requestActions';

const TaskValues = ({ load, loadFalse, loadTrue }) => {

    const [val, setVal] = useState([]);
    const [displayMode, setDisplayMode] = useState('inProgress');
    const [isClicked, setIsClicked] = useState(false);


    const toggleDisplayMode = (mode) => {
        setIsClicked(!isClicked);
        console.log(isClicked);
        setDisplayMode(mode);
    }

    const collRef = collection(db, "coll01");

    const gettingData = async () => {
        console.log('called');
        try {
            const data = await getDocs(collRef);
            const tempData = data.docs.map(d => d = ({ _id: d.id, ...d.data() }));
            const filteredData = tempData.filter(d => d.userEmail === auth.currentUser.email);
            setVal(filteredData);
        }
        catch (error) {
            console.error('Error: ', error.message);
        }
    };

    const updateDisplayValue = async (doc_id) => {
        let newDisplayMode;
        if (displayMode === 'inProgress') { newDisplayMode = 'completed' }
        else { newDisplayMode = 'inProgress' }

        try {
            const userDocRef = doc(db, "coll01", doc_id);
            await updateDoc(userDocRef, {
                displaying: newDisplayMode
            });
            loadTrue();
        }
        catch (error) {
            console.error('Error updating displaying value:', error.message);
        }
    };

    useEffect(() => {
        const f = () => {
            if (load) {
                console.log(load);
                gettingData();
                loadFalse();
                console.log(load);
            }
        }
        f();
    }, [load]);

    const deleteFromDB = async (del_id) => {
        console.log(del_id);
        const valToDel = doc(db, "coll01", del_id);
        await deleteDoc(valToDel);
        loadTrue();
    }

    return (
        val.length > 0 ? <div id='t' style={{ display: 'flex', flexDirection: 'column' }}>
            <div id='def' className='flexRow' style={{ width: '100%', textAlign: 'center' }}>
                <button className='taskB' style={{ backgroundColor: isClicked ? 'transparent' : 'rgba(255, 255, 255, 0.1)', width: '50%', borderRight: '1px solid white', borderRadius: '0px' }} onClick={() => toggleDisplayMode('inProgress')}>In progress</button>
                <button className='taskB' style={{ backgroundColor: isClicked ? 'rgba(255, 255, 255, 0.1)' : 'transparent', width: '50%', borderRadius: '0px' }} onClick={() => toggleDisplayMode('completed')}>Completed</button>
            </div>
            <div id='l' className='alignMid' style={{ flexDirection: 'column' }}>
                <div height={'30px'}></div>
                {val.map((i) => i.displaying === displayMode ? (
                    <fieldset key={i._id} style={{ marginTop: '10px' }}>
                        {i.dataTask === '' && i.date === '' && i.description === '' ?
                            (<div className='flexRow'>
                                <div>Empty</div>
                                <div style={{ width: '100%' }}></div>
                                <button id='del' onClick={() => deleteFromDB(i._id)}>X</button>
                            </div>) :
                            (<div>
                                <div className='flexRow'>
                                    {
                                        i.dataTask ? <div><p style={{ marginTop: '5px', marginBottom: '5px' }}><b>{i.dataTask}</b></p>
                                        </div> : null
                                    }
                                    <div className='flexRow' style={{ width: '100%' }}>
                                        <div style={{ width: '100%' }}></div>
                                        <div id='def'><button style={{ width: '100px' }} onClick={() => updateDisplayValue(i._id)}>{displayMode === 'inProgress' ? <div>done</div> : <div>do now</div>}</button></div>
                                        <button id='del' onClick={() => deleteFromDB(i._id)}>X</button>
                                    </div>
                                </div>
                                <hr />
                                {
                                    i.description ? <div>{i.description}</div> : null
                                }
                                <div className='flexRow'>
                                    {
                                        i.date ? <div style={{ width: '100%' }}><b>by date: </b>{i.date}</div> : null
                                    }
                                </div>
                            </div>)
                        }
                    </fieldset>
                ) : null)}
            </div>
            <div style={{ height: '30px' }}></div>
        </div > : <div className='flexCol' style={{ marginTop: '20px', textAlign: 'center' }}><div><button onClick={() => loadTrue()}>Reload</button></div><p>You don't have any tasks right now</p></div>
    );
}

const mapStateToProps = (state) => {
    return ({
        load: state.action.load,
    })
}

export default connect(mapStateToProps, { loadTrue, loadFalse })(TaskValues);