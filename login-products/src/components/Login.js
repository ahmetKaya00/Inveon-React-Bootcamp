import React, {useContext, useState} from 'react'
import AuthContext from '../authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import alertify from 'alertifyjs';
import { Button, Card, CardBody, CardTitle, Col, Container, Form, FormGroup, Input, Label, Row} from 'reactstrap';

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setIsLoggedIn} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogin =()=>{
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response =>{
            const user = response.data.find(u=>u.username === username);

            if(user && password === "123456"){
                setIsLoggedIn(true);
                alertify.success("Giriş Başarılı!");
                navigate("/products");
            }else{
                alertify.error("Kullanıcı adı veya şifre hatalı!");
            }
        })
        .catch(err => {
            alertify.error("API hatası meydana geldi!");
            console.error("API hatası: ", err);
        });
    };

    return(
        <Container className="d-flex justify-content-center align-items-center"
        style={{minHeight: '100vh'}}>

            <Row>
                <Col md="12">
                    <Card style={{maxWidth: '400px', margin: '0 auto'}}>
                        <CardBody>
                            <CardTitle tag="h3" className="text-center mb-4">Giriş Yap</CardTitle>
                            <Form>
                                <FormGroup>
                                    <Label for="username">Kullanıcı Adı</Label>
                                    <Input
                                    type='text'
                                    name='username'
                                    id='username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder='Kullanıcı Adı'
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Şifre</Label>
                                    <Input
                                    type='text'
                                    name='password'
                                    id='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Şifre'
                                    />
                                </FormGroup>
                                <Button color='primary' block onClick={handleLogin}>Giriş Yap</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;