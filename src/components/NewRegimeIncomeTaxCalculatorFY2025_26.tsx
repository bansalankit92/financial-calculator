'use client';

import React, { useState, useEffect } from 'react';

interface TaxSlabRate {
    min: number;
    max: number | null;
    rate: number;
}

const TAX_SLABS: TaxSlabRate[] = [
    { min: 0, max: 400000, rate: 0 },
    { min: 400000, max: 800000, rate: 5 },
    { min: 800000, max: 1200000, rate: 10 },
    { min: 1200000, max: 1600000, rate: 15 },
    { min: 1600000, max: 2000000, rate: 20 },
    { min: 2000000, max: 2400000, rate: 25 },
    { min: 2400000, max: null, rate: 30 },
];

const STANDARD_DEDUCTION = 75000;
const TAX_REBATE = 60000;
const REBATE_LIMIT = 1200000;

const NewRegimeIncomeTaxCalculatorFY2025_26 = () => {
    const [income, setIncome] = useState<number>(1000000);
    const [basicSalary, setBasicSalary] = useState<number>(0);
    const [npsPercentage, setNpsPercentage] = useState<number>(10);
    const [npsDeduction, setNpsDeduction] = useState<number>(0);
    const [taxableIncome, setTaxableIncome] = useState<number>(0);
    const [totalTax, setTotalTax] = useState<number>(0);
    const [monthlyTax, setMonthlyTax] = useState<number>(0);
    const [slabwiseTax, setSlabwiseTax] = useState<{ slab: string; tax: number }[]>([]);

    // Calculate basic salary and NPS deduction whenever income changes
    useEffect(() => {
        const calculatedBasicSalary = Math.round(income * 0.5); // 50% of CTC
        setBasicSalary(calculatedBasicSalary);
        
        const calculatedNpsDeduction = Math.round((calculatedBasicSalary * npsPercentage) / 100);
        setNpsDeduction(calculatedNpsDeduction);
    }, [income, npsPercentage]);

    const calculateTax = (amount: number) => {
        let remainingIncome = amount;
        let totalTaxAmount = 0;
        const slabwiseBreakdown: { slab: string; tax: number }[] = [];

        // Add education cess of 4%
        const EDUCATION_CESS = 4;

        for (let i = 0; i < TAX_SLABS.length; i++) {
            const slab = TAX_SLABS[i];
            const slabMin = slab.min;
            const slabMax = slab.max ?? Infinity;
            const rate = slab.rate;

            if (remainingIncome <= 0) break;

            let taxableInThisSlab = 0;
            if (remainingIncome > slabMin) {
                if (slabMax === null) {
                    // For the highest slab
                    taxableInThisSlab = remainingIncome - slabMin;
                } else {
                    taxableInThisSlab = Math.min(remainingIncome, slabMax) - slabMin;
                }
            }

            const taxInThisSlab = (taxableInThisSlab * rate) / 100;
            
            if (taxInThisSlab > 0) {
                slabwiseBreakdown.push({
                    slab: `${(slabMin / 100000).toFixed(1)}L - ${slab.max ? (slabMax / 100000).toFixed(1) + 'L' : 'Above'} (${rate}%)`,
                    tax: taxInThisSlab
                });
            }

            totalTaxAmount += taxInThisSlab;
        }

        // Apply tax rebate if applicable (before cess)
        if (amount <= REBATE_LIMIT) {
            totalTaxAmount = Math.max(0, totalTaxAmount - TAX_REBATE);
        }

        // Add education cess
        const cessAmount = (totalTaxAmount * EDUCATION_CESS) / 100;
        totalTaxAmount += cessAmount;

        // Add cess as a separate line item in the breakdown if there's any tax
        if (totalTaxAmount > 0) {
            slabwiseBreakdown.push({
                slab: `Education Cess (${EDUCATION_CESS}%)`,
                tax: cessAmount
            });
        }

        return { totalTax: totalTaxAmount, slabwiseBreakdown };
    };

    useEffect(() => {
        // Calculate taxable income after standard deduction and NPS
        const calculatedTaxableIncome = Math.max(0, income - STANDARD_DEDUCTION - npsDeduction);
        setTaxableIncome(calculatedTaxableIncome);

        // Calculate tax
        const { totalTax: calculatedTax, slabwiseBreakdown } = calculateTax(calculatedTaxableIncome);
        setTotalTax(calculatedTax);
        setMonthlyTax(calculatedTax / 12);
        setSlabwiseTax(slabwiseBreakdown);
    }, [income, npsDeduction]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">New Tax Regime Calculator (FY 2025-26)</h2>
            
            <div className="mb-8">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Gross Annual Income (₹)
                </label>
                <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    step="1000"
                />
                <div className="mt-2">
                    <input
                        type="range"
                        value={income}
                        onChange={(e) => setIncome(Number(e.target.value))}
                        min="0"
                        max="9000000"
                        step="10000"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>

            <div className="mb-8">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Employer NPS Contribution (% of Basic)
                </label>
                <input
                    type="range"
                    value={npsPercentage}
                    onChange={(e) => setNpsPercentage(Number(e.target.value))}
                    min="0"
                    max="10"
                    step="1"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="mt-1 text-sm text-gray-600">
                    {npsPercentage}% of Basic Salary
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Tax Calculation Summary</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Gross Income:</span>
                            <span>₹{income.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Basic Salary (50% of CTC):</span>
                            <span>₹{basicSalary.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Standard Deduction:</span>
                            <span>₹{STANDARD_DEDUCTION.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>NPS Deduction (80CCD-2):</span>
                            <span>₹{npsDeduction.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-medium">
                            <span>Taxable Income:</span>
                            <span>₹{taxableIncome.toLocaleString()}</span>
                        </div>
                        {taxableIncome <= REBATE_LIMIT && totalTax > 0 && (
                            <div className="flex justify-between text-red-600">
                                <span>Tax Rebate (u/s 87A):</span>
                                <span>-₹{TAX_REBATE.toLocaleString()}</span>
                            </div>
                        )}
                        <div className="flex justify-between font-semibold">
                            <span>Total Tax:</span>
                            {taxableIncome <= REBATE_LIMIT ? (
                                <div className="text-right">
                                    <span className="line-through text-gray-500 mr-2">₹{(totalTax + TAX_REBATE).toLocaleString()}</span>
                                    <span>₹{totalTax.toLocaleString()}</span>
                                </div>
                            ) : (
                                <span>₹{totalTax.toLocaleString()}</span>
                            )}
                        </div>
                        <div className="flex justify-between text-blue-600">
                            <span>Monthly Tax:</span>
                            <span>₹{monthlyTax.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Slab-wise Tax Breakdown</h3>
                    <div className="space-y-2">
                        {slabwiseTax.map((item, index) => (
                            <div key={index} className="flex justify-between">
                                <span>{item.slab}</span>
                                <span>₹{item.tax.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg text-sm">
                <h3 className="font-semibold mb-2">Important Notes:</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>Basic Salary is calculated as 50% of CTC</li>
                    <li>Standard Deduction of ₹75,000 is available for salaried individuals</li>
                    <li>Employer NPS contribution under Section 80CCD(2) is limited to 10% of Basic Salary</li>
                    <li>Tax rebate of ₹60,000 is available for income up to ₹12L (after standard deduction)</li>
                    <li>Education cess of 4% will be added to the calculated tax</li>
                    <li>Due date for filing return is 15th September 2026 (non-audit cases)</li>
                </ul>
            </div>
        </div>
    );
};

export default NewRegimeIncomeTaxCalculatorFY2025_26; 