// src/components/Helpers/HelperOption.js
import React from 'react';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';

const HelperOption = ({ Option, Items }) => {
    return (
      <div className="flex items-center justify-between">
        {Option}
        <div className="flex items-center ml-auto">
          {Items.length > 0 && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-square btn-xs pr-0">
                <ChevronDownIcon className='w-4'/>
              </div>
              <div>
                <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 p-2 shadow">
                  {Items.map((item, index) => (
                    <li key={index}>
                      <button>{item.name}</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

export default HelperOption;
