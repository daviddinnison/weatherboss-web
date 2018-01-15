import React from 'react';
import {Link} from 'react-router-dom'

export default function Back() {
    const text  = 'Example card';
    return (
        <Link to="/dashboard">Go back</Link>
    );
};

