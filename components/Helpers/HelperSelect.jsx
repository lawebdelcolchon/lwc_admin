// src/components/Helpers/HelperSelect.js
import React from 'react';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';

const HelperSelect = ({ onSelectItems, onDeleteItems }) => {
    return (
        <div className="dropdown">
            <label>
                <input type="checkbox" className="checkbox" />
            </label>
            <div tabIndex={0} role="button" className="btn btn-ghost btn-square btn-xs pr-0">
                <ChevronDownIcon className='w-4'/>
            </div>
            <div>
                <ul tabIndex={0}
                    className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 p-2 shadow">
                    <li><button onClick={onSelectItems}>Todos</button></li>
                    <li><button onClick={onDeleteItems}>Nada</button></li>
                </ul>
            </div>
        </div>
    );
}

export default HelperSelect;
