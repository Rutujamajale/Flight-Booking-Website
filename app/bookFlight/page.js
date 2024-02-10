import React from 'react'

function page({params,callback}) {
    console.log("flight page",params);
    console.log("user page",callback);
  
  return (
    <div>page</div>
  )
}

export default page;