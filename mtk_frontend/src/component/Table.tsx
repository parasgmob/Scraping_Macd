import React, { useEffect, useMemo, useState } from 'react'
// import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import Table  from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell , { tableCellClasses }from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { dividerClasses } from '@mui/material';
import api from '../config/api';
import { CircularProgress } from "@material-ui/core";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
let list_of_category: any = new Array()
let product_object: any = new Object()

// let list_of_categorys:any=[]
// list_of_categorys.push(list_of_category)
let dict_of_product: any = {}
const McDonaldsDetails = () => {
    const [selectItem, setSelectItem] = useState<any>("")
    const [itemList, setItemList] = useState<any>("")
    const [Category, setCategory] = useState<any>("")
    const [toggle,setToggle] = useState(true)
    const handleChange = (event: SelectChangeEvent) => {
        setSelectItem(event.target.value);

    };
    const get_catogary_realated_items = async (itemList: any) => {

        let temp_set = new Set()
        for (let obj in itemList) {
            let product_obj = itemList[parseInt(obj)]['food_details']
            let category = product_obj['category']
            let product_name = product_obj['product_name']
            let product_nutrition = product_obj['nutritions_details']
            let demo_value = product_obj['nutritions_details']
            let quentity = product_obj['quentity']
            

            temp_set.add(category)
            if (product_object.hasOwnProperty(category)) {
                
                if (quentity){
                    product_object[category].push({ 'product_name': product_name, 'product_nutrition': product_nutrition,'quantity':quentity})
                }
                else{
                    product_object[category].push({ 'product_name': product_name, 'product_nutrition': product_nutrition })
                }
            }
            else {
                if (quentity){
                    product_object[category]= [{ 'product_name': product_name, 'product_nutrition': product_nutrition,'quantity':quentity}]
                }
                else{
                product_object[category] = [{ 'product_name': product_name, 'product_nutrition': product_nutrition }]
                }
            }
        }
        list_of_category = Array.from(temp_set)
        console.log("productObject", product_object,)
        console.log("listofcategory", list_of_category)

    }
    const getItemList = () => {
        fetch(api.Food_list_url, {
            headers: {
                'accept': 'application/json',
                'X-CSRFToken': 'Uj6agxcfUly4q1l6mGGJ9XCFOnyCZ3jrvobwNaTQ53Bt21N5hQ7gjaS6Xs7pj78i',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setToggle(false)
                setItemList(data)
                get_catogary_realated_items(data)
            });
    }
    useEffect(() => {
        getItemList();
    }, [])

    { console.log("sdsdsdsddssddssdss", product_object[selectItem]) }
    // { console.log(itemList) }
    { console.log("Category", (list_of_category)) }
    // {console.log("categories",list_of_categorys)}
    let temp_list: any = Array.from(list_of_category)
    console.log('temp_list = ', temp_list)
    return (
        <div>
            {toggle===true?
            <>
            <CircularProgress/>
            <h3>Data is Loading....</h3>
            </>
            :<>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="demo-simple-select-helper-label">Select Category</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    // value={selectItem}
                    label="Select Category"
                    onChange={handleChange}
                >
                    {temp_list.map((name: string) => (
                        <MenuItem value={name}>{name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Product Name</StyledTableCell>
                                {/* <StyledTableCell>Quantity</StyledTableCell> */}
                                <StyledTableCell align="right">Calories</StyledTableCell>
                                <StyledTableCell align="right">Protein</StyledTableCell>
                                <StyledTableCell align="right">Total Carbs</StyledTableCell>
                                <StyledTableCell align="right">Total Fat</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {product_object?product_object[selectItem]?.map((row: any) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>
                                        {row.product_name}
                                    </TableCell>
                                    {/* <TableCell>{row.quantity?row.quantity:"_"}</TableCell> */}
                                    <TableCell align="right">{row.product_nutrition.Calories}</TableCell>
                                    <TableCell align="right">{row.product_nutrition.Protein}</TableCell>
                                    <TableCell align="right">{row.product_nutrition['Total Carbs']}</TableCell>
                                    <TableCell align="right">{row.product_nutrition["Total Fat"]}</TableCell>
                                </TableRow>
                            )):<div>Please Select Option</div>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            </>
            }
        </div>
        
                            
    )
}

export default McDonaldsDetails
