import axios from 'axios';

function axiosfail(obj) {
    var that=obj;
    axios.interceptors.request.use(
        function (config) {
            console.log(config, 'ccc')
            return config
        },
        function (error) {
            // console.log( Promise.reject(error),'end');
            that.$router.push({ path: '/fail' })
        }
    );
    axios.interceptors.response.use(
        function (response) {
            console.log(response, 'sss');
            if (response.data.code != 200 &&response.data.code != 210){
                console.log('fdfdfdfdf')
                that.$router.push({ path:'/fail'})
            }else{
                return response
            }
           
        },
        function (error) {
            that.$router.push({ path: '/fail' })
            // console.log( Promise.reject(error),'reserr');
        }
    );
}
export default axiosfail