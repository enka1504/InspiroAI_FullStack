import React from 'react'
import { PricingTable} from '@clerk/clerk-react'
import { useClerk, useUser } from '@clerk/clerk-react'


const pricing = () => {

  

  return (
    <section className="py-16 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-6 text-emerald-500">Pricing Plans</h2>
        <p className="text-gray-300 mb-12">
          Choose a plan that fits your needs. Upgrade anytime as your needs.
        </p>

        <PricingTable
          appearance={
            {
              variables: {
                colorPrimary: "#16a34a",
                colorBackground: "#0f172a",
                colorText: "#fff",
                borderRadius: "8px",
                fontSize: "14px"
              },
              elements: {
                planButton: "bg-green-800 hover:bg-green-900 text-white",
              }
            }
          }
        />
      </div>
    </section>
  )
}

export default pricing