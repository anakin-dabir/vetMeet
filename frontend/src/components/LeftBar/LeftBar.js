import "./LeftBar.css";
import { Users } from "../../dummyData";
import LeftPeople from "../LeftPeople/LeftPeople"
import { useGetFollowedVetrensQuery } from "../../services/nodeAPI";
export default function LeftBar() {

   const{data,isLoading,isError}=useGetFollowedVetrensQuery()
   console.log(!isLoading&&data)


  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarFriendList">
          
          
          {!isLoading && data?.data.map((u) => (
            <LeftPeople key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}