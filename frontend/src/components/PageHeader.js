import { Link } from "react-router-dom"
import '../css/jobs.css';
export const PageHeader=( props ) => {
  const toLink=props.toLink||'/';
  return(
<div className="header row" style={{padding:"2rem 3rem"}}>
  <div className="col-8 head_left">
    <h1 className="head_name">{props.heading}</h1>
    <p className="head_description pt-2" >{props.subHeading}</p>
  </div>
  {props.btnText && <div className="col-4 head_right">
        <Link to={toLink}><button className="btn head_btn" type="button">{props.btnText}</button>
        </Link>
  </div>}
</div>

  )
}

