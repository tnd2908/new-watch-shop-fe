import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { API_URL } from "../../API/API";
import parse from "html-react-parser"

interface INewsProps {

}

const News: React.FC<INewsProps> = props => {
    const params: any = useParams();
    const [newItem, setNewItem] = useState<any>();

    useEffect(() => {
        if (params.id) {
            axios.get(`${API_URL}/news/detail/` + params.id).then(res => setNewItem(res.data.result));
        }
    }, [])

    return <div className="">
        <div className="news__banner">
            <img src="https://www.gshock-vietnam.vn/wp-content/uploads/2019/08/GBD-800-8-6.png" alt="" className="w-100" height={200} />
        </div>
        <div className="container">
            <div className="news__body row p-5">
                <div className="col-8">
                    <div>
                        <span className="h5">Tác giả: Nghia Chow</span>
                        <span className="h5 float-end">Đã đăng vào: 21-10-2021 8:30 AM</span>
                    </div>
                    <div className="news__content__title text-center mt-5">
                        <span className="h1">{newItem?.title}</span>
                    </div>
                    <div className="news__content__desciption mt-3">
                        <span>{newItem?.description}</span>
                    </div>
                    <div className="news__content_core mt-3">
                        {parse(newItem?.content || "")}

                    </div>
                </div>
                <div className="col-3 ms-5 h6">
                    Các bài viết liên quan
                </div>
            </div>
        </div>

    </div>
}

export default News