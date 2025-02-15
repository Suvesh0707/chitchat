import React from 'react'
import { Link } from 'react-router-dom'

function Homepage() {
    return (
        <>
            <div className='flex justify-between items-center h-16 bg-black text-white '>
                <div className='w-10 h-10 rounded-full object-cover'><img className="w-10 h-10 rounded-full object-cover ml-3" src="https://i.pinimg.com/736x/a6/8e/fc/a68efcad5debfbe207f52e8c19b379e9.jpg"></img></div>
               <label className="flex items-center ">ChatApp</label>
                <div>
                    <details className="dropdown bg-black">
                        <summary className="btn bg-black m-1 border-black">Setting</summary>
                        <ul className="menu dropdown-content  ">
                            <li><Link to= "/">logout</Link></li>
                        </ul>
                    </details>
                </div>
            </div>
        </>


    )
}

export default Homepage