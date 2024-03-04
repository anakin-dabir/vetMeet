import React from 'react';
// import { PeopleTwoTone } from '@material-ui/icons'
import './dashboard.css'


const Consultant=() => {
    return (
        <div className='row mt-4'>
            <div className="col-2"><div className="circle_icon">
                {/* <PeopleTwoTone/> */}
            </div></div>
            <div className="col-8">
                <div className="row ms-1">John William</div>
                <div className="row"><small>john@email.com</small></div>
            </div>
            <div className="col-2">
                {/* <PeopleTwoTone/> */}
            </div>
        </div>
    );
}

export default Consultant;
