import axios from 'axios';

export const GET = async ({ url, params }) => {
    try {
        const response = await axios.get(url, { params });

        return response.data;
    } catch (error) {
        console.error(error.message);
        throw error.response.data;
    }
};

export const POST = async ({ url, data }) => {
    try {
        console.info('backendUrl', url);
        const response = await axios.post(url, data);

        return response.data;
    } catch (error) {
        console.error(error.message);
        throw error.response.data;
    }
};

export default { GET, POST };
