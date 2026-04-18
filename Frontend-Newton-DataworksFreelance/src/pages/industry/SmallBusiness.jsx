import { Link } from 'react-router-dom';
import { DollarSign, Box, Users } from 'lucide-react';

const SmallBusiness = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12 px-4 mobile-compact">
      <div className="max-w-6xl mx-auto">
        <Link to="/services" className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] mb-8">
          ← Back to Services
        </Link>
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--accent-primary)] mb-6">
            Small Business Analytics
          </div>
          <h1 className="text-xl lg:text-2xl font-bold text-highlight mb-4">
            Small Business Growth Analytics
          </h1>
          <p className="text-xl text-[var(--text-muted)] max-w-3xl mx-auto">
            Sales forecasting, customer insights, and inventory optimization for SMEs in Zimbabwe & Southern Africa
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Business Intelligence for SMEs
            </h2>
            <div className="space-y-6">
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Sales Forecasting</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Predict monthly sales using historical data, seasonality, and market trends specific to Zimbabwe economy.
                </p>
              </div>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Customer Insights</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Segment your customers by purchasing behavior, location (Harare, Bulawayo, etc.), and lifetime value.
                </p>
              </div>
            </div>
          </div>
          <div>
<img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Small Business Analytics Dashboard" className="w-full rounded-xl shadow-2xl" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">

          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-xl">
            <DollarSign className="w-10 h-10 text-[var(--accent-primary)] mb-4" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Cash Flow Prediction</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Forecast cash flow gaps and identify working capital needs for retail/wholesale businesses
            </p>
          </div>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-xl">
            <Box className="w-10 h-10 text-[var(--accent-primary)] mb-4" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Inventory Optimization</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Right-size inventory to reduce stockouts and carrying costs for FMCG distributors
            </p>
          </div>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-xl">
            <Users className="w-10 h-10 text-[var(--accent-primary)] mb-4" />
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Customer 360</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Complete customer profiles from POS data, loyalty programs, and social media
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] text-center mb-8">
            Small Business Solutions Gallery
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group">
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Retail Analytics Dashboard" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">Retail Analytics</p>
            </div>
            <div className="group">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Customer Insights Analytics" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">Customer Insights</p>
            </div>
            <div className="group">
              <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Inventory Management System" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">Inventory Management</p>
            </div>
            <div className="group">
              <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Sales Forecasting Charts" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">Sales Forecasting</p>
            </div>
            <div className="group">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Cash Flow Analysis" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">Cash Flow Analysis</p>
            </div>
            <div className="group">
              <img src="https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Business Intelligence Reports" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">Business Intelligence</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link to="/jobs" className="btn btn-primary inline-flex items-center gap-2 font-semibold">
            View Small Business Jobs
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallBusiness;

