import setting from "./setting"

export default(()=>{
    return{
        Food_list_url :setting.api.url+'/about/food/' ,
        Food_search :setting.api.url ,
    }
})()