import React from 'react'
import millify from 'millify';
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useGetCryptosQuery} from '../services/cryptoApi'
import { Card } from 'antd';
import './Top10Carousel.css';
import Carousel from 'react-grid-carousel'


function Top10Carousel({simplified}) {
   
  const count = simplified ? 10 : 100
   const  {data: coinsList, isFetching} = useGetCryptosQuery(count);
   const [coins, setCoins] = useState([])
   const [searchCrypto, setSearchCrypto] = useState('')

   useEffect(() => {
       
        const filteredCoins = coinsList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchCrypto.toLowerCase()));

    setCoins(filteredCoins);
 
   }, [coinsList, searchCrypto])
   
   console.log(coins)
if(isFetching) return 'Loading...'

   return (
      <>
           {!simplified && (

             <div className="search__coins">
              <input placeholder="Search coin" type="text" onChange={ (e) => setSearchCrypto(e.target.value)} style={{color: "black"}}/>
          </div>     
           )}
            
            
         <div className="flex mx-5  whitespace-nowrap sm:space-x-5 sm:p-10 overflow-x-scroll  scrollbar-thin scrollbar-arrow-violet 
         scrollbar-thumb-custom  scroll-smooth scrollbar-track-transparent touch-pan-y " style={{backgroundColor:"#1c0940"}}>
              
              {coins?.map((crypto) => (                
                <div className="last:pr-24"  key={crypto.uuid} >
                  <div className="item" >
                    <Link to={`/crypto/${crypto.uuid}`}>
                        <div className="  flex " title={`${crypto.rank}.`}
                         hoverable>
                           
                            <img className="carouselImg " src={crypto.iconUrl}/>

                           <div className="flex  ">
                              <h4 className="mr-2 truncate">{crypto.name}</h4>
                                   </div>
                         
                        <div className="flex"><p className=" font-light text-emerald-500  "> <h5 className="font-bold">${millify(crypto.price)}</h5> </p>
                        <p className="ml-5 font-light text-emerald-500"> {millify(crypto.change)}%</p>
                        </div>
                       
                        </div> 
                    </Link></div>
                </div>

              ))}

         </div>
      
      </>
    )
}

export default Top10Carousel;