import React from 'react'

const ProductCard = ({ product, handleCompare, handleRemove, isSelected, mode, theme }) => {
    return (
        <div className={`card ${theme === 'light' ? "border-light" : "border-body-tertiary"} shadow-sm overflow-hidden min-h-100 highlight rounded-3`}>

            {/* Product image*/}
            <div className='img-wrapper d-flex align-items-center justify-content-center bg-body-tertiary' style={{ maxHeight: "225px", minHeight: "225px" }}>
                <img src={product.image} alt={product.name} className='img-fluid rounded-top object-fit-cover p-4' />
            </div>

            {/* Product details*/}
            <div className='card-body'>
                <div className='d-flex justify-content-between align-items-start '>
                    <h5 className="card-title mb-0 fs-4 fw-bold">{product.name}</h5>
                </div>

                <span className="badge bg-body-tertiary text-muted text-uppercase fw-bold mt-1">{product.brand}</span>

                <ul className='mt-3 small text-muted ps-3 m-0'>
                    {
                        Object.entries(product.features).map(([key, value], index) => (
                            <li key={index}>{value}</li>
                        ))
                    }
                </ul>
            </div>

            <div className='card-footer d-flex justify-content-between align-items-center border-0 bg-transparent'>
                {/* Product price */}
                <span className="fw-bold fs-3 me-3">{product.price}</span>

                {/* Action */} 
                {
                    mode === "list" ? (
                        <button
                            className={`btn btn-sm rounded-pill fs-7 fw-bold py-2 px-3 lh-sm ${isSelected ? "btn-primary" : "btn-outline-secondary"}`}
                            onClick={() => handleCompare(product)}
                        >
                            {isSelected ? "Remove" : "Add to Compare"}
                        </button>
                    ) : (
                        <button
                            className="btn btn-sm btn-outline-secondary rounded-pill fs-7 fw-bold py-2 px-3 lh-sm"
                            onClick={() => handleRemove(product.id)}
                        >
                            Remove
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default ProductCard
