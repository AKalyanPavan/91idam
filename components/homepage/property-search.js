'use client'

import { useState } from 'react'
import { Search, ChevronDown } from 'lucide-react'

export default function PropertySearch() {
  const [selectedPropertyType, setSelectedPropertyType] = useState('Residential')
  const [selectedPlotType, setSelectedPlotType] = useState('Residential Plots/Land')
  const [selectedBudget, setSelectedBudget] = useState('Budget')
  const [selectedArea, setSelectedArea] = useState('Area')
  const [selectedPostedBy, setSelectedPostedBy] = useState('Posted By')
  const [searchLocation, setSearchLocation] = useState('')
  
  const [isPropertyTypeOpen, setIsPropertyTypeOpen] = useState(false)
  const [isBudgetOpen, setIsBudgetOpen] = useState(false)
  const [isAreaOpen, setIsAreaOpen] = useState(false)
  const [isPostedByOpen, setIsPostedByOpen] = useState(false)

  const propertyTypes = ['Residential', 'Commercial']
  const budgetOptions = ['Under 10L', '10L - 50L', '50L - 1Cr', '1Cr - 5Cr', 'Above 5Cr']
  const areaOptions = ['Under 1000 sq ft', '1000 - 2000 sq ft', '2000 - 5000 sq ft', 'Above 5000 sq ft']
  const postedByOptions = ['Owner', 'Dealer', 'Builder']

  const handleSearch = () => {
    const searchData = {
      propertyType: selectedPropertyType,
      plotType: selectedPlotType,
      location: searchLocation,
      budget: selectedBudget !== 'Budget' ? selectedBudget : null,
      area: selectedArea !== 'Area' ? selectedArea : null,
      postedBy: selectedPostedBy !== 'Posted By' ? selectedPostedBy : null
    }
    console.log('Search data:', searchData)
    // Implement search logic here
  }

  const closeAllDropdowns = () => {
    setIsPropertyTypeOpen(false)
    setIsBudgetOpen(false)
    setIsAreaOpen(false)
    setIsPostedByOpen(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg pb-6 space-y-6 lg:w-3xl mx-auto z-2 relative">
      {/* Top Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 shadow-lg p-3 rounded-md">
        {/* Property Type Dropdown */}
        <div className="relative sm:w-48 sm:border-r border-r-gray-300">
          <button
            onClick={() => {
              closeAllDropdowns()
              setIsPropertyTypeOpen(!isPropertyTypeOpen)
            }}
            className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-700 bg-white rounded-md hover:border-[#175973] focus:outline-none focus:border-transparent"
          >
            <span>{selectedPropertyType}</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${isPropertyTypeOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isPropertyTypeOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={closeAllDropdowns}
              ></div>
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-20">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedPropertyType(type)
                      setIsPropertyTypeOpen(false)
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-700"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Enter location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-md focus:outline-none focus:border-transparent"
          />
        </div>

        {/* Search Button */}
        <button 
          onClick={handleSearch}
          className="bg-[#175973] text-white py-3 px-8 rounded-md font-medium hover:bg-[#144a5e] transition-colors duration-200 whitespace-nowrap cursor-pointer"
        >
          Search
        </button>
      </div>

      {/* Plots/Land Section */}
      <div className="px-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#1E2022]">Plots/Land</h3>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="plotType"
                value="Residential Plots/Land"
                checked={selectedPlotType === 'Residential Plots/Land'}
                onChange={(e) => setSelectedPlotType(e.target.value)}
                className="w-4 h-4 text-[#175973] border-gray-300 focus:ring-[#175973]"
              />
              <span className="text-gray-700">Residential Plots/Land</span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="plotType"
                value="Commercial Plots/Land"
                checked={selectedPlotType === 'Commercial Plots/Land'}
                onChange={(e) => setSelectedPlotType(e.target.value)}
                className="w-4 h-4 text-[#175973] border-gray-300 focus:ring-[#175973]"
              />
              <span className="text-gray-700">Commercial Plots/Land</span>
            </label>
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {/* Budget Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns()
                setIsBudgetOpen(!isBudgetOpen)
              }}
              className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-700 bg-white border border-gray-300 rounded-md hover:border-[#175973] focus:outline-none focus:ring-2 focus:ring-[#175973] focus:border-transparent"
            >
              <span>{selectedBudget}</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isBudgetOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isBudgetOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={closeAllDropdowns}
                ></div>
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-20">
                  {budgetOptions.map((budget) => (
                    <button
                      key={budget}
                      onClick={() => {
                        setSelectedBudget(budget)
                        setIsBudgetOpen(false)
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-700"
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Area Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns()
                setIsAreaOpen(!isAreaOpen)
              }}
              className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-700 bg-white border border-gray-300 rounded-md hover:border-[#175973] focus:outline-none focus:ring-2 focus:ring-[#175973] focus:border-transparent"
            >
              <span>{selectedArea}</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isAreaOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isAreaOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={closeAllDropdowns}
                ></div>
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-20">
                  {areaOptions.map((area) => (
                    <button
                      key={area}
                      onClick={() => {
                        setSelectedArea(area)
                        setIsAreaOpen(false)
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-700"
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Posted By Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns()
                setIsPostedByOpen(!isPostedByOpen)
              }}
              className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-700 bg-white border border-gray-300 rounded-md hover:border-[#175973] focus:outline-none focus:ring-2 focus:ring-[#175973] focus:border-transparent"
            >
              <span>{selectedPostedBy}</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isPostedByOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isPostedByOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={closeAllDropdowns}
                ></div>
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-20">
                  {postedByOptions.map((poster) => (
                    <button
                      key={poster}
                      onClick={() => {
                        setSelectedPostedBy(poster)
                        setIsPostedByOpen(false)
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-700"
                    >
                      {poster}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}