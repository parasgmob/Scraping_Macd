import setting from "../config/setting";
import axios from "axios";
import api from "../config/api";
//GET  list dynamically:
export const  getCategoryService = async() =>{
    return   await axios.get(api.Food_list_url,{
      headers : {
          'accept': 'application/json',
      }
  })
  }

  //search list service:
  export const  searchService = async(search:any,pageCount:number) =>{
    return   await axios.get(api.Food_search+`search?query=${search}&pageSize=10&pageNumber=${pageCount}&api_key=`+setting.api.Auth,{
      headers : {
          'accept': 'application/json',
      }
  })
  }
