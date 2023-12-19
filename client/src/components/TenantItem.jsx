// TenantItem.jsx

import React from 'react';

function handleClick() {
  console.log('Click worked!');
}

function TenantItem() {
  return (
    <div
      onClick={handleClick}
      className="bg-white p-4 rounded-md shadow-md mt-4 cursor-pointer"
    >
      <h2 className="text-lg font-semibold mb-2">Title</h2>
      <ul>
        <li>Information 1</li>
        <li>Information 2</li>
        <li>Information 3</li>
      </ul>
    </div>
  );
}

export default TenantItem;