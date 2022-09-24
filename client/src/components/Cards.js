import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Button, Card, Row, Container, Col } from 'react-bootstrap/';
import { Link } from "react-router-dom";

function Cards(props) {
  const [products, setAllProducts] = useState([]);
  const [pageScrolledTill, setPageScrolledTill] = useState(120);
  function getProductsData(offSet) {
    axios({
      url: `${window.SERVER_BASE_URL}/api/getAllProducts?offSet=${offSet}`,
      method: "GET",
      async: false,
    }).then((res) => {
      let allProductsArray = [...products, ...res.data.allProducts];
      setAllProducts(allProductsArray);
    }).catch((err) => { console.log("ee", err); });
  }
  function listenScrollEvent(e) {
    const scroller = document.querySelector("#scroller");

    if (scroller.scrollTop > pageScrolledTill) {
      setPageScrolledTill(pageScrolledTill + 150)
      getProductsData(products.length);
    }

  }

  useEffect(() => {
      serchProducts(props.serchValue);
  }, [props.serchValue])
  useEffect(() => {
    if (props.filterValue) {
      getProductByFilter(props.filterValue, props.type);
    }else{
      serchProducts('');
    }
  }, [props.filterValue])

  function serchProducts(serchValue) {
    axios({
      url: `${window.SERVER_BASE_URL}/api/getProductsBasedOnSearch?serchValue=${serchValue}&offSet=${products.length}`,
      method: "GET",
      async: false,
    }).then((res) => {
      setAllProducts([]);
      if (res.data.products && res.data.products.length) {
        let allProductsArray = res.data.products;
        setAllProducts(allProductsArray);
      }
      return
    }).catch((err) => { console.log("error", err); });
  }

  function getProductByFilter(value, type) {
    axios({
      url: `${window.SERVER_BASE_URL}/api/getFilteredProducts`,
      method: "GET",
    }).then((res) => {
      let allProductsArray = res.data.products;
      if (type == 'Profit') {
        allProductsArray = allProductsArray.filter(e => {
          let maxProfitAmount = (e.buyPrice * value) / 100
          let minProfitAmount = (e.buyPrice * (value - 5)) / 100
  
          if (e.sellPrice > (e.buyPrice + minProfitAmount) && e.sellPrice < (maxProfitAmount + e.buyPrice)) {
            return e
          }
        })
        setAllProducts(allProductsArray);

      } else {
        allProductsArray = allProductsArray.filter(e => {
          let maxLossAmount = (e.buyPrice * value) / 100
          let minLossAmount = (e.buyPrice * (value - 5)) / 100
  
          if (e.sellPrice < (e.buyPrice - minLossAmount) && e.sellPrice > (e.buyPrice - maxLossAmount)) {
            return e
          }
        })
        setAllProducts(allProductsArray);
      }
  
    }).catch((err) => { console.log("err", err); });
  }
  window.localStorage.setItem('products', JSON.stringify(products));

  return (
    <>
      <Container style={{ 'positionY': 'hidden', 'height': 'calc(90vh - 30px)' }} fluid>
        {!products || !products.length ?
          <div style={{ 'fontSize': '30px', 'lineHeight': '300px', 'textAlign': 'center' }}>
            Product Not Found
          </div> :
          <Row className='row px-5' onScroll={listenScrollEvent} id="scroller" style={{ 'overflowY': 'auto', 'height': 'calc(90vh - 30px)' }}>
            {products.length && products.map((item) => {
              return (
                <Col md={3} key={item._id} className='mt-4 mb-2'>
                  <Card style={{ 'position': 'initial', 'backgroundColor': '#f4f4ff' }}>
                    <Card.Body>
                      <Card.Title>{item.Name}</Card.Title>
                      <Card.Text>
                        {item.Category} <br></br>
                        Buy Price - {item.buyPrice} <br></br>
                        Sell Price - {item.sellPrice}
                      </Card.Text>
                      <Link to={`product?id=${btoa(item._id)}`} value={item._id} style={{ 'color': 'white', 'textDecoration': 'none' }}><Button variant="primary"> Edit Products</Button></Link>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })}
          </Row>
        }
      </Container>
    </>
  );
}

export default Cards; 