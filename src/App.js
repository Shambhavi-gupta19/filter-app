import { useEffect, useState } from 'react';

import getData from './Api'

import logo from './logo.svg';
import './App.css';

function App() {

  const [ productDetails, setProductDetails ] = useState([])
  const [ filter, setFilter ] = useState({ category: [], brand: [], gender: [] })
  const [ filteredData, setFilteredData ] = useState([])
  const [ count, setCount ] = useState(0)
  const [ loader, setLoader ] = useState(false)
  const [ failed, setFailed ] = useState(false)

  const getProductDetails = () => {
    setLoader(true)
    getData().then((res) => {
      if (res.status === 200) {
        setProductDetails(res.data.products)
        setCount(res.data.totalCount)
        setLoader(false)
        setFailed(false)
      }
      else {
        setLoader(false)
        setFailed(true)
      }
    }).catch((err) => {
      setLoader(false)
      setFailed(true)
    })
  }

  const getFilters = () => {
    let category = new Set()
    let gender = new Set()
    let brand = new Set()
    productDetails.forEach((item) => {
      category.add(item.category)
      gender.add(item.gender)
      brand.add(item.brand)
    })

    setFilter({ category: Array.from(category), gender: Array.from(gender), brand: Array.from(brand) })
  }

  useEffect(getProductDetails, [])
  useEffect(getFilters, [ productDetails ])

  const filterData = (filter, type) => {
    setFilteredData(productDetails.filter(item => item[ type ] === filter))
  }

  return (
    <div className="valign">
      <div>
        <h1>Category</h1>
        {filter.category && filter.category.map((item, index) => (
          <div key={`catergory${index}`} onClick={() => filterData(item, 'category')} >
            {item}
          </div>
        ))
        }
        <h1>Gender</h1>
        {filter.gender && filter.gender.map((item, index) => (
          <div key={`gender${index}`} onClick={() => filterData(item, 'gender')}>
            {item}
          </div>
        ))
        }
        <h1>Brand</h1>
        {filter.brand && filter.brand.map((item, index) => (
          <div key={`brand${index}`} onClick={() => filterData(item, 'brand')}>
            {item}
          </div>
        ))
        }
      </div>


      <div className="mainDetails">
        {
          filteredData.map((item, index) => {
            return (
              <div className="productBox" key={`${item.brand}${index}`}>
                <div><b>Product:</b> {item.product}</div>
                <div><b>Brand:</b> {item.brand}</div>
                <div><b>Gender:</b> {item.gender}</div>
                <div><b>Catergory:</b> {item.category}</div>
                <img alt={'searchImage'} width="200" height="200" src={item.searchImage} />
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
