import React from 'react'

const ProductCompareBar = ({ compareList, handleRemove, handleComparison, setCompareList, onBack }) => {
    return (
        // Sticky bar at the bottom of the page
        <div className='position-fixed bottom-0 p-2 p-sm-3 bg-body-tertiary shadow-lg w-100 start-0 border-top z-4'>
            <div className='container-xl'>
                <div className='row gx-1 gx-sm-3'>
                    {
                        compareList.map((product) => (
                            <div key={product.id} className='col-2 col-md-3'>
                                <div className='d-flex border rounded overflow-hidden position-relative p-2 min-h-100 align-items-center'>
                                    {/* Remove button (X icon) */}
                                    <span onClick={() => handleRemove(product.id)} className='position-absolute end-0 top-0 cursor-pointer'>
                                        <i className="bi bi-x fs-6 fs-sm-5 lh-sm"></i>
                                    </span>

                                    {/* Product thumbnail */}
                                    <div className='img-wrapper d-flex align-items-center justify-content-center rounded overflow-hidden mx-auto me-md-2 bg-body-secondary mw-sm-60px mh-sm-60px min-w-sm-60px min-h-sm-60px' style={{ minWidth: "30px" }}>
                                        <img src={product.image} alt={product.name} className='img-fluid object-fit-cover p-sm-1' />
                                    </div>

                                    {/* Product name and price */}
                                    <div className='p-sm-2 d-none d-md-block'>
                                        <h3 className='fs-6 mb-1 lh-sm'>{product.name}</h3>
                                        <span className='d-block fw-bolder'>{product.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                    {/* Actions */}
                    <div className='col-4 col-md-3 ms-auto d-flex justify-content-center flex-column ps-3 ps-lg-5'>
                        {/* Clear All button */}
                        <button className='btn btn-sm btn-outline-secondary rounded-pill fs-7 px-sm-3 mb-1 mb-sm-2 fw-bold py-1 py-sm-2'
                            onClick={() => {setCompareList([])}}>
                            <i className="bi bi-x-lg me-1"></i>
                            <span className='d-none d-sm-inline-block'> Clear All</span>
                        </button>

                        {/* Compare Products button */}
                        <button className='btn btn-sm btn-primary rounded-pill fs-7 px-sm-3 fw-bold py-1 py-sm-2' onClick={handleComparison}>
                            <i className="bi bi-arrow-left-right d-block d-sm-none"></i>
                            <span className='d-none d-sm-block'>Compare Products</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCompareBar
