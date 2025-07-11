import { useEffect, useRef, useState } from 'react'
import ProductList from './components/ProductList'
import products from './data/products'
import ProductComparison from './components/ProductComparison'
import ProductCompareBar from './components/ProductCompareBar'

function App() {
  // Initialize comparison list from localStorage
  const [compareList, setCompareList] = useState(() => {
    const savedList = localStorage.getItem('compareList')
    return savedList ? JSON.parse(savedList) : []
  })

  // State to control whether the comparison table is shown
  const [showComparison, setShowComparison] = useState(false)

  // Refs to scroll to product or comparison sections
  const compareSectionRef = useRef(null)
  const productSectionRef = useRef(null)

  // State to manage light/dark theme
  const [theme, setTheme] = useState('light')

  // Function to add/remove product from compare list
  const handleCompare = (product) => {
    const alreadySelected = compareList.find((item) => item.id === product.id)
    if (alreadySelected) {
      // Remove product if already selected
      setCompareList(compareList.filter((item) => item.id !== product.id))
    } else {
      // Add to compare if less than 3 items are selected
      if (compareList.length < 3)
        setCompareList([...compareList, product])
    }
  }

  // Remove selected product
  const handleRemove = (productId) => {
    setCompareList(compareList.filter((item) => item.id !== productId))
  }

  // Show the comparison section and scroll to it if 2+ products are selected
  const handleComparison = () => {
    if (compareList.length >= 2 && compareSectionRef.current) {
      setShowComparison(true)
      setTimeout(() => {
        compareSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 100)
    }
  }

  // Scroll back to product list
  const onBack = () => {
    setShowComparison(false);
    productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? "dark" : "light")
  }

  // Hide comparison section if fewer than 2 items remain
  useEffect(() => {
    if (compareList.length < 2 && showComparison) {
      setShowComparison(false);
    }
  }, [compareList, showComparison]);

  // Persist the comparison list in localStorage on every update
  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList))
  }, [compareList])

  // Apply Bootstrap theme to body tag
  useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme);
  }, [theme]);

  // On initial load, show comparison if already 2+ products saved
  useEffect(() => {
    if (compareList.length >= 2) {
      setShowComparison(true);
    }
  }, []);

  return (
    <div className={`${compareList.length >=2 ? "pb-6":""}`}>
      {/* Product List Section */}
      <div className={`${compareList.length >=2? "pb-4 pb-sm-5":""}`} ref={productSectionRef}>
        <ProductList
          products={products}
          compareList={compareList}
          handleCompare={handleCompare}
          mode={"list"}
          toggleTheme={toggleTheme}
          theme={theme}
        />
      </div>

      {/* Product Comparison Table */}
      <div className="comparison-section" ref={compareSectionRef}>
        {
          showComparison && <ProductComparison compareList={compareList} handleRemove={handleRemove} />
        }
      </div>

      {/* Sticky comparison bar at bottom of screen */}
      <div className='sticky-bar-container'>
        {
          compareList.length > 1 && (
            <ProductCompareBar
              compareList={compareList}
              handleRemove={handleRemove}
              handleComparison={handleComparison}
              setCompareList={setCompareList}
              onBack={onBack}
            />
          )
        }
      </div>

      {/* Scroll to top/back button (shown on larger screens) */}
      <button
        className="btn btn-dark rounded-circle mb-3 position-fixed end-0 bottom-0 m-2 z-1 d-none d-sm-flex align-items-center justify-content-center"
        onClick={onBack}
        style={{
          maxWidth: "35px", maxHeight: "35px",
          minWidth: "35px", minHeight: "35px"
        }}
      >
        <i className="bi bi-arrow-up"></i>
      </button>
    </div>
  )
}

export default App
