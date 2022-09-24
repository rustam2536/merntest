import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { BsArrowLeft } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Forms() {
    let allProducts = window.localStorage.getItem('products')
    let productId
    let productToEdit 
    if(window.location.search){
        productId = atob(window.location.search.slice(4)) //atob(window.location.search.slice(4))
    }
    if(productId){
        allProducts = JSON.parse(allProducts);
        productToEdit = allProducts.find(item => item._id === productId)
    }
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
      const form = e.currentTarget;
      e.preventDefault();
      if (form.checkValidity() === false) {
        e.stopPropagation();
        setValidated(true);
        toast.dismiss();
        toast.error("Please Fill All Required Fields!")
      }else{
        const {target} = e;
        let obj = Object.fromEntries(new FormData(target))
        axios({
            url: `${window.SERVER_BASE_URL}/api/saveProduct?id=${productToEdit ? productToEdit._id:''}`,
            method: "POST",
            data: obj,
          }).then((res) => {
            console.log("res",  res);
            setValidated(false);
            toast.dismiss();
            toast.success(res.data.message)
            setTimeout(() => {
                document.getElementById("addProductForm").reset();
                document.getElementById("backButton").click();
            }, 1200);
          }).catch((err) => { console.log("ee", err); });
        return
      }
  
    };
    return (
        <>
            <Button variant="info" onClick={() => navigate(-1)} type="button" id="backButton" className='my-3 mx-4'>
                <BsArrowLeft /> Go Back
            </Button>
            <ToastContainer />
            <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'padding': '30px', 'border': '1px solid #e1e1e1', 'borderRadius': '10px', 'margin': '2px 25%' }}>
                <Form noValidate validated={validated} onSubmit={handleSubmit} id='addProductForm'>
                    <h4 className='m-4' style={{'textAlign': 'center'}}>{productToEdit ? 'Update Product': 'Add Product'}</h4>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Product Name *</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name='Name'
                                defaultValue={productToEdit ? productToEdit.Name: ''}
                                placeholder="Enter Name"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Product Name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <Form.Label>Category *</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue={productToEdit ? productToEdit.Category: ''}
                                name='Category'
                                placeholder="Enter Category"
                            />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Category.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" controlId="validationCustom03">
                            <Form.Label>Buy Price *</Form.Label>
                            <Form.Control type="text" defaultValue={productToEdit ? productToEdit.buyPrice: ''} name='buyPrice' pattern="[0-9]*" placeholder="Enter Buy Price" required />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Valid Price 
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom04">
                            <Form.Label>Sell Price *</Form.Label>
                            <Form.Control type="text" defaultValue={productToEdit ? productToEdit.sellPrice: ''} name='sellPrice' pattern="[0-9]*" placeholder="Enter Sell Price" required />
                            <Form.Control.Feedback type="invalid">
                                Please Enter Valid Price.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button type="submit" className='my-4'>{productToEdit ? 'Update Product': 'Add Product'}</Button>
                </Form>
            </div>
        </>
    );
}

export default Forms;