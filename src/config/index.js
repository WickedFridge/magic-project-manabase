import defaultConfig from './default';
import prodConfig from './production';

const config = defaultConfig;

if (process.env.NODE_ENV === 'production') {
    Object.entries(prodConfig).forEach(([key, value]) => {
        config[key] = value;
    });
}

export default config;
