import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from 'reactstrap';

function Products(){

    const [products, setProducts] = useState([]);

    useEffect(()=>{
        axios.get('https://fakestoreapi.com/products')
        .then(response => setProducts(response.data))
        .catch(err => console.error("API Hatası:", err));
    }, []);

    const truncateText = (text, maxLength) => {
        if(text.length > maxLength){
            return text.substring(0,maxLength) + '...';
        }
        return text;
    }

    return (
        <div className='container mt-5'>
            <Row>
                {products.map(product => (
                    <Col sm="6" md="4" lg="3" key={product.id} className='mb-4'>
                        <Card style={{height: '100%'}}>
                            <CardImg top width="100%" src={product.image} alt={product.title} style={{height: '200px', objectFit: 'contain'}}/>
                            <CardBody>
                                <CardTitle tag="h5">
                                    {truncateText(product.title, 20)}
                                </CardTitle>
                                <CardText>
                                    {truncateText(product.description, 50)}
                                </CardText>
                                <CardText><strong>Fiyat: ${product.price}</strong></CardText>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Products;