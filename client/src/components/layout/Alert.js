import AlertContext from "../../context/alert/alertContext"
import { useContext } from "react";

const Alerts = ()=>{
  const alertContext = useContext(AlertContext);
  const {alerts} = alertContext;
  return(
    alerts.length>0 && alerts.map((alert) =>
    (
      <div key={alert.alertID} className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle' />{alert.msg}
      </div>
    )))
}

export default Alerts;