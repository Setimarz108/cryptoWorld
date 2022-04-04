import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders =  {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '10b601e1d5msha7bb3f9b00f7316p1ccf76jsn9e7fed8f66bb'
  }

  const baseUrl = 'https://coinranking1.p.rapidapi.com';
  const createRequest = (url) => ({ url, headers:cryptoApiHeaders})

  export const cryptoApi = createApi({
           
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
             query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getExchanges: builder.query({
          query: () => createRequest(`/exchanges`)
     }),
        getCryptoDetails: builder.query({
          query: (coinId) => createRequest(`/coin/${coinId}`)
     }),
     getCryptoHistory: builder.query({
      query: ({coinId,  timeperiod}) => createRequest( `coin/${coinId}/history?timePeriod=${timeperiod}`)
 })
    })
  })

  export const { useGetCryptosQuery, useGetExchangesQuery,useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} = cryptoApi;