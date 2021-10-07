import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { API_URL } from '../../API/API'
import { State } from '../../redux'
import { setCategoriesForMen, setCategoriesForWomen } from '../../redux/action/category'
interface DropdownProps {
    gender?: string
}

const DropdownCategory = ({ gender }: DropdownProps) => {
    // const [categoriesForMen, setCategoriesForMen] = useState([])
    const categoriesForMen: [] = useSelector((state: State)=> state.category.categoriesForMen)
    const categoriesForWomen: [] = useSelector((state: State)=> state.category.categoriesForWomen)
    const dispatch = useDispatch()
    const getCate = () =>{
        try {
            axios.get(`${API_URL}/category`)
                .then(res => {
                    if (res.data.success == true) {
                        dispatch(setCategoriesForMen(res.data.data.categoriesForMen))
                        dispatch(setCategoriesForWomen(res.data.data.categoriesForWomen))
                    }
                    else return
                })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        !categoriesForMen.length && getCate()
    }, [])
        return (
            <div className="container-fluid dropdown-category">
                <div className="row justify-content-center">
                    {gender === "Men" && categoriesForMen.map((cate: any) => (
                        <div key={cate._id} className="col-xl-2 col-lg-2 col-md-3 col-sm-6 pt-2 pb-2">
                            <div className="card nav-menu">
                                <img src={`${API_URL}/upload/${cate.avatar}`} alt="" className="card-image" />
                                <div className="card-body">
                                    <div className="flex-mid">
                                        <h6 className="text-white"> {cate.name} </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {gender === "Women" && categoriesForWomen.map((cate: any) => (
                        <div key={cate._id} className="col-xl-2 col-lg-2 col-md-3 col-sm-6 pt-2 pb-2">
                            <div className="card nav-menu">
                                <img src={`${API_URL}/upload/${cate.avatar}`} alt="" className="card-image" />
                                <div className="card-body">
                                    <div className="flex-mid">
                                        <h6 className="text-white"> {cate.name} </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
}
export default DropdownCategory