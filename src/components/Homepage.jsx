import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Top10Carousel from "./Top10Carousel";
import News from "../components/News";

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return "Loading...";

  console.log("data", data);
  return (

    <>

    <div className="news_banner flex justify-center mx-5 md:mt-20  lg:mt-10 mb-9 " style={{backgroundColor:"#df00ff45", padding:"10px", borderRadius:"22px"}}>
    <div >
      <img className="" style={{width: "80%", borderRadius: "50%"}}
      src="https://s.yimg.com/it/api/res/1.2/Ijw0PMUxffbZZx9o6YTX2g--~A/YXBwaWQ9eW5ld3M7Zmk9ZmlsbDtoPTQwMDtxPTgwO3c9NDAw/https://media.zenfs.com/creatr-images/GLB/2018-07-09/e9fb6ff0-8397-11e8-aa71-2bf9b45b3c91_crypto_sq.jpg.cf.webp" alt="" />
    </div>
    <div className="flex flex-col">
      <h1 className="mb-5 sm:text-sm" style={{fontSize:"2.5rem", color:"", lineHeight:"0.8"}}> Top 10 Cryptos & Global Stats </h1>
      <div > <p className="text-ellipsis overflow-hidden">Find the latest cryptocurrency news, updates, values, prices, and more related to Bitcoin, Ethereum, Dogecoin, DeFi and NFTs with Crypto World topic page.</p></div>
     
    </div>
  </div>
    <div className="homepage_main">
     
      <div className=" global_stats flex border rounded-lg border-slate-700 flex-wrap mx-5 justify-evenly text-base">
        <Col span={12}>
          {" "}
          <Statistic title="Total Cryptocurrencies " value={globalStats?.total} className="animate-pulse"/>
        </Col>
        <Col span={12}>
          {" "}
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats?.totalExchanges)}
            className="animate-pulse"/>
        </Col>
        <Col span={12}>
          {" "}
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats?.totalMarketCap)}
            className="animate-pulse"/>
        </Col>
        <Col span={12}>
          {" "}
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats?.total24hVolume)}
            className="animate-pulse"/>
        </Col>
        <Col span={12}>
          {" "}
          <Statistic
            title="Total Markets"
            value={millify(globalStats?.totalMarkets)}
            className="animate-pulse"/>
        </Col>
      </div>

      <div className="home-heading-container mx-5 mb-5">
        <Title level={2} className="home-title">
          Top 10 
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Top10Carousel simplified />
      <div className="home-heading-container mx-5 mb-5">
        <Title level={2} className="home-title">
          Latest News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>

      <News simplified />
    </div>
    </>
  );
};

export default Homepage;
