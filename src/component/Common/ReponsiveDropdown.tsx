import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../API/API'
import { Link } from 'react-router-dom';
interface DropdownProps {
    gender?: string
}
const ReponsiveDropdown = ({gender}: DropdownProps) =>{
    const [categoriesForMen, setCategoriesForMen] = useState([])
    const [categoriesForWomen, setCategoriesForWomen] = useState([])
    useEffect(() => {
        try {
            axios.get(`${API_URL}/category`)
                .then(res => {
                    if (res.data.success === true) {
                        setCategoriesForMen(res.data.data.categoriesForMen)
                        setCategoriesForWomen(res.data.data.categoriesForWomen)
                    }
                    else return
                })
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <div>
            {gender === 'Men' && <div className="d-flex reponsive-dropdown">
                {categoriesForMen.map((cate: any)=>(
                    <Link className="text-white" key={cate._id} to="/"> {cate.name} </Link>
                ))}
             </div>}
             {gender === 'Women' && <div className="d-flex reponsive-dropdown">
                {categoriesForWomen.map((cate: any)=>(
                    <Link className="text-white" key={cate._id} to="/"> {cate.name} </Link>
                ))}
             </div>}
        </div>
     );
}
export default ReponsiveDropdown