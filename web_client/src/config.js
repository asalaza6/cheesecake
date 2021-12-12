const DEVELOPMENT = true;
const secure = DEVELOPMENT?false:true;
/*
development mode for images 
run 
python3 -m http.server 8000 on the server/src/images folder
*/
const configs = {
    api: {
	    url:(secure?"https":"http")+( DEVELOPMENT ? '://localhost' : ''),
        port: secure?8081:8080
    },
}
export default configs;
