import React, { useState, useEffect} from 'react';
import { Button, Row, Col, Form, Input,  DatePicker, notification } from 'antd';
import moment from 'moment';
import axios from 'axios';

const Timer = () => {
    const [counter, setCounter] = useState(0);
    const [isLive, setIsLive] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [lastTimeout, setLastTimeout] = useState(null); 
    const [form] = Form.useForm();


    const configTimepicker = {
        rules: [{ type: 'object', required: !isLive, message: 'Please select time!' }],
      };

    const secsToTime = secs => {
        const hours = Math.floor(secs / 3600);
        const minutes = Math.floor((secs%3600) / 60);
        const seconds = secs - hours*3600 - minutes*60;
        return `${hours < 10 ? '0'+hours : hours}: ${minutes <10 ? '0'+minutes : minutes }: ${seconds <10 ? '0'+seconds : seconds}`;
    }
    useEffect(() => {
        if (isReset) {
            setIsLive(false);
            setCounter(0);
            setIsReset(false);
            clearTimeout(lastTimeout);
        } else if (isLive) {
            const timeoutid = setTimeout(() => setCounter(counter+1), 1000);
            setLastTimeout(timeoutid);
        } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter, isLive, isReset]);

    const openNotification = (type, description) => {
        let message = '';
        switch (type) {
            case 'error': message = 'Error'; break;
            case 'success': message = 'Success'; break;
            default: message = 'Info'; 
        }
        notification[type]({
          message,
          description
        });
      };

    const onFinish = ({ description, 'end-date':endDate }) => {
        if (endDate !== undefined && endDate.isAfter(moment())) {
            openNotification('error', 'You cannot finish your task in the future');
        } else {
            const API_URL = process.env.REACT_APP_API_URL;
            axios.post(`${API_URL}/tasks`, {
                duration: counter,
                description,
                endDate: counter === 0 && endDate!== undefined ? endDate : moment()
            })
            .then(() => openNotification('success', 'You added your task successfully'))
            .then(() => {
                setIsLive(false);
                setCounter(0);
                clearTimeout(lastTimeout);
                form.resetFields();
                window.location.reload();
            })
            .catch(error => console.log(error))
        }
        
    };
    return (
    <>
        <Row className="center-text">
            <Col span={24} >
        <p className="counter">{secsToTime(counter)}</p>
            </Col>
        </Row>
        <Row className="center-text">
            <Col span={8}>
        <Button className="control-button" type='primary' onClick={() => setIsLive(false)}>Pause</Button>

            </Col>
            <Col span={8}>
            <Button className="control-button" type='primary' onClick={() => setIsLive(true)}>Play/Resume</Button>

            </Col>
            <Col span={8}>
            <Button className="control-button" danger onClick={() => {setIsReset(true);}}>Reset</Button>

                </Col>
    
        </Row>
        <Row className="form-submission" >
            <Form form={form} onFinish={onFinish} className="full-width"> 

            <Col span={24}>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item name="end-date" label="End date" {...configTimepicker}>
                    <DatePicker showTime format="YYYY-MM-DD HH:mm"/>
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item>
                <Button type="primary" htmlType="submit">
          Submit
        </Button>
                </Form.Item>
            </Col>
            </Form>

        </Row>
    </>
    )
}

export default Timer;