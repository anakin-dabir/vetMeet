import "./LeftBarEvents.css";
import { Users } from "../../dummyData";
import LeftEvents from "../LeftEvents/LeftEvents"
import { useGetAllEventsQuery } from "../../services/nodeAPI";
export default function LeftBar() {


  const {data,isLoading,isError}=useGetAllEventsQuery()
  console.log(!isLoading&&data)

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarFriendList">
          {!isLoading && data?.data.data.map((u) => (
            <LeftEvents key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}