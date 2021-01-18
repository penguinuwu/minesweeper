import React from 'react';

// render error status
function StatusAlert(props) {
  if (!props.status) return null;
  return (
    <div className='alert alert-info mb-1' role='alert'>
      {props.status}
    </div>
  );
}

export default StatusAlert;
