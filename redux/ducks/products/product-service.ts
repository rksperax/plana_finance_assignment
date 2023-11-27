import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});
const getRequest = async (endPoint: string) => {
  try {
    return await api.get(endPoint);
  } catch (error) {
    return error;
  }
};

const ProductService = {
  api,
  getRequest,
};

export default ProductService;
