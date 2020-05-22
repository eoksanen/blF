import React from 'react'
const ShowName = ({ name }) => (

    <div>{JSON.stringify(name).substring(1, name.length + 1)} logged in</div> 

)

export default ShowName
