
import { PayPalButton } from "react-paypal-button-v2";
import { PayPalScriptOptions } from "@paypal/paypal-js/types/script-options";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../redux";
import { Button, Modal, Result } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../API/API";
import { setUserCart } from "../../../redux/action/user";
const paypalScriptOptions: PayPalScriptOptions = {
    "client-id":
        "AZ6P1Hr6TdK9BcDuIxf6WkDmUrbdRVGoGVl0KMGYCmvpvPxp9RFdbu8G1TPQ9TmTg0SbOUSvf1i80wnX",
    currency: "USD",
    locale: "en_US"
};
type Props = {
    list: [any],
    total: number,
    voucher?: string,
    discount?: number
}
const PayPal = ({ list, total, voucher, discount }: Props) => {
    const userId = useSelector((state: State) => state.user.userInfor.userId)
    const [productList, setProductList] = useState([])
    const delivery: any = useSelector((state: State) => state.payment.delivery)
    const [err,setErr] = useState(false)
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if (list.length) {
            const arr: any = []
            list.map((item: any) => {
                arr.push({
                    productId: item._id,
                    quantityInCart: item.quantityInCart,
                    cost: item.saleOf ? item.price * (100 - item.saleOf) / 100 : item.price,
                    productName: item.name
                })
            })
            setProductList(arr)
        }
    }, [total, userId, list.length])
    return (
        <>
            <Modal visible={visible} footer={null} onCancel={() => setVisible(false)}>
                <div className="w-100 h-50vh flex-mid">
                    <Result
                        status="success"
                        title="Successfully Purchased Cloud Server ECS!"
                        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                        extra={[
                            <Link to='/'><Button size='large' type="primary" key="console">
                                Back to Home
                            </Button></Link>,
                            <Link to='/product?page=1'><Button key="console" size='large'>
                                Buy again
                            </Button></Link>,
                        ]}
                    />
                </div>
            </Modal>
            <Modal visible={err} footer={null} onCancel={() => setErr(false)}>
            <div className="w-100 h-50vh flex-mid">
                    <Result
                        status="error"
                        title="Submission Failed"
                        subTitle="There are 0 item in your cart, please try again"
                    />
                </div>
            </Modal>
            <PayPalButton
                amount={total}
                style={{
                    layout: "vertical",
                    size: "responsive",
                    disable: true,
                    tagline: false,
                }}
                onSuccess={(details: any, data: any) => {
                    const result = details
                    const infor = result.purchase_units[0]
                    const email = infor.payee.email_address
                    const name = infor.shipping.name.full_name
                    const address = infor.shipping.address.address_line_1
                    const bill = {
                        name,
                        address,
                        phone: 0,
                        email,
                        status: 'Completed',
                        total,
                        details: [...productList],
                        delivery,
                        userId: userId && userId,
                        discount,
                        voucher: voucher && voucher
                    }
                    console.log(bill)
                    axios.post(`${API_URL}/bill/add`, bill)
                        .then(res => {
                            console.log(res.data)
                            if (res.data.success === true) {
                                dispatch(setUserCart([]))
                                if (!userId) {
                                    localStorage.removeItem("cart")
                                }
                            }
                            else {
                                Modal.error({
                                    title: 'Error',
                                    content: (
                                        <p>Please try again</p>
                                    )
                                })
                            }
                        }).catch(err => console.log(err))
                    setVisible(true)
                }}
                options={paypalScriptOptions}
                onError={(err: object) => setErr(true)}
            />
        </>
    );
}
export default PayPal