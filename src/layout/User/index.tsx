import React from 'react';
import '../../styles/user.scss'
import HistoryList from './Components/HistoryList';
import MenuLeft from './Components/MenuLeft';
import Profile from './Components/Profile';

type Props = {
    url: string
}
const User = ({url}: Props) => {
    return (
        <div>
            <div className="container" style={{ marginTop: '0' }}>
                <div className="row">
                    <div className="col-lg-3 mt-3">
                        <MenuLeft/>
                    </div>
                    <div className="col-lg-9 mt-3 bg-white" style={{padding:'0'}}>
                        <div className="user-tab-container rounded">
                            {url === 'history' && <HistoryList /> }
                            {url === 'user' && <Profile/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;