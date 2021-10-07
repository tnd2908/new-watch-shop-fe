import React from 'react'
import {Steps, Result, Button} from 'antd'
import UserInforForm from '../../component/Payment/UserInforForm'
import PaymentForm from '../../component/Payment/PaymentForm'
import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from '../../redux'
import { Link, Redirect } from 'react-router-dom'
import { setStepOne } from '../../redux/action/payment'
const {Step} = Steps
const Payment = () => {
    const current = useSelector((state: State) => state.payment.step)
    const cart: any = useSelector((state: State) => state.user.cart)
    const total: any = useSelector((state: State) => state.payment.total)
    const delivery: any = useSelector((state: State) => state.payment.delivery)
    const dispatch = useDispatch()
    const steps = [
        {
            title: 'First',
            content: (
                <PaymentForm />
            ),
            description: 'Payment method',
        },
        {
            title: 'Second',
            content: (
                <UserInforForm list={cart} total={total} delivery={delivery} />
            ),
            description: 'Check Information'
        },
        {
            title: 'Last',
            content: (
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
            ),
            description: 'Done'
        },
    ];
    useEffect(()=>{
        dispatch(setStepOne())
    },[])
    if(cart.lenght == 0 || total === 0)
    return <Redirect to='/cart'/>
    else
    return (
        <div className="container-fluid bg-e pb-5" style={{paddingTop:'150px'}}>
            <div className="container bg-white">
                <div className="row">
                    <div className="col-lg-12 pb-3 pt-3">
                        <div className="checkout bg-white rounded">
                            <Steps current={current}
                                className="steps"
                                type='navigation'
                                size="default">
                                {steps.map(item => (
                                    <Step key={item.title} title={item.title} description={item.description} />
                                ))}
                            </Steps>
                            <div className="steps-content">{steps[current].content}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Payment