'use client';

import React, { useState, useEffect } from 'react';
import { ShareIcon } from '@heroicons/react/24/outline';

interface TaxSlabRate {
    min: number;
    max: number | null;
    rate: number;
}

const TAX_SLABS: TaxSlabRate[] = [
    { min: 0, max: 300000, rate: 0 },
    { min: 300000, max: 700000, rate: 5 },
    { min: 700000, max: 1000000, rate: 10 },
    { min: 1000000, max: 1200000, rate: 15 },
    { min: 1200000, max: 1500000, rate: 20 },
    { min: 1500000, max: null, rate: 30 },
];

const STANDARD_DEDUCTION = 75000;
const TAX_REBATE = 25000;
const REBATE_LIMIT = 700000;

const NewRegimeIncomeTaxCalculatorFY2024_25 = () => {
    const [income, setIncome] = useState<number>(1000000);
    const [basicSalary, setBasicSalary] = useState<number>(0);
    const [monthlyBasic, setMonthlyBasic] = useState<number>(0);
    const [monthlyNpsAmount, setMonthlyNpsAmount] = useState<number>(0);
    const [npsDeduction, setNpsDeduction] = useState<number>(0);
    const [npsError, setNpsError] = useState<string>("");
    const [taxableIncome, setTaxableIncome] = useState<number>(0);
    const [totalTax, setTotalTax] = useState<number>(0);
    const [monthlyTax, setMonthlyTax] = useState<number>(0);
    const [slabwiseTax, setSlabwiseTax] = useState<{ slab: string; tax: number }[]>([]);
    const [showCopied, setShowCopied] = useState(false);

    // Calculate basic salary whenever income changes
    useEffect(() => {
        const calculatedBasicSalary = Math.round(income * 0.5); // 50% of CTC
        const calculatedMonthlyBasic = Math.round(calculatedBasicSalary / 12);
        setBasicSalary(calculatedBasicSalary);
        setMonthlyBasic(calculatedMonthlyBasic);
        
        // Validate existing NPS amount against new basic salary
        validateAndSetNpsAmount(monthlyNpsAmount, calculatedMonthlyBasic);
    }, [income]);

    const validateAndSetNpsAmount = (amount: number, monthlyBasicSalary: number = monthlyBasic) => {
        const maxMonthlyNps = Math.round(monthlyBasicSalary * 0.1); // 10% of monthly basic
        
        if (amount > maxMonthlyNps) {
            setNpsError(`Maximum allowed is ₹${maxMonthlyNps.toLocaleString()} (10% of monthly basic)`);
            setMonthlyNpsAmount(maxMonthlyNps);
            setNpsDeduction(maxMonthlyNps * 12);
        } else {
            setNpsError("");
            setMonthlyNpsAmount(amount);
            setNpsDeduction(amount * 12);
        }
    };

    const handleNpsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value < 0) {
            setMonthlyNpsAmount(0);
            setNpsDeduction(0);
            setNpsError("");
            return;
        }
        validateAndSetNpsAmount(value);
    };

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

    // Calculate percentage for slider background
    const calculatePercentage = (value: number, max: number) => {
        return (value / max) * 100;
    };

    // Get color based on percentage
    const getSliderColor = (value: number, max: number) => {
        const percentage = (value / max) * 100;
        if (percentage >= 70) return 'rgb(34, 197, 94)'; // green-500
        if (percentage >= 40) return 'rgb(59, 130, 246)'; // blue-500
        return 'rgb(99, 102, 241)'; // indigo-500
    };

    const getSliderStyle = (value: number, max: number) => ({
        background: `linear-gradient(to right, 
            ${getSliderColor(value, max)} 0%, 
            ${getSliderColor(value, max)} ${calculatePercentage(value, max)}%, 
            #e5e7eb ${calculatePercentage(value, max)}%, 
            #e5e7eb 100%)`
    });

    const sliderClassName = "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md";

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy URL:', err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">New Tax Regime Calculator (FY 2024-25)</h2>
                <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors relative"
                >
                    <ShareIcon className="h-5 w-5" />
                    <span>Share</span>
                    {showCopied && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm py-1 px-2 rounded">
                            Copied!
                        </div>
                    )}
                </button>
            </div>
            
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
                        className={sliderClassName}
                        style={getSliderStyle(income, 9000000)}
                    />
                </div>
            </div>

            <div className="mb-8">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Monthly Employer NPS Contribution (₹)
                </label>
                <div className="relative">
                    <input
                        type="number"
                        value={monthlyNpsAmount}
                        onChange={handleNpsChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            npsError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                        }`}
                        min="0"
                        step="100"
                        placeholder={`Max: ₹${Math.round(monthlyBasic * 0.1).toLocaleString()}`}
                    />
                    {npsError && (
                        <p className="mt-1 text-sm text-red-600">
                            {npsError}
                        </p>
                    )}
                    <p className="mt-1 text-sm text-gray-600">
                        Yearly NPS Contribution: ₹{npsDeduction.toLocaleString()}
                    </p>
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
                            <div className="text-right">
                                <div>₹{basicSalary.toLocaleString()} / year</div>
                                <div className="text-sm text-gray-600">₹{monthlyBasic.toLocaleString()} / month</div>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <span>Standard Deduction:</span>
                            <span>₹{STANDARD_DEDUCTION.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-start">
                            <span className="max-w-[60%]">NPS Deduction (80CCD-2) - 10% of basic salary:</span>
                            <div className="text-right">
                                <div>₹{npsDeduction.toLocaleString()} / year</div>
                                <div className="text-sm text-gray-600">₹{monthlyNpsAmount.toLocaleString()} / month</div>
                            </div>
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

            <div className="bg-blue-50 p-4 rounded-lg text-sm mb-8">
                <h3 className="font-semibold mb-2">Important Notes:</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>Basic Salary is calculated as 50% of CTC</li>
                    <li>Standard Deduction of ₹75,000 is available for salaried individuals</li>
                    <li>Monthly Employer NPS contribution under Section 80CCD(2) is limited to 10% of monthly basic salary</li>
                    <li>Tax rebate of ₹25,000 is available for income up to ₹7L (after standard deduction)</li>
                    <li>Education cess of 4% will be added to the calculated tax</li>
                    <li>Due date for filing return is 15th September 2025 (non-audit cases)</li>
                </ul>
            </div>

            <div className="space-y-6 bg-white ">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">About New Tax Regime Calculator</h2>
                    <p className="text-gray-700 mb-4">
                        The New Tax Regime Calculator for FY 2024-25 helps you estimate your income tax liability under the new tax regime. 
                        It takes into account your gross income, standard deduction, and employer NPS contributions to calculate your tax liability.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-3">Tax Slabs for FY 2024-25</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-4 py-2 border-b text-left">Income Range</th>
                                    <th className="px-4 py-2 border-b text-left">Tax Rate</th>
                                    <th className="px-4 py-2 border-b text-left">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 border-b">Up to ₹3,00,000</td>
                                    <td className="px-4 py-2 border-b">Nil</td>
                                    <td className="px-4 py-2 border-b">Tax exempt income</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border-b">₹3,00,001 to ₹6,00,000</td>
                                    <td className="px-4 py-2 border-b">5%</td>
                                    <td className="px-4 py-2 border-b">₹15,000 max in this slab</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border-b">₹6,00,001 to ₹9,00,000</td>
                                    <td className="px-4 py-2 border-b">10%</td>
                                    <td className="px-4 py-2 border-b">₹30,000 max in this slab</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border-b">₹9,00,001 to ₹12,00,000</td>
                                    <td className="px-4 py-2 border-b">15%</td>
                                    <td className="px-4 py-2 border-b">₹45,000 max in this slab</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border-b">₹12,00,001 to ₹15,00,000</td>
                                    <td className="px-4 py-2 border-b">20%</td>
                                    <td className="px-4 py-2 border-b">₹60,000 max in this slab</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Above ₹15,00,000</td>
                                    <td className="px-4 py-2">30%</td>
                                    <td className="px-4 py-2">No upper limit</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-3">How it Works</h3>
                    <p className="text-gray-700 mb-4">
                        The calculator uses the following parameters to compute your tax liability:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>Gross Annual Income: Your total income for the financial year</li>
                        <li>Standard Deduction: Fixed deduction of ₹75,000 for salaried individuals</li>
                        <li>NPS Deduction: Employer contribution to NPS under Section 80CCD(2)</li>
                        <li>Tax Rebate: Available for taxable income up to ₹7,00,000</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>Automatic calculation of Basic Salary (50% of CTC)</li>
                        <li>Monthly and annual tax breakup</li>
                        <li>Slab-wise tax calculation</li>
                        <li>Education cess computation</li>
                        <li>Tax rebate consideration</li>
                        <li>NPS contribution validation</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-3">Important Considerations</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                        <li>This calculator is for salaried individuals under the new tax regime</li>
                        <li>All calculations include education cess of 4%</li>
                        <li>Tax rebate is automatically applied for eligible income</li>
                        <li>NPS contribution is capped at 10% of basic salary</li>
                        <li>Standard deduction is automatically considered</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NewRegimeIncomeTaxCalculatorFY2024_25; 