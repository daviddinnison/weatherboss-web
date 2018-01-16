import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../../requires-login';
import { Link } from 'react-router-dom';

export default function RenderedLocation(props) {
    // export class Locations extends React.Component {

    
    return (
        <div>
            <p>{props.name}</p>
        </div>
    );

}

// const mapStateToProps = state => {
//     const { currentUser } = state.auth;
//     return {
//         id: state.auth.currentUser.id,
//         locations: state.protectedData.locations
//     };
// };

// export default requiresLogin()(connect(mapStateToProps)(RenderedLocation));