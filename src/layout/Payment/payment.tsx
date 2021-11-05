import React from 'react'
import { Steps, Result, Button } from 'antd'
import UserInforForm from '../Cart/Components/UserInforForm'
import {  useState } from 'react'
import { useSelector } from 'react-redux'
import { State } from '../../redux'
import { Link } from 'react-router-dom'
const { Step } = Steps
const Payment = () => {
    // const current = useSelector((state: State) => state.payment.step)
    const cart: any = useSelector((state: State) => state.user.cart)
    const total: any = useSelector((state: State) => state.payment.total)
    const delivery: any = useSelector((state: State) => state.payment.delivery)
    const [current, setCurrent] = useState(0)
    const next = () =>{
        setCurrent(1)
    }
    const steps = [
        {
            title: 'First step',
            description: 'Check Information'
        },
        {
            title: 'Last step',
            description: 'Result'
        },
    ];
    return (
        <div className="checkout-form bg-white">
            <div className="row">
                <div className="col-lg-12 pb-3 pt-3">
                    <div className="checkout bg-white rounded">
                        <Steps current={current}
                            className="steps"
                            size="default">
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} description={item.description} />
                            ))}
                        </Steps>
                        <div className="steps-content">
                            {current === 0 && <UserInforForm next={next} list={cart} total={total} delivery={delivery} />}
                            {current === 1 && <div className="w-100 h-50vh flex-mid">
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
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Payment