import axios from 'axios';

const apiCall = ({url, data = {}, method}) =>
    new Promise(async (resolve, reject) => {
        console.log('apiCall');

        const t = localStorage.getItem("user-token");
        if (t !== null) data.token = t;

        const appendData = {};
        if (data !== undefined) appendData[method === 'get' ? 'params' : 'data'] = data;

        try {
            console.log('Request:', appendData);
            let res = await axios({
                method: method || 'post',
                url: "http://localhost:3300/api" + url,
                timeout: 100000,
                ...appendData
            });

            console.log('Result:', res);
            resolve(res);
        } catch (e) {
            console.error(e);
            reject(e)
        }
    });

export default apiCall;

