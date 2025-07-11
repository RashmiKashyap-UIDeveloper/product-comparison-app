import React from 'react'

// Component to display side-by-side comparison of selected products
const ProductComparison = ({ compareList, handleRemove }) => {

    // If no products are selected, don't render anything
    if (!compareList || compareList.length === 0) return null;

    // Extract feature keys from the first product
    const featureKeys = Object.keys(compareList[0].features)

    // Identify which features are different across products
    const getDifferences = () => {
        const differences = {}
        featureKeys.forEach((key) => {
            const values = compareList.map((product) => product.features[key])
            differences[key] = new Set(values).size > 1 
        })
        return differences
    }

    const differences = getDifferences() 

    return (
        <div className='bg-light px-4 py-4 py-sm-5 bg-body-tertiary'>
            <div className='container-xl'>
                {/* Heading */}
                <h1 className='text-center fw-bold fs-3 mb-4 mt-2'>Compare Products</h1>
                <div className='row'>

                    {/* Responsive table to compare features */}
                    <div className='table-responsive'>
                        <table className='table table-bordered text-center align-middle' style={{ minWidth: "500px" }}>
                            <thead>
                                <tr>
                                    {/* Header column: "Features" */}
                                    <th className='fw-bolder'>Features</th>

                                    {/*Header column: Selected products*/}
                                    {
                                        compareList.map((product) => (
                                            <th key={product.id} className='fw-bolder'>
                                                <div className='d-flex align-items-center justify-content-center rounded overflow-hidden mx-auto mb-2 bg-body-tertiary'
                                                    style={{ maxWidth: "100px", maxHeight: "100px", minWidth: "100px", minHeight: "100px" }}>
                                                    <img src={product.image} alt={product.name} className='img-fluid object-fit-cover p-2' />
                                                </div>

                                                <h3 className='fs-5'>{product.name}</h3>
                                                <span>{product.price}</span>
                                            </th>
                                        ))
                                    }
                                </tr>
                            </thead>

                            <tbody>
                                {/* Display each feature row-wise */}
                                {
                                    featureKeys.map((key) => (
                                        <tr key={key}>
                                            {/* Feature name */}
                                            <td className='text-capitalize fw-bold'>{key}</td>

                                            {/* Feature value per product*/}
                                            {
                                                compareList.map((product) => (
                                                    <td key={product.id} className={differences[key] ? 'bg-warning-subtle' : ''}>
                                                        {product.features[key]}
                                                    </td>
                                                ))
                                            }
                                        </tr>
                                    ))
                                }

                                {/* Remove button row */}
                                <tr>
                                    <td></td>
                                    {
                                        compareList.map((product) => (
                                            <td key={product.id}>
                                                <button
                                                    className="btn btn-sm btn-outline-secondary rounded-pill fs-7 fw-bold py-2 px-3 lh-sm my-1"
                                                    onClick={() => handleRemove(product.id)}
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        ))
                                    }
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductComparison
