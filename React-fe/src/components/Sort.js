import React from 'react'
import { useFilterContext } from '../context/filter_context'
import { BsFillGridFill, BsList } from 'react-icons/bs'
import './sort.css'

const Sort = () => {
  
  const { filtered_products: products, 
    setGridView,
    setListView,
    updateSort,
    sort,
    grid_view } 
    = useFilterContext()

  return (
    <div className='section-sort'>
      <section className='btn-container'>
        <button onClick={setGridView}><BsFillGridFill/></button>
        <button onClick={setListView}><BsList/></button>
      </section>
      <p>{products.length} products found</p>
      <hr/>
      <section>
      <span>Sort by: </span>
      <form>
        <select value={sort} onChange={updateSort} className='rounded-[var(--radius);]'>
          <option value='price-lowest'>Price(Lowest)</option>
          <option value='price-highest'>Price(Highest)</option>
          <option value='name-asc'>Name(A-Z)</option>
          <option value='name-desc'>Name(Z-A)</option>
        </select>
      </form>
      </section>
    </div>
  )
}


export default Sort
