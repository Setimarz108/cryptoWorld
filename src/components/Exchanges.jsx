import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar, Card } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;
  console.log(exchangesList)
  if (isFetching) return <Loader />;

  return (
    <>
    <div className='flex exchanges__container'>                           
      <div className='grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
         {exchangesList?.map((exchange) => (
         
          <div className=" m-2 bg-white rounded-lg shadow-xl lg:flex lg:max-w-lg font-bold crypto-card" key={exchange?.id}>
          
              <Card className="flex justify-between p-10" title={`${exchange?.rank}. ${exchange?.name}`}
              extra={<a href={exchange?.coinrankingUrl}><img className="crypto-image " src={exchange?.iconUrl}/></a>} 
              hoverable>
              
              <p className="ml-10 font-light text-white-500  "><h6 style={{fontSize:13, color:"#7BB4E3"}}>Markets </h6> <hr style={{opacity:"0.5"}}/>
              {millify(exchange?.numberOfMarkets)}</p>
              <p className="ml-10 font-light text-white-500"> <h6 style={{fontSize:13, color:"#7BB4E3"}}>24h </h6> <hr  style={{opacity:"0.5"}} /> ${millify(exchange?.['24hVolume'])}</p>
              <p className="ml-10 font-light text-white-500 "><h6 style={{fontSize:13, color:"#7BB4E3"}}>Change </h6> <hr  style={{opacity:"0.5"}} /> <span style={{color:'#CF46EB'}}>{millify(exchange?.marketShare)}%</span></p>

              </Card>

       </div>
        
        ))} 
      
      </div>
      </div>
    </>
  );
};

export default Exchanges;