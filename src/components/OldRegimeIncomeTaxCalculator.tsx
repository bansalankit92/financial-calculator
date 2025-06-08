'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';
import TaxDistributionChart from './TaxDistributionChart';

// Constants
const TAX_SLABS = [
    { min: 0, max: 250000, rate: 0 },
    { min: 250000, max: 500000, rate: 5 },
    { min: 500000, max: 1000000, rate: 20 },
    { min: 1000000, max: null, rate: 30 },
];

const EDUCATION_CESS = 4;
const STANDARD_DEDUCTION = 50000;
const MAX_80C_LIMIT = 150000;
const MAX_80D_LIMIT = 25000;
const MAX_80CCD_LIMIT = 50000;

const OldRegimeIncomeTaxCalculator = () => {
    // State for all inputs
    const [ctc, setCtc] = useState(1000000);
    const [basicSalaryMonthly, setBasicSalaryMonthly] = useState(ctc * 0.5 / 12);
    const [basicSalaryYearly, setBasicSalaryYearly] = useState(ctc * 0.5);
    
    // Advanced deductions
    const [pf, setPf] = useState(0);
    const [epf, setEpf] = useState(0);
    const [gratuity, setGratuity] = useState(0);
    const [profTax, setProfTax] = useState(2400);
    const [conveyance, setConveyance] = useState(19200);
    const [hra, setHra] = useState(0);
    const [section80C, setSection80C] = useState(0);
    const [nps80CCD, setNps80CCD] = useState(0);
    const [mediclaim80D, setMediclaim80D] = useState(0);
    const [donations80G, setDonations80G] = useState(0);
    const [homeLoanInterest80EEA, setHomeLoanInterest80EEA] = useState(0);
    const [eduLoanInterest80E, setEduLoanInterest80E] = useState(0);

    // Calculated values
    const [totalDeductions, setTotalDeductions] = useState(0);
    const [taxableIncome, setTaxableIncome] = useState(0);
    const [taxBreakdown, setTaxBreakdown] = useState<{ slab: string; tax: number }[]>([]);
    const [totalTax, setTotalTax] = useState(0);

    // Slider styles
    const sliderClassName = "flex-1 h-2 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow-md";
    const inputClassName = "block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm";

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

    // Update basic salary when CTC changes
    useEffect(() => {
        const newBasicYearly = ctc * 0.5;
        setBasicSalaryYearly(newBasicYearly);
        setBasicSalaryMonthly(Math.round(newBasicYearly / 12));
        
        // Auto calculate EPF (12% of basic)
        const newEpf = Math.min(1800*12, Math.round(newBasicYearly * 0.12));
        setEpf(newEpf);
        setPf(newEpf); // PF matches EPF by default
        
        // Auto calculate Gratuity (5% of basic)
        setGratuity(Math.round(newBasicYearly * 0.05));
    }, [ctc]);

    // Calculate tax whenever inputs change
    useEffect(() => {
        // Calculate total deductions
        const totalDeductions = STANDARD_DEDUCTION + 
            Math.min(section80C + pf + epf, MAX_80C_LIMIT) +
            Math.min(nps80CCD, MAX_80CCD_LIMIT) +
            Math.min(mediclaim80D, MAX_80D_LIMIT) +
            donations80G +
            homeLoanInterest80EEA +
            eduLoanInterest80E +
            profTax +
            conveyance +
            hra;

        setTotalDeductions(totalDeductions);

        // Calculate taxable income
        const taxableAmount = Math.max(0, ctc - totalDeductions);
        setTaxableIncome(taxableAmount);

        // Calculate tax
        const { totalTax, slabwiseBreakdown } = calculateTax(taxableAmount);
        setTaxBreakdown(slabwiseBreakdown);
        setTotalTax(totalTax);
    }, [
        ctc,
        pf,
        epf,
        gratuity,
        profTax,
        conveyance,
        hra,
        section80C,
        nps80CCD,
        mediclaim80D,
        donations80G,
        homeLoanInterest80EEA,
        eduLoanInterest80E
    ]);

    const calculateTax = (amount: number) => {
        let remainingIncome = amount;
        let totalTaxAmount = 0;
        const slabwiseBreakdown: { slab: string; tax: number }[] = [];

        for (let i = 0; i < TAX_SLABS.length; i++) {
            const slab = TAX_SLABS[i];
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
            
            if (taxInThisSlab > 0) {
                slabwiseBreakdown.push({
                    slab: `${(slabMin / 100000).toFixed(1)}L - ${slab.max ? (slabMax / 100000).toFixed(1) + 'L' : 'Above'} (${rate}%)`,
                    tax: taxInThisSlab
                });
            }

            totalTaxAmount += taxInThisSlab;
        }

        // Add education cess
        const cessAmount = (totalTaxAmount * EDUCATION_CESS) / 100;
        totalTaxAmount += cessAmount;

        // Add cess as a separate line item in the breakdown
        if (totalTaxAmount > 0) {
            slabwiseBreakdown.push({
                slab: `Education Cess (${EDUCATION_CESS}%)`,
                tax: cessAmount
            });
        }

        return { totalTax: totalTaxAmount, slabwiseBreakdown };
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto p-4"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Panel - Inputs */}
                <div className="space-y-4">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Income Tax Calculator (Old Regime)</h2>
                        
                        {/* CTC Input */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Fixed CTC</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="number"
                                        value={ctc}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCtc(Number(e.target.value))}
                                        className={inputClassName}
                                        step={50000}
                                        min={200000}
                                        max={5000000}
                                    />
                                    <input
                                        type="range"
                                        min={200000}
                                        max={5000000}
                                        step={50000}
                                        value={ctc}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCtc(Number(e.target.value))}
                                        className={sliderClassName}
                                        style={getSliderStyle(ctc, 5000000)}
                                    />
                                </div>
                                <div className="mt-1 text-sm text-gray-500">
                                    {formatCurrency(ctc)}
                                </div>
                            </div>

                            {/* Basic Salary */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Basic</label>
                                    <input
                                        type="number"
                                        value={basicSalaryMonthly}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            const value = Number(e.target.value);
                                            setBasicSalaryMonthly(value);
                                            setBasicSalaryYearly(value * 12);
                                        }}
                                        className={inputClassName}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Yearly Basic</label>
                                    <div className="p-2 bg-gray-50 rounded-md">
                                        {formatCurrency(basicSalaryYearly)}
                                    </div>
                                </div>
                            </div>

                            {/* Advanced Options */}
                            <div className="space-y-4 border-t pt-4 mt-4">
                                <h3 className="text-lg font-semibold">Advanced Options</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">PF (yearly)</label>
                                        <input
                                            type="number"
                                            value={pf}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPf(Number(e.target.value))}
                                            className={inputClassName}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">EPF (yearly, Max: ₹1,800/month)</label>
                                        <input
                                            type="number"
                                            value={epf}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEpf(Math.min(Number(e.target.value), 1800 * 12))}
                                            className={inputClassName}
                                            max={1800 * 12}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Gratuity (Yearly) </label>
                                        <input
                                            type="number"
                                            value={gratuity}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setGratuity(Number(e.target.value))}
                                            className={inputClassName}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Professional Tax (Typical: ₹2,400/year)</label>
                                        <input
                                            type="number"
                                            value={profTax}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setProfTax(Number(e.target.value))}
                                            className={inputClassName}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Conveyance</label>
                                        <input
                                            type="number"
                                            value={conveyance}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setConveyance(Number(e.target.value))}
                                            className={inputClassName}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">HRA</label>
                                        <input
                                            type="number"
                                            value={hra}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setHra(Number(e.target.value))}
                                            className={inputClassName}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">ELSS/PPF/LIC/H.Loan 80C (Max: ₹1.5L)</label>
                                        <input
                                            type="number"
                                            value={section80C}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSection80C(Math.min(Number(e.target.value), MAX_80C_LIMIT))}
                                            className={inputClassName}
                                            max={MAX_80C_LIMIT}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">NPS 80CCD (Max: ₹50,000)</label>
                                        <input
                                            type="number"
                                            value={nps80CCD}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setNps80CCD(Math.min(Number(e.target.value), MAX_80CCD_LIMIT))}
                                            className={inputClassName}
                                            max={MAX_80CCD_LIMIT}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Mediclaim 80D (Max: ₹25,000)</label>
                                        <input
                                            type="number"
                                            value={mediclaim80D}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setMediclaim80D(Math.min(Number(e.target.value), MAX_80D_LIMIT))}
                                            className={inputClassName}
                                            max={MAX_80D_LIMIT}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Donations 80G (50-100% deduction)</label>
                                        <input
                                            type="number"
                                            value={donations80G}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setDonations80G(Number(e.target.value))}
                                            className={inputClassName}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">H. Loan Interest 80EEA (Max: ₹2L)</label>
                                        <input
                                            type="number"
                                            value={homeLoanInterest80EEA}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setHomeLoanInterest80EEA(Math.min(Number(e.target.value), 200000))}
                                            className={inputClassName}
                                            max={200000}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Edu. Loan Interest 80E (No limit)</label>
                                        <input
                                            type="number"
                                            value={eduLoanInterest80E}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEduLoanInterest80E(Number(e.target.value))}
                                            className={inputClassName}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Tax Calculation */}
                <div className="space-y-4">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Tax Distribution</h2>
                        <TaxDistributionChart
                            taxableIncome={taxableIncome}
                            totalTax={totalTax}
                            totalDeductions={totalDeductions}
                            ctc={ctc}
                        />
                        
                        <div className="mt-6 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total CTC:</span>
                                <span className="font-semibold">{formatCurrency(ctc)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total Deductions:</span>
                                <span className="font-semibold text-blue-600">{formatCurrency(totalDeductions)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total Tax:</span>
                                <span className="font-semibold text-red-600">{formatCurrency(totalTax)}</span>
                            </div>
                            <div className="pt-3 border-t">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Take Home (Yearly):</span>
                                    <span className="font-semibold text-gray-600">{formatCurrency(taxableIncome)}</span>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-gray-600">Take Home (Monthly):</span>
                                    <span className="font-semibold text-gray-600">{formatCurrency(Math.round(taxableIncome / 12))}</span>
                                </div>
                            </div>
                            <div className="pt-3 border-t">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">In-Hand Salary (Yearly):</span>
                                    <span className="font-semibold text-green-600">{formatCurrency(ctc - totalDeductions - totalTax)}</span>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-gray-600">In-Hand Salary (Monthly):</span>
                                    <span className="font-semibold text-green-600">{formatCurrency(Math.round((ctc - totalDeductions - totalTax) / 12))}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Tax Calculation</h3>
                        
                        {/* Tax Summary Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="text-left py-2 px-4">Income Tax Calculation</th>
                                        <th className="text-right py-2 px-4">Monthly</th>
                                        <th className="text-right py-2 px-4">Yearly</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Income Details */}
                                    <tr className="border-b">
                                        <td className="py-2 px-4">Total CTC</td>
                                        <td className="text-right py-2 px-4">{formatCurrency(ctc / 12)}</td>
                                        <td className="text-right py-2 px-4">{formatCurrency(ctc)}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 px-4">Basic</td>
                                        <td className="text-right py-2 px-4">{formatCurrency(basicSalaryMonthly)}</td>
                                        <td className="text-right py-2 px-4">{formatCurrency(basicSalaryYearly)}</td>
                                    </tr>

                                    {/* Deductions */}
                                    <tr className="border-b">
                                        <td className="py-2 px-4">Standard Deductions</td>
                                        <td className="text-right py-2 px-4">{formatCurrency(STANDARD_DEDUCTION / 12)}</td>
                                        <td className="text-right py-2 px-4">{formatCurrency(STANDARD_DEDUCTION)}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 px-4">EPF + PF</td>
                                        <td className="text-right py-2 px-4">{formatCurrency((epf + pf) / 12)}</td>
                                        <td className="text-right py-2 px-4">{formatCurrency(epf + pf)}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 px-4">ELSS/PPF/H.Loan 80C</td>
                                        <td className="text-right py-2 px-4">{formatCurrency(section80C / 12)}</td>
                                        <td className="text-right py-2 px-4">{formatCurrency(section80C)}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 px-4">Total Deductions</td>
                                        <td className="text-right py-2 px-4">{formatCurrency(totalDeductions / 12)}</td>
                                        <td className="text-right py-2 px-4">{formatCurrency(totalDeductions)}</td>
                                    </tr>

                                    {/* Amount after deductions */}
                                    <tr className="border-b bg-gray-100 font-medium">
                                        <td className="py-2 px-4">Amount after deductions</td>
                                        <td className="text-right py-2 px-4">{formatCurrency(taxableIncome / 12)}</td>
                                        <td className="text-right py-2 px-4">{formatCurrency(taxableIncome)}</td>
                                    </tr>

                                    {/* Tax Slabs */}
                                    <tr className="border-b">
                                        <td className="py-2 px-4">Upto 2.5 Lakhs (NIL)</td>
                                        <td className="text-right py-2 px-4">{formatCurrency(0)}</td>
                                        <td className="text-right py-2 px-4">{formatCurrency(0)}</td>
                                    </tr>
                                    {taxBreakdown.map((item, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="py-2 px-4">{item.slab}</td>
                                            <td className="text-right py-2 px-4">{formatCurrency(item.tax / 12)}</td>
                                            <td className="text-right py-2 px-4">{formatCurrency(item.tax)}</td>
                                        </tr>
                                    ))}

                                    {/* Tax Summary */}
                                    <tr className="border-b bg-gray-100">
                                        <td className="py-2 px-4 font-medium">Income Tax</td>
                                        <td className="text-right py-2 px-4">{formatCurrency((totalTax - (totalTax * EDUCATION_CESS / 100)) / 12)}</td>
                                        <td className="text-right py-2 px-4">{formatCurrency(totalTax - (totalTax * EDUCATION_CESS / 100))}</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-2 px-4">Education Cess @ {EDUCATION_CESS}%</td>
                                        <td className="text-right py-2 px-4">{formatCurrency((totalTax * EDUCATION_CESS / 100) / 12)}</td>
                                        <td className="text-right py-2 px-4">{formatCurrency(totalTax * EDUCATION_CESS / 100)}</td>
                                    </tr>
                                    <tr className="bg-gray-100 font-semibold">
                                        <td className="py-2 px-4">Total Tax Outgo</td>
                                        <td className="text-right py-2 px-4">{formatCurrency(totalTax / 12)}</td>
                                        <td className="text-right py-2 px-4">{formatCurrency(totalTax)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Tax Distribution Summary */}
                        <div className="mt-8 mb-6">
                            <h4 className="text-lg font-medium mb-4">Tax Distribution</h4>
                            <div className="flex items-center justify-around">
                                <div className="text-center">
                                    <div className="text-sm text-gray-600">Taxable Income</div>
                                    <div className="font-semibold">{formatCurrency(taxableIncome)}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm text-gray-600">Total Tax</div>
                                    <div className="font-semibold">{formatCurrency(totalTax)}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm text-gray-600">In Hand (Monthly)</div>
                                    <div className="font-semibold">{formatCurrency((ctc - totalTax) / 12)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default OldRegimeIncomeTaxCalculator; 