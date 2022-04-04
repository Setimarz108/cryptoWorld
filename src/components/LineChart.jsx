import React from 'react'
import { Col, Row} from 'antd'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );



function LineChart({coinHistory, currentPrice, coinName}) {

    


        const coinPrice = [];
        const coinTimestamp = [];
 
        for(let i = 0 ; i < coinHistory?.data?.history?.length; i += 1){
 
              coinPrice.push(coinHistory?.data?.history[i].price) 
              coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleDateString())         
     

      
 
        console.log("coin history", coinHistory)
        console.log("coin Price", coinPrice)
      }


       
      const data = {
        labels: coinTimestamp,
        datasets: [
          {
            label: 'Price in USD',
            data: coinPrice,
            borderColor: '#51a4ec',
            backgroundColor: 'rgba(249, 255, 254, 0.972)',
          },
        ],
      };
    
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: ` ${coinName} Price
            `,
          },
        },
      };
     
  return (

    <>
    <Row className="chart-header">
      <h1 className="chart-title">{coinName} Price Chart</h1>
      <Col className="price-container">
          <h3 className="price-change">{coinHistory?.data?.change}%</h3>
          <h3 className="current-price">Current{coinName} Price: $ {currentPrice}</h3>
      </Col>
    </Row>

    <Line data={data} options={options}/>
    
    </>
  )
}

export default LineChart

