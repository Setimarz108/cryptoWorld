import React from 'react'
import './login.css'
import {auth, provider} from "../firebase"
import icon from "../images/login-img.jpg";

function Login() {

  const signIn = e => {
    e.preventDefault();
    auth.signInWithPopup(provider).catch((error) => alert(error.message)
    )}

  return (
    <>
    

    <div className='flex flex-col m-auto main_div'>
        <div class="w-full">
  <div class="max-w-5xl sm:mx-auto my-24 mx-4">
    <div id='bg_jumbotron'
      class="rounded-md rounded-br-[100px] sm:rounded-br-[100px] w-full shadow-md flex flex-wrap flex-col-reverse md:flex-row p-6 sm:p-8">
      <div class="w-full sm:w-2/3 text-center sm:text-left">
        <h1 class="text-3xl sm:text-5xl font-bold text-gray-100  mt-8 ">Explore the latest cryptocurrencies News and Prices.   </h1>
        <p class="text-gray-400 text-sm sm:text-base py-4 sm:pr-5">Find the latest cryptocurrency news, updates, values, prices, and more related to Bitcoin, Ethereum, Dogecoin, DeFi and NFTs with Crypto World topic page.</p>
          <button onClick={signIn}
          class=" btn px-6 py-3  text-gray-200 mt-4 mb-8 text-base font-medium rounded-md shadow-md hover:bg-pink-600 hover:text-gray-50">Get
          Started</button>
             </div>
      <div class="w-full md:w-1/3">
        <img style={{width:"70%",margin:"auto", borderRadius:22}}
          src={icon}
          alt="Illustration by Rosina Gavrilash from Ouch!"
          class="mx-auto mt-4 sm:mt-14 sm:w-full transition-transform hover:scale-110 duration-300"/>
      </div>
     
      
    </div>
    
  </div>
  
</div>

    </div>

</>
  )
}

export default Login