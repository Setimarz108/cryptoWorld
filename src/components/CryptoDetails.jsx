import React, {useState}from 'react'
import HTMLReactParser from 'html-react-parser'
import {useParams} from 'react-router-dom'
import millify from 'millify'
import {useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} from '../services/cryptoApi'
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd'
import LineChart from './LineChart'

function CryptoDetails() {
 
  const { coinId } = useParams();
  const [timeperiod, setTimePeriod] = useState('24h');
  const {data, isFetching} = useGetCryptoDetailsQuery(coinId); 
  const { data: coinHistory} = useGetCryptoHistoryQuery({coinId, timeperiod }); 
  const cryptoDetails = data?.data?.coin;


  const [historyInState, setHistoryInState] = useState()
  
  console.log("coin history", data);
  
if(isFetching) return 'Loading...'

   const time = [ '24h', '7d', '30d', '3m', '1y' ];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined style={{backgroundColor:"rgb(241, 15, 144)", borderRadius:"50%", fontSize:"1rem", padding:"5px",color:"#fff"}}/> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined style={{backgroundColor:"rgb(241, 15, 144)", borderRadius:"50%", fontSize:"1rem", padding:"5px",color:"#fff"}}/> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.['24hVolume'] && millify(cryptoDetails?.['24hVolume'])}`, icon: <ThunderboltOutlined style={{backgroundColor:"rgb(241, 15, 144)", borderRadius:"50%", fontSize:"1rem", padding:"5px",color:"#fff"}}/> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined style={{backgroundColor:"rgb(241, 15, 144)", borderRadius:"50%", fontSize:"1rem", padding:"5px",color:"#fff"}}/> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined style={{backgroundColor:"rgb(241, 15, 144)", borderRadius:"50%", fontSize:"1rem", padding:"5px",color:"#fff"}}/> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined style={{backgroundColor:"rgb(241, 15, 144)", borderRadius:"50%", fontSize:"1rem", padding:"5px" ,color:"#fff"}} /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined style={{backgroundColor:"rgb(241, 15, 144)", borderRadius:"50%", fontSize:"1rem", padding:"5px",color:"#fff"}}/> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined style={{backgroundColor:"rgb(241, 15, 144)", borderRadius:"50%", fontSize:"1rem", padding:"5px",color:"#fff"}}/>, icon: <ExclamationCircleOutlined style={{backgroundColor:"rgb(241, 15, 144)", borderRadius:"50%", fontSize:"1rem", padding:"5px",color:"#fff"}}/> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined style={{backgroundColor:"rgb(241, 15, 144)", borderRadius:"50%", fontSize:"1rem", padding:"5px",color:"#fff"}} /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined style={{backgroundColor:"rgb(241, 15, 144)", borderRadius:"50%", fontSize:"1rem", padding:"5px",color:"#fff"}} /> },
  ];

  return (


    <Col className='coin-detail-container'>
      <Col className="coin-heading-container">
        <div className="flex cryptoDetails__banner" >
      <img src={cryptoDetails?.iconUrl} alt="coin" style={{width:"20%"}} />
        <div className="flex flex-col justify-evenly ml-6">
         <h1 className="coin-name sm:text-base lg:text-lg">
           {cryptoDetails?.name} ({cryptoDetails?.symbol}) 
           </h1>
           <a href={cryptoDetails?.websiteUrl}>{cryptoDetails?.websiteUrl}</a>
          <strong><p>
            {cryptoDetails?.name} live price in US dollars. 
             View value statistics, market cap and supply.</p></strong>
            </div>  </div>
             <select                         
              value={timeperiod}
              className="select-timeperiod placeholder-black"
              placeholder='Select Time Period'
              onChange={(e) => setTimePeriod(e.target.value)}         
             >
              {time.map((date) => <option key={date} >{date}</option>)}
             </select>

             <LineChart  coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} 
             coinName={cryptoDetails?.name}/>
         
         <Col className="stats-container">

           <Col className=" flex coin-value-statistics">
                          {stats.map(({ icon, title, value}) => (
               <Col className="coin-stats flex flex-col">
                 <Col className="coin-stats-name flex flex-col">
                   <h3 className='mx-auto'>{icon}</h3>
                   <h3>{title}</h3>
                 </Col>
                   <h3 className="stats mx-auto">{value}</h3>
               </Col>
             ))}
           </Col>
           {/* <Col className="other-stats-info">
             <Col className="coin-value-statistics-heading">
               <h2 className="coin-details-heading">
                  Other Statistics
               </h2>
               <p>All Cryptocurrencies Statistics</p>
             </Col>
             {genericStats?.map(({ icon, title, value}) => (
               <Col className="coin-stats">
                 <Col className="coin-stats-name">
                   <h3 className='fill-cyan-500'>{icon}</h3>
                   <h3>{title}</h3>
                 </Col>
                   <h3 className="stats">{value}</h3>
               </Col>
             ))}
           </Col> */}
         </Col>
             
             <Col className="coin-desc-link">
                  <Row className="coin-desc">
                    <h1 className="coin-details-heading">
                      What is {cryptoDetails?.name}
                      {HTMLReactParser(`<p>${cryptoDetails?.description}</p>`)}
                    </h1>
        
                  </Row>

                  <Col className="coin-links">
                     <h1 className="coin-details-heading">
                       {cryptoDetails?.name} 
                     </h1>

                     {cryptoDetails?.links.map((link) => (

                       <Row className="coin-link" key={link.name}>
                          <h3 className="link-name">{link.type}</h3>
                          <a href={link.url} target="_blank" rel="noreferrer"> {link.name}</a>
                          </Row>
                     ))}
                  </Col>
             </Col>

      </Col>      
       </Col>
  )
}

export default CryptoDetails