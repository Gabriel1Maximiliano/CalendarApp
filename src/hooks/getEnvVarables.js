export const getEnvVariables = () => {

    // import.meta.env;
 const { REACT_APP_VITE_API_URL }= process.env
 
    return {
        REACT_APP_VITE_API_URL
        // ...import.meta.env
        //VITE_MODE: import.meta.env.VITE_MODE,
       // VITE_API_URL: import.meta.env.REACT_APP_VITE_API_URL,
    }
}