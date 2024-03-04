import React from "react";
import "./dashboard.css";

export default function DashboardCard(props) {
  return (
    <>
      <div className="card dashboardCard">
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <p className="card-title">{props.name}</p>
              <h4 className="card-subtitle mb-2 text-muted pt-3">{props.value}</h4>
            </div>
            <div className="col-6 pt-4 ps-5"></div>
          </div>
        </div>
      </div>
    </>
  );
}
