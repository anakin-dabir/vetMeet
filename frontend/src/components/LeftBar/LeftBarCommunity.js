import { Users } from "../../dummyData";
import LeftPeople from "../LeftPeople/LeftPeople";
import { useGetvetrensMatchingHobbbiesQuery } from "../../services/nodeAPI";
import { useEffect, useState } from "react";

export default function LeftBarCommunity(props) {
 
  console.log(props.data.hobby);
  const {data:veterans, isLoading}=useGetvetrensMatchingHobbbiesQuery(props.data.hobby); 
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarFriendList">
        
          
          {!isLoading && veterans.data.data.map((u) => (
            <LeftPeople key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );  
    
 
}
