import { useState,useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import "../css/People.css"
import { useGetAllVeteransQuery } from '../services/nodeAPI';
// import org from "./card"



const People = () => {
     const  [query,setQuery] = useState("");
  const { data, isLoading, isError }=useGetAllVeteransQuery();
  console.log( !isLoading&&data )

  const CardAdv=( org ) => {


    return org?.filter( ( i ) => i.firstName.toUpperCase().includes( query ) ).map( ( l, i ) => (
      <div key={i} className='col-md-4'>
        <div style={{ "padding": "1rem" }}>
          <div className="card" style={{ "width": "18rem" }}>
            <img className="card-img-top" src={require( './../img/org.png' )} style={{ "height": "180px", "width":"100%" }} alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title"><span>{l.firstName+" "+l.lastName}</span></h5>
              <p className="card-text" style={{ "marginTop": "0.6rem" }}>Profession: <span style={{ "color": "#0d6efd" }}>{l.profession}</span></p>
              <p className="card-text" style={{ "marginTop": "0.6rem" }}>Hobbies: <span style={{ "color": "#0d6efd" }}>{l.hobbies.join( ", " )}</span></p>
              {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
              <div className='text-center'>

                <Link to={`/dashboard/veteran`} >
                  <button className="btn btn-primary" style={{ "backgroundColor": "#0d6efd", "borderColor": "#0d6efd" }} onClick={() => { localStorage.setItem( "veteranID", l._id ) }}>
                    View Details

                  </button>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    ) )
  }
    //  const listOrganizations = () =>
    //     allOrganizations.filter((i)=>i.name.toUpperCase().includes(query)).map((c, i) => (
    //        <OrganizationCard key={i} href={`/links/${c.slug}`}>
    //             <a className='list-categories'>
    //                 <img src={c.image && c.image.url} alt={c.name} className="category-image" />
    //                 <p className='category-name'>{c.name}</p>
    //             </a>
    //         </OrganizationCard>
    //     ));
  return (
    <div className='mt-2'>
    <div className='container marg-2'>
        <div className='row d-flex justify-content-center'>
          <input type="text" className='form-inp' placeholder='Search People here....' onChange={e => setQuery( e.target.value.toUpperCase() )} />
        </div>
      </div>
      <div className="container">
        <div className="row">
          {!isLoading&&CardAdv( data?.data )}
        </div>
      </div>
    </div>
  )
}

export default People