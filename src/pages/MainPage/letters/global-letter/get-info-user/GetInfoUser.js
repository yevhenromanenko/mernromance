import axios from "axios";

const GetInfoUser = async (id) => {
    try {
        const response = await axios.get(`https://login.romancecompass.com/man/${id}/`, {
            headers: {
                accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                'cache-control': 'max-age=0',
                'upgrade-insecure-requests': '1',
            },
            referrer: 'https://login.romancecompass.com/chat/',
            referrerPolicy: 'strict-origin-when-cross-origin',
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
        });

        const html = response.data;

        const nameMatch = html.match(/<span itemprop="title">PROFILE (.+?) USER ID: \d+<\/span>/);
        const name = nameMatch ? nameMatch[1] : '';
        console.log(name, 'name')

        const countryMatch = html.match(/<div class="param selected">Residence: <span>(.+?)<\/span><\/div>/);
        const country = countryMatch ? countryMatch[1] : '';
        console.log(country, 'country')

        const ageMatch = html.match(/<div class="age">(\d+)<\/div>/);
        const age = ageMatch ? parseInt(ageMatch[1]) : 0;
        console.log(age, 'age')

        const data = { name, country, age };
        return data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        return null;
    }
}

export default GetInfoUser;
