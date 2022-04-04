import React, { useState } from "react";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "http://coinreolution.com/wp-content/uploads/2020/06/cryptonews.jpg";


function News({ simplified }) {
  
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 6 : 12,
  });
  
 const {data} = useGetCryptosQuery(100)
  console.log("coins", data)

  if (!cryptoNews?.value) return "Loading...";

  return (

    <>
      <div className="news_banner mx-5 flex justify-center md:mt-20 lg:mt-0 mb-9" style={{backgroundColor:"#df00ff45", padding:"10px", borderRadius:"22px"}}>
        <div >
          <img className="" style={{width: "80%", borderRadius: "50%"}}
          src="https://s.yimg.com/it/api/res/1.2/Ijw0PMUxffbZZx9o6YTX2g--~A/YXBwaWQ9eW5ld3M7Zmk9ZmlsbDtoPTQwMDtxPTgwO3c9NDAw/https://media.zenfs.com/creatr-images/GLB/2018-07-09/e9fb6ff0-8397-11e8-aa71-2bf9b45b3c91_crypto_sq.jpg.cf.webp" alt="" />
        </div>
        <div className="flex flex-col">
          <h1 className="mb-5 sm:text-sm" style={{fontSize:"2.5rem", color:"", lineHeight:"0.8"}}> Cryptocurrency & Bitcoin News </h1>
          <div > <p className="text-ellipsis overflow-hidden">Find the latest cryptocurrency news, updates, values, prices, and more related to Bitcoin, Ethereum, Dogecoin, DeFi and NFTs with Crypto World topic page.</p></div>
         
        </div>
      </div>
    {!simplified && (
         
      <Row gutter={[24, 24]} >
         <Col span={24}>
         <select
          showSearch
          className="select-news"
          placeholder="Select a crypto"
          optionFilterProp="children"
          onChange={(value) => setNewsCategory(value)}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
         >
          
          <option value="Cryptocurrency"> Cryptocurrency </option>
            {data?.data?.coins.map((coin) => <option value={coin.name}>{coin.name}</option> )}
         
         </select>
         </Col>

      </Row>


   )}

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 auto-cols-fr p-4">

      
      {cryptoNews.value.map((news, i) => (
        <div class=" flex flex-col h-50 w-full " key={i}>
          <div class="  h-full leading-normal px-6" style={{backgroundColor:"#030222de ",borderRadius:"22px"}}>
            <div className="news_title flex p-4 " style={{ borderRadius:"22px"}}>
              <img
                style={{objectFit:"contain",  height:"fit-content", borderRadius:"22px"}}
                className=" mr-3 bg-center mb-4 "
                src={news?.image?.thumbnail?.contentUrl || demoImage}
                alt="news"
                srcset=""
              />
              <a href={news.url} target="_blank" rel="noreferrer">
                <div class="text-indigo-100 font-bold text-m mb-2  text-ellipsis">
                  {" "}
                  {news.name}
                </div>  </a>
            </div>
             <hr style={{opacity:"0.5"}} />
            <div class="mb-5 mt-3 h-50">
                       
              <div class="max-h-30">
                <p class="text-gray-100 text-ellipsis overflow-hidden text-sm">
                  {news.description > 50
                    ? `${news.description.substring(0, 50)}...`
                    : news.description}
                </p>
              </div>
            </div>
            <div class="flex items-center place-self-end mb-0" >
              <img
                class="w-10 h-10 rounded-full mr-4"
                src={
                  news.provider[0]?.image?.thumbnail?.contentUrl || demoImage
                }
                alt="source"
              />
              
              <div className="flex flex-col">
               <span><p class="text-gray-900 leading-none ">{news.category}</p></span>
                <span><p class="text-green-600">
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </p></span>
            </div>

            </div> 
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default News;
