import axios from 'axios'

export const getList = (platform) => {
	axios.get('http://127.0.0.1:12345/api/web/version/'+platform)
		.then(function(res){
			console.log(res)
			return res;
		}).catch(function(err){
			console.log(err)
		})
}
