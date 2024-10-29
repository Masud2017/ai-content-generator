import React from 'react'
import {Heading,Text} from "@radix-ui/themes";

const page = () => {
  return (
    <div style = {{height: "50vh","display":"flex", flexDirection: "column", justifyContent : "center", "alignItems" : "center"}}>
      <h1 style = {{fontSize: "2rem",fontWeight: "800"}}>Upgrade Demo</h1>
      
      <Text>Please contact the software provider to upgrade your membership to lifetime.</Text>
      </div>
  )
}

export default page