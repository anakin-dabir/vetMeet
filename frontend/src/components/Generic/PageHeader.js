import { Link } from "react-router-dom"

export const PageHeader=( props ) => {
  const toLink=props.toLink||'/';
  return(
<div className="header row ">
  <div className="col-8 head_left">
    <h1 className="head_name">{props.heading}</h1>
    <p className="head_description">{props.subHeading}</p>
  </div>
  <div className="col-4 head_right">
        <Link to={toLink}><button className="btn head_btn" type="button">{props.btnText}</button>
        </Link>
  </div>
</div>

  )
}

