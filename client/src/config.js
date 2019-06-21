const configDev = {
  ENDPOINT_URL: 'http://localhost:5000',
};


const configProd = {
  ENDPOINT_URL: 'http://localhost:5000',
};

const __DEV__ = false;
export default __DEV__ ? configDev : configProd;
