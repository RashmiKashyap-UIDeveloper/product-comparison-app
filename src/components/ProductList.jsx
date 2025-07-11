import React, { useState, useMemo } from 'react'
import ProductCard from './ProductCard'

const ProductList = ({ products, compareList, handleCompare, mode, toggleTheme, theme }) => {
    // State for storing the search term
    const [searchTerm, setSearchTerm] = useState("")

    //filter products
    const filterProducts = useMemo(() => {
        return products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [searchTerm, products])

    return (
        <section className='py-4'>
            <div className='container-xl'>
                <div className='d-flex justify-content-center justify-content-sm-between align-items-center mb-4 flex-column flex-sm-row'>
                    <h1 className='text-center fw-bold fs-3 mt-4 mt-sm-0 me-sm-2 mb-0 order-2  order-sm-1'>Products List</h1>

                    <div className='d-flex justify-content-between order-1 order-sm-2'>
                        {/* Search box*/}
                        <div className="search-wrapper me-2">
                            <div className="search-box">
                                <i className="bi bi-search search-icon fs-6"></i>
                                <input
                                    type="text"
                                    className="form-control search-input fs-6 rounded-pill"
                                    placeholder="Search Products..."
                                    name='search'
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                />
                            </div>
                        </div>

                        {/* Theme toggle button*/}
                        <button
                            className={`btn btn-sm rounded-pill px-3 d-flex align-items-center ${theme === 'light' ? "btn-dark" : "btn-light"}`}
                            onClick={toggleTheme}
                        >
                            {theme === 'light' ? (
                                <>
                                    <i className="bi bi-moon-stars me-2"></i>Dark
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-sun me-2"></i>Light
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Product grid */}
                <div className='row'>
                    {
                        filterProducts.length > 0 ? (
                            filterProducts.map((product) => (
                                <div key={product.id} className='col-sm-6 col-md-4 col-xl-3 mb-4'>
                                    <ProductCard
                                        product={product}
                                        handleCompare={handleCompare}
                                        isSelected={compareList.some((item) => item.id === product.id)}
                                        mode={mode}
                                        theme={theme}
                                    />
                                </div>
                            ))
                        ) : (
                            // No result message
                            <div className="text-center text-muted mt-4">
                                <p className="fs-5">
                                    <i className="bi bi-search fs-6 me-1"></i> No products found matching your search.
                                </p>
                                <p className="small">Try checking the spelling or use different keywords.</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default ProductList
