import Sidebar from "./sidebar";
import "./dashboardStyle.css";
import "../../normalize.css";
import Records from "./Records";

export default function UserDashboard() {
  return (
    <div className="container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="right">
        <div className="heading">Admin DashBoard</div>
        <div className="main">
          <Records />
        </div>
      </div>
    </div>
  );
}
