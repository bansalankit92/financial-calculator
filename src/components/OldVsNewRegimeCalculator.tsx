'use client';

import React, { useState, useEffect } from 'react';
import { ShareIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from '@/lib/utils';

// Constants for Old Regime
const OLD_REGIME_TAX_SLABS = [
    { min: 0, max: 250000, rate: 0 },
    { min: 250000, max: 500000, rate: 5 },
    { min: 500000, max: 1000000, rate: 20 },
    { min: 1000000, max: null, rate: 30 },
];

const OLD_STANDARD_DEDUCTION = 50000;
const OLD_MAX_80C_LIMIT = 150000;
const OLD_MAX_80D_LIMIT = 25000;
const OLD_MAX_80CCD_LIMIT = 50000;

// Constants for New Regime FY 2024-25
const NEW_REGIME_TAX_SLABS = [
    { min: 0, max: 300000, rate: 0 },
    { min: 300000, max: 600000, rate: 5 },
    { min: 600000, max: 900000, rate: 10 },
    { min: 900000, max: 1200000, rate: 15 },
    { min: 1200000, max: 1500000, rate: 20 },
    { min: 1500000, max: null, rate: 30 },
];

const NEW_STANDARD_DEDUCTION = 75000;
const NEW_TAX_REBATE = 25000;
const NEW_REBATE_LIMIT = 700000;

const OldVsNewRegimeCalculator = () => {
    const [income, setIncome] = useState<number>(1000000);
    const [basicSalary, setBasicSalary] = useState<number>(0);
    const [monthlyBasic, setMonthlyBasic] = useState<number>(0);
    const [showCopied, setShowCopied] = useState(false);

    // Old Regime Deductions
    const [section80C, setSection80C] = useState<number>(0);
    const [nps80CCD, setNps80CCD] = useState<number>(0);
    const [mediclaim80D, setMediclaim80D] = useState<number>(0);
    const [donations80G, setDonations80G] = useState<number>(0);
    const [homeLoanInterest80EEA, setHomeLoanInterest80EEA] = useState<number>(0);
    const [eduLoanInterest80E, setEduLoanInterest80E] = useState<number>(0);
    const [actualRent, setActualRent] = useState<number>(0);
    const [hraExemption, setHraExemption] = useState<number>(0);

    // Employer NPS
    const [monthlyEmployerNps, setMonthlyEmployerNps] = useState<number>(0);
    const [employerNpsYearly, setEmployerNpsYearly] = useState<number>(0);
    const [npsError, setNpsError] = useState<string>("");

    // Tax Calculations
    const [oldRegimeTax, setOldRegimeTax] = useState<number>(0);
    const [newRegimeTax, setNewRegimeTax] = useState<number>(0);
    const [oldRegimeTakeHome, setOldRegimeTakeHome] = useState<number>(0);
    const [newRegimeTakeHome, setNewRegimeTakeHome] = useState<number>(0);

    // Calculate basic salary whenever income changes
    useEffect(() => {
        const calculatedBasicSalary = Math.round(income * 0.5); // 50% of CTC
        const calculatedMonthlyBasic = Math.round(calculatedBasicSalary / 12);
        setBasicSalary(calculatedBasicSalary);
        setMonthlyBasic(calculatedMonthlyBasic);
    }, [income]);

    // Calculate HRA exemption
    useEffect(() => {
        const hraReceived = basicSalary * 0.4; // HRA is 40% of basic salary
        const rentExceedingBasic = Math.max(0, actualRent - (basicSalary * 0.1));
        
        const exemption = Math.min(
            hraReceived,
            basicSalary * 0.5, // Always use 50% of basic as per metro city rules
            rentExceedingBasic
        );
        
        setHraExemption(exemption);
    }, [actualRent, basicSalary]);

    const calculateTax = (amount: number, slabs: typeof OLD_REGIME_TAX_SLABS, rebate = 0, rebateLimit = 0) => {
        const remainingIncome = amount;
        let totalTaxAmount = 0;

        // Add education cess of 4%
        const EDUCATION_CESS = 4;

        for (let i = 0; i < slabs.length; i++) {
            const slab = slabs[i];
            const slabMin = slab.min;
            const slabMax = slab.max ?? Infinity;
            const rate = slab.rate;

            if (remainingIncome <= 0) break;

            let taxableInThisSlab = 0;
            if (remainingIncome > slabMin) {
                if (slabMax === null) {
                    taxableInThisSlab = remainingIncome - slabMin;
                } else {
                    taxableInThisSlab = Math.min(remainingIncome, slabMax) - slabMin;
                }
            }

            const taxInThisSlab = (taxableInThisSlab * rate) / 100;
            totalTaxAmount += taxInThisSlab;
        }

        // Apply tax rebate if applicable (before cess)
        if (rebateLimit > 0 && amount <= rebateLimit) {
            totalTaxAmount = Math.max(0, totalTaxAmount - rebate);
        }

        // Add education cess
        const cessAmount = (totalTaxAmount * EDUCATION_CESS) / 100;
        totalTaxAmount += cessAmount;

        return totalTaxAmount;
    };

    useEffect(() => {
        // Calculate Old Regime Tax
        const oldRegimeDeductions = OLD_STANDARD_DEDUCTION + 
            Math.min(section80C, OLD_MAX_80C_LIMIT) +
            Math.min(nps80CCD, OLD_MAX_80CCD_LIMIT) +
            Math.min(mediclaim80D, OLD_MAX_80D_LIMIT) +
            donations80G +
            homeLoanInterest80EEA +
            eduLoanInterest80E +
            employerNpsYearly +
            hraExemption;

        const oldRegimeTaxableIncome = Math.max(0, income - oldRegimeDeductions);
        const oldTax = calculateTax(oldRegimeTaxableIncome, OLD_REGIME_TAX_SLABS);
        setOldRegimeTax(oldTax);
        setOldRegimeTakeHome(income - oldTax);

        // Calculate New Regime Tax
        const newRegimeTaxableIncome = Math.max(0, income - NEW_STANDARD_DEDUCTION - employerNpsYearly);
        const newTax = calculateTax(newRegimeTaxableIncome, NEW_REGIME_TAX_SLABS, NEW_TAX_REBATE, NEW_REBATE_LIMIT);
        setNewRegimeTax(newTax);
        setNewRegimeTakeHome(income - newTax);
    }, [income, section80C, nps80CCD, mediclaim80D, donations80G, homeLoanInterest80EEA, eduLoanInterest80E, hraExemption, employerNpsYearly]);

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

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy URL:', err);
        }
    };

    const sliderClassName = "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md";
    const inputClassName = "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Old vs New Regime Calculator (FY 2024-25)</h2>
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

            {/* Income Input */}
            <div className="mb-8">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Gross Annual Income (CTC) (₹)
                </label>
                <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className={inputClassName}
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
                <div className="mt-2 text-sm text-gray-600">
                    Basic Salary (50% of CTC): {formatCurrency(basicSalary)} / year ({formatCurrency(monthlyBasic)} / month)
                </div>
            </div>

            {/* Old Regime Deductions */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Old Regime Deductions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Section 80C (Max: ₹1.5L)
                        </label>
                        <input
                            type="number"
                            value={section80C}
                            onChange={(e) => setSection80C(Math.min(Number(e.target.value), OLD_MAX_80C_LIMIT))}
                            className={inputClassName}
                            max={OLD_MAX_80C_LIMIT}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            NPS 80CCD(1B) (Max: ₹50,000)
                        </label>
                        <input
                            type="number"
                            value={nps80CCD}
                            onChange={(e) => setNps80CCD(Math.min(Number(e.target.value), OLD_MAX_80CCD_LIMIT))}
                            className={inputClassName}
                            max={OLD_MAX_80CCD_LIMIT}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Monthly Employer NPS 80CCD(2) (10% of basic)
                        </label>
                        <input
                            type="number"
                            value={monthlyEmployerNps}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                const maxMonthlyNps = Math.round(monthlyBasic * 0.1);
                                if (value > maxMonthlyNps) {
                                    setNpsError(`Maximum allowed is ₹${maxMonthlyNps.toLocaleString()} (10% of monthly basic)`);
                                    setMonthlyEmployerNps(maxMonthlyNps);
                                    setEmployerNpsYearly(maxMonthlyNps * 12);
                                } else {
                                    setNpsError("");
                                    setMonthlyEmployerNps(value);
                                    setEmployerNpsYearly(value * 12);
                                }
                            }}
                            className={`${inputClassName} ${npsError ? 'border-red-500' : ''}`}
                        />
                        {npsError && <p className="mt-1 text-sm text-red-600">{npsError}</p>}
                        <p className="mt-1 text-sm text-gray-500">Yearly: {formatCurrency(employerNpsYearly)}</p>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Mediclaim 80D (Max: ₹25,000)
                        </label>
                        <input
                            type="number"
                            value={mediclaim80D}
                            onChange={(e) => setMediclaim80D(Math.min(Number(e.target.value), OLD_MAX_80D_LIMIT))}
                            className={inputClassName}
                            max={OLD_MAX_80D_LIMIT}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Donations 80G (50-100% deduction)
                        </label>
                        <input
                            type="number"
                            value={donations80G}
                            onChange={(e) => setDonations80G(Number(e.target.value))}
                            className={inputClassName}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Home Loan Interest 80EEA (Max: ₹2L)
                        </label>
                        <input
                            type="number"
                            value={homeLoanInterest80EEA}
                            onChange={(e) => setHomeLoanInterest80EEA(Math.min(Number(e.target.value), 200000))}
                            className={inputClassName}
                            max={200000}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Education Loan Interest 80E (No limit)
                        </label>
                        <input
                            type="number"
                            value={eduLoanInterest80E}
                            onChange={(e) => setEduLoanInterest80E(Number(e.target.value))}
                            className={inputClassName}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Annual Rent Paid
                        </label>
                        <input
                            type="number"
                            value={actualRent}
                            onChange={(e) => setActualRent(Number(e.target.value))}
                            className={inputClassName}
                        />
                        <p className="mt-1 text-sm text-gray-500">HRA is automatically calculated as 40% of basic salary</p>
                    </div>
                </div>
            </div>

            {/* Recommendation */}
            <div className="mb-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Recommendation</h3>
                <div className="space-y-2">
                    <p className="text-gray-700">
                        Based on your inputs:
                    </p>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                        <span className="font-medium">
                            {oldRegimeTakeHome >= newRegimeTakeHome ? 'Old Regime' : 'New Regime'} is better for you
                        </span>
                        <span className="text-green-600 font-semibold">
                            Save {formatCurrency(Math.abs(oldRegimeTakeHome - newRegimeTakeHome))} yearly
                        </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                        {oldRegimeTakeHome >= newRegimeTakeHome
                            ? 'The Old Regime provides better tax savings with your current deductions.'
                            : 'The New Regime offers better take-home salary with simplified tax calculation.'}
                    </p>
                </div>
            </div>

            {/* Comparison Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Old Regime</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span>Standard Deduction:</span>
                            <span>{formatCurrency(OLD_STANDARD_DEDUCTION)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Section 80C:</span>
                            <span>{formatCurrency(Math.min(section80C, OLD_MAX_80C_LIMIT))}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>NPS 80CCD(1B):</span>
                            <span>{formatCurrency(Math.min(nps80CCD, OLD_MAX_80CCD_LIMIT))}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Employer NPS 80CCD(2):</span>
                            <span>{formatCurrency(employerNpsYearly)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Mediclaim 80D:</span>
                            <span>{formatCurrency(Math.min(mediclaim80D, OLD_MAX_80D_LIMIT))}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Donations 80G:</span>
                            <span>{formatCurrency(donations80G)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Home Loan Interest 80EEA:</span>
                            <span>{formatCurrency(homeLoanInterest80EEA)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Education Loan Interest 80E:</span>
                            <span>{formatCurrency(eduLoanInterest80E)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>HRA Exemption:</span>
                            <span>{formatCurrency(hraExemption)}</span>
                        </div>
                        <div className="pt-3 border-t">
                            <div className="flex justify-between font-semibold">
                                <span>Total Tax:</span>
                                <span className="text-red-600">{formatCurrency(oldRegimeTax)}</span>
                            </div>
                            <div className="flex justify-between font-semibold mt-2">
                                <span>Take Home (Monthly):</span>
                                <span className="text-green-600">{formatCurrency(oldRegimeTakeHome / 12)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">New Regime</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span>Standard Deduction:</span>
                            <span>{formatCurrency(NEW_STANDARD_DEDUCTION)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Employer NPS 80CCD(2):</span>
                            <span>{formatCurrency(employerNpsYearly)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Other Deductions:</span>
                            <span>Not Applicable</span>
                        </div>
                        {income <= NEW_REBATE_LIMIT && (
                            <div className="flex justify-between text-red-600">
                                <span>Tax Rebate (u/s 87A):</span>
                                <span>Up to {formatCurrency(NEW_TAX_REBATE)}</span>
                            </div>
                        )}
                        <div className="pt-3 border-t">
                            <div className="flex justify-between font-semibold">
                                <span>Total Tax:</span>
                                <span className="text-red-600">{formatCurrency(newRegimeTax)}</span>
                            </div>
                            <div className="flex justify-between font-semibold mt-2">
                                <span>Take Home (Monthly):</span>
                                <span className="text-green-600">{formatCurrency(newRegimeTakeHome / 12)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Documentation Section */}
            <div className="mt-8 p-6">
                <h2 className="text-2xl font-bold mb-6">Understanding Tax Regime Selection</h2>
                
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">When to Choose Old Regime?</h3>
                    <div className="prose max-w-none">
                        <p className="text-gray-700 mb-4">
                            The old tax regime is generally beneficial only when you have significant deductions and exemptions. 
                            Key factors that make old regime more advantageous:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                            <li>High rent payments in metro cities (for HRA benefit)</li>
                            <li>Maximum utilization of Section 80C (₹1.5L through EPF, ELSS, etc.)</li>
                            <li>Substantial donations under Section 80G</li>
                            <li>Home loan interest deductions</li>
                            <li>High medical insurance premiums</li>
                            <li>NPS contributions (both personal and employer)</li>
                        </ul>
                        <p className="text-gray-700">
                            Without significant deductions, the new tax regime often results in lower tax liability due to reduced tax rates and higher basic exemption limit.
                        </p>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">Regime Comparison by Income Level</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Annual CTC</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Recommended Regime</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Min. Deductions for Old Regime*</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Key Considerations</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-4 py-3 text-sm">₹7L</td>
                                    <td className="px-4 py-3 text-sm font-medium text-green-600">New Regime</td>
                                    <td className="px-4 py-3 text-sm">Not Applicable</td>
                                    <td className="px-4 py-3 text-sm">Tax-free under new regime (with rebate)</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-sm">₹10L</td>
                                    <td className="px-4 py-3 text-sm font-medium text-green-600">New Regime</td>
                                    <td className="px-4 py-3 text-sm">₹3.2L+</td>
                                    <td className="px-4 py-3 text-sm">Old regime beneficial only with high HRA + 80C + 80D</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-sm">₹15L</td>
                                    <td className="px-4 py-3 text-sm font-medium text-green-600">New Regime</td>
                                    <td className="px-4 py-3 text-sm">₹4L+</td>
                                    <td className="px-4 py-3 text-sm">Need maximum 80C + high rent + additional deductions</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-sm">₹20L</td>
                                    <td className="px-4 py-3 text-sm">Depends</td>
                                    <td className="px-4 py-3 text-sm">₹5L+</td>
                                    <td className="px-4 py-3 text-sm">Old regime if using home loan + max deductions</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-sm">₹25L</td>
                                    <td className="px-4 py-3 text-sm">Depends</td>
                                    <td className="px-4 py-3 text-sm">₹6L+</td>
                                    <td className="px-4 py-3 text-sm">Consider employer NPS + all available deductions</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-sm">₹30L</td>
                                    <td className="px-4 py-3 text-sm font-medium text-blue-600">Old Regime</td>
                                    <td className="px-4 py-3 text-sm">₹7L+</td>
                                    <td className="px-4 py-3 text-sm">Old regime better with standard deductions</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-sm">₹50L</td>
                                    <td className="px-4 py-3 text-sm font-medium text-blue-600">Old Regime</td>
                                    <td className="px-4 py-3 text-sm">₹10L+</td>
                                    <td className="px-4 py-3 text-sm">Maximize all deductions + NPS</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-sm">₹75L</td>
                                    <td className="px-4 py-3 text-sm font-medium text-blue-600">Old Regime</td>
                                    <td className="px-4 py-3 text-sm">₹15L+</td>
                                    <td className="px-4 py-3 text-sm">Use all available deductions + investments</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-sm">₹95L</td>
                                    <td className="px-4 py-3 text-sm font-medium text-blue-600">Old Regime</td>
                                    <td className="px-4 py-3 text-sm">₹18L+</td>
                                    <td className="px-4 py-3 text-sm">Maximize all deductions + tax-saving investments</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                        * Minimum deductions required for old regime to be more beneficial than new regime. This includes standard deduction, 
                        Section 80C, HRA, NPS, and other available deductions combined.
                    </p>
                </div>

                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>For income up to ₹7L, new regime is always better due to tax rebate</li>
                        <li>Middle income (₹7L-₹25L): New regime generally better unless you have very high deductions</li>
                        <li>High income ({'>'}₹30L): Old regime becomes more beneficial with proper tax planning</li>
                        <li>Consider switching to new regime if you don&apos;t have enough deductions</li>
                        <li>Factor in future salary increases when choosing a regime</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default OldVsNewRegimeCalculator; 