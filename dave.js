const env = process.env;

// we can export other things too...
export const nodeEnv = env.NODE_ENV || 'development'
export const myName = 'Dave';


export const logstars = function logStars(message) {
    console.info('**********');
    console.info(message);
    console.info('**********');
}

// note that this is the default object to be exported.
export default {
    port: env.PORT || 8080
}