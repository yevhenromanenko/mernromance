// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
//
// const ExchangeRate = () => {
//     const [usdBuyRate, setUsdBuyRate] = useState(null);
//
//     useEffect(() => {
//         const fetchExchangeRate = async () => {
//             const response = await axios.get('/api');
//             const data = response.data;
//             const usdBuy = data[1].buy;
//             setUsdBuyRate(usdBuy);
//         };
//
//         fetchExchangeRate();
//     }, []);
//
//     return (
//         <div>
//             {usdBuyRate && <p>USD buy - {usdBuyRate}</p>}
//         </div>
//     );
// };
//
// export default ExchangeRate;
import { useEffect, useState } from 'react';

function ExchangeRate() {
    const [usdBuy, setUsdBuy] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://cors-anywhere.herokuapp.com/https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11',
                    { headers: { 'X-Requested-With': 'XMLHttpRequest' } }
                );
                const data = await response.json();
                const usd = data.find((rate) => rate.ccy === 'USD');
                setUsdBuy(usd.buy);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <p>USD buy: {usdBuy}</p>
        </div>
    );
}

export default ExchangeRate;
