import axios from 'axios';
import {SERVER_NAME} from "../../server_name";

    const FetchProfits = async (Ids) => {
            const today = new Date();
            const todayDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
            const currentMonth = `${today.getMonth() + 1}.${today.getFullYear()}`;
            let todaySum = 0;
            let monthSum = 0;

            // перебираем здесь и вытаскиваем id, потому что Ids содержит id и imageName
            const ladyId = Ids.map(lady => lady.id);

            const promises = ladyId.map(async (id) => {

                try {

                const [todayResponse, monthlyResponse] = await Promise.all([
                    axios.get(`https://romancecompass.com/partner/income/?filter%5Bservice%5D=&filter%5Bgirl_id%5D=${id}&filter%5Bdate_f%5D=${todayDate}&filter%5Bdate_t%5D=${todayDate}&submit=%D0%BF%D0%BE%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C`),
                    axios.get(`https://romancecompass.com/partner/income/?filter%5Bservice%5D=&filter%5Bgirl_id%5D=${id}&filter%5Bdate_f%5D=01.${currentMonth}&filter%5Bdate_t%5D=${todayDate}&submit=%D0%BF%D0%BE%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C`),
                ]);

                const todayHtml = todayResponse.data;
                const monthlyHtml = monthlyResponse.data;

                const todayMatch = todayHtml.match(/сумма:<\/td> <td align="right"><b>\$([\d\.]+)<\/b>/i);
                const monthlyMatch = monthlyHtml.match(/сумма:<\/td> <td align="right"><b>\$([\d\.]+)<\/b>/i);

                const today = todayMatch ? parseFloat(todayMatch[1]) : 0;
                const month = monthlyMatch ? parseFloat(monthlyMatch[1]) : 0;

                todaySum += today;
                monthSum += month;

                const data = {
                    id: id,
                    today: today,
                    month: month
                };

                await axios.post(`https://${SERVER_NAME}/profits`,
                    { ...data },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    return data;
                } catch (error) {
                    console.error(error);
                    return null;
                }
            });

            const results = await Promise.all(promises.filter(promise => promise))

            const newProfits = results.reduce((acc, result) => {
                if (result) {
                    acc[result.id] = { today: result.today, month: result.month };
                }
                return acc;
            }, {});

        return { profits: newProfits, todaySum: todaySum.toFixed(2), monthSum: monthSum.toFixed(2) };
}

export default FetchProfits;
