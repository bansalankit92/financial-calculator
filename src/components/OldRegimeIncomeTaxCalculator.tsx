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
    const [actualRent, setActualRent] = useState(0);
    const [isMetroCity, setIsMetroCity] = useState(true);
    const [hraExemption, setHraExemption] = useState(0);
    const [showDocs, setShowDocs] = useState(false);
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

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

    // Calculate HRA exemption whenever relevant inputs change
    useEffect(() => {
        const hraReceived = hra;
        const basicSalaryPercent = isMetroCity ? 0.5 : 0.4;
        const rentExceedingBasic = Math.max(0, actualRent - (basicSalaryYearly * 0.1));
        
        const exemption = Math.min(
            hraReceived,
            basicSalaryYearly * basicSalaryPercent,
            rentExceedingBasic
        );
        
        setHraExemption(exemption);
    }, [hra, actualRent, basicSalaryYearly, isMetroCity]);

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
            className="container mx-auto p-4 space-y-6"
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
                            <div className="border-t pt-4 mt-4">
                                <div 
                                    className="flex justify-between items-center cursor-pointer" 
                                    onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                                >
                                    <h3 className="text-lg font-semibold">Advanced Options</h3>
                                    <span className="text-gray-500">
                                        {showAdvancedOptions ? '▼' : '▶'}
                                    </span>
                                </div>
                                
                                {showAdvancedOptions && (
                                    <div className="mt-4 grid grid-cols-2 gap-4">
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
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Gratuity (Yearly)</label>
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
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Conveyance (Typical: ₹19,200/year)</label>
                                            <input
                                                type="number"
                                                value={conveyance}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => setConveyance(Number(e.target.value))}
                                                className={inputClassName}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">HRA Received (Yearly)</label>
                                            <input
                                                type="number"
                                                value={hra}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => setHra(Number(e.target.value))}
                                                className={inputClassName}
                                                min={0}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Annual Rent Paid</label>
                                            <input
                                                type="number"
                                                value={actualRent}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => setActualRent(Number(e.target.value))}
                                                className={inputClassName}
                                                min={0}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">City Type</label>
                                            <div className="flex gap-4">
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        className="form-radio text-blue-600"
                                                        checked={isMetroCity}
                                                        onChange={() => setIsMetroCity(true)}
                                                    />
                                                    <span className="ml-2">Metro (50% of Basic)</span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="radio"
                                                        className="form-radio text-blue-600"
                                                        checked={!isMetroCity}
                                                        onChange={() => setIsMetroCity(false)}
                                                    />
                                                    <span className="ml-2">Non-Metro (40% of Basic)</span>
                                                </label>
                                            </div>
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
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Tax Distribution */}
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
                                    <span className="font-semibold text-gray-600">{formatCurrency((ctc - totalTax))}</span>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-gray-600">Take Home (Monthly):</span>
                                    <span className="font-semibold text-gray-600">{formatCurrency((ctc - totalTax) / 12)}</span>
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
                </div>
            </div>

            {/* Tax Calculation - Full Width */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-3xl font-bold mb-6">Tax Calculation</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* HRA Calculation */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">HRA Exemption Calculation</h3>
                        <div className="space-y-3 text-base">
                            <div className="flex justify-between">
                                <span>HRA Received:</span>
                                <span className="font-medium">{formatCurrency(hra)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>{isMetroCity ? '50%' : '40%'} of Basic Salary:</span>
                                <span className="font-medium">{formatCurrency(basicSalaryYearly * (isMetroCity ? 0.5 : 0.4))}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Rent Exceeding 10% of Basic:</span>
                                <span className="font-medium">{formatCurrency(Math.max(0, actualRent - (basicSalaryYearly * 0.1)))}</span>
                            </div>
                            <div className="flex justify-between font-semibold pt-3 border-t text-lg">
                                <span>HRA Exemption (Minimum of above):</span>
                                <span className="text-green-600">{formatCurrency(hraExemption)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Tax Slab Calculation */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-4">Tax Slab Calculation</h3>
                        <div className="space-y-3 text-base">
                            {taxBreakdown.map((item, index) => (
                                <div key={index} className="flex justify-between">
                                    <span>{item.slab}:</span>
                                    <span className="font-medium">{formatCurrency(item.tax)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold mb-4">Detailed Breakdown</h3>
                    <div className="space-y-3 text-base max-w-3xl">
                        <div className="flex justify-between">
                            <span>Total CTC:</span>
                            <span className="font-medium">{formatCurrency(ctc)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Standard Deduction:</span>
                            <span className="font-medium">- {formatCurrency(STANDARD_DEDUCTION)}</span>
                        </div>
                        {epf > 0 && (
                            <div className="flex justify-between">
                                <span>EPF:</span>
                                <span className="font-medium">- {formatCurrency(epf)}</span>
                            </div>
                        )}
                        {section80C > 0 && (
                            <div className="flex justify-between">
                                <span>Section 80C:</span>
                                <span className="font-medium">- {formatCurrency(section80C)}</span>
                            </div>
                        )}
                        {nps80CCD > 0 && (
                            <div className="flex justify-between">
                                <span>NPS (80CCD):</span>
                                <span className="font-medium">- {formatCurrency(nps80CCD)}</span>
                            </div>
                        )}
                        {mediclaim80D > 0 && (
                            <div className="flex justify-between">
                                <span>Medical Insurance (80D):</span>
                                <span className="font-medium">- {formatCurrency(mediclaim80D)}</span>
                            </div>
                        )}
                        {donations80G > 0 && (
                            <div className="flex justify-between">
                                <span>Donations (80G):</span>
                                <span className="font-medium">- {formatCurrency(donations80G)}</span>
                            </div>
                        )}
                        {homeLoanInterest80EEA > 0 && (
                            <div className="flex justify-between">
                                <span>Home Loan Interest (80EEA):</span>
                                <span className="font-medium">- {formatCurrency(homeLoanInterest80EEA)}</span>
                            </div>
                        )}
                        {eduLoanInterest80E > 0 && (
                            <div className="flex justify-between">
                                <span>Education Loan Interest (80E):</span>
                                <span className="font-medium">- {formatCurrency(eduLoanInterest80E)}</span>
                            </div>
                        )}
                        {hraExemption > 0 && (
                            <div className="flex justify-between">
                                <span>HRA Exemption:</span>
                                <span className="font-medium">- {formatCurrency(hraExemption)}</span>
                            </div>
                        )}
                        {profTax > 0 && (
                            <div className="flex justify-between">
                                <span>Professional Tax:</span>
                                <span className="font-medium">- {formatCurrency(profTax)}</span>
                            </div>
                        )}
                        <div className="flex justify-between font-semibold pt-3 border-t text-lg">
                            <span>Taxable Income:</span>
                            <span>{formatCurrency(taxableIncome)}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg">
                            <span>Total Tax:</span>
                            <span className="text-red-600">{formatCurrency(totalTax)}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg">
                            <span>In-Hand Salary (Monthly):</span>
                            <span className="text-green-600">{formatCurrency(Math.round((ctc - totalDeductions - totalTax) / 12))}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Documentation Section - Full Width */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Tax Calculator Documentation</h2>
                
                <div className="space-y-8">
                    {/* Tax Slabs */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Tax Slabs (Old Regime)</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Income Range</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Tax Rate</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Example</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 text-sm">Up to ₹2.5L</td>
                                        <td className="px-6 py-4 text-sm">No tax</td>
                                        <td className="px-6 py-4 text-sm">For ₹2.5L: Tax = ₹0</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-sm">₹2.5L to ₹5L</td>
                                        <td className="px-6 py-4 text-sm">5%</td>
                                        <td className="px-6 py-4 text-sm">For ₹5L: Tax = ₹12,500</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-sm">₹5L to ₹10L</td>
                                        <td className="px-6 py-4 text-sm">20%</td>
                                        <td className="px-6 py-4 text-sm">For ₹10L: Tax = ₹1,12,500</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-sm">Above ₹10L</td>
                                        <td className="px-6 py-4 text-sm">30%</td>
                                        <td className="px-6 py-4 text-sm">For ₹15L: Tax = ₹2,62,500</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 text-sm">Education Cess</td>
                                        <td className="px-6 py-4 text-sm">4% on total tax</td>
                                        <td className="px-6 py-4 text-sm">On ₹1L tax: Cess = ₹4,000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Deductions */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Available Deductions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-lg font-medium text-gray-900">Standard Deduction</h4>
                                    <p className="mt-2 text-gray-600">Fixed amount of ₹50,000 available to all salaried individuals. No documentation needed.</p>
                                </div>
                                
                                <div>
                                    <h4 className="text-lg font-medium text-gray-900">Section 80C (Max: ₹1.5L)</h4>
                                    <ul className="mt-2 space-y-2 text-gray-600">
                                        <li>• EPF (Employee Provident Fund) - 12% of basic salary</li>
                                        <li>• PPF (Public Provident Fund) - Long-term savings</li>
                                        <li>• ELSS (Equity Linked Savings Scheme) - Tax-saving mutual funds</li>
                                        <li>• Life Insurance Premium - Term and traditional plans</li>
                                        <li>• Home Loan Principal Repayment</li>
                                        <li>• Tuition Fees for up to 2 children</li>
                                        <li>• Tax-saving Fixed Deposits (5-year lock-in)</li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-lg font-medium text-gray-900">Section 80CCD(1B) - NPS</h4>
                                    <p className="mt-2 text-gray-600">Additional ₹50,000 deduction for contribution to National Pension System (NPS). This is over and above the ₹1.5L limit of Section 80C.</p>
                                </div>

                                <div>
                                    <h4 className="text-lg font-medium text-gray-900">Section 80D - Medical Insurance</h4>
                                    <ul className="mt-2 space-y-2 text-gray-600">
                                        <li>• Self & Family: Up to ₹25,000</li>
                                        <li>• Parents (Non-Senior Citizens): Up to ₹25,000</li>
                                        <li>• Parents (Senior Citizens): Up to ₹50,000</li>
                                        <li>• Preventive Health Check-up: Up to ₹5,000 (included in above limits)</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-lg font-medium text-gray-900">HRA Exemption</h4>
                                    <p className="mt-2 text-gray-600">Minimum of:</p>
                                    <ul className="mt-2 space-y-2 text-gray-600">
                                        <li>• Actual HRA received from employer</li>
                                        <li>• 50% of basic salary (for metro cities)</li>
                                        <li>• 40% of basic salary (for non-metro cities)</li>
                                        <li>• Actual rent paid minus 10% of basic salary</li>
                                    </ul>
                                    <p className="mt-2 text-gray-600">Metro cities: Delhi NCR, Mumbai, Chennai, Kolkata, Hyderabad, Bangalore</p>
                                </div>

                                <div>
                                    <h4 className="text-lg font-medium text-gray-900">Section 80EEA - Home Loan Interest</h4>
                                    <ul className="mt-2 space-y-2 text-gray-600">
                                        <li>• Additional ₹1.5L deduction for first-time home buyers</li>
                                        <li>• Loan sanctioned between Apr 2019 - Mar 2022</li>
                                        <li>• Property value up to ₹45L</li>
                                        <li>• This is over and above Section 24 interest deduction</li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-lg font-medium text-gray-900">Section 80E - Education Loan Interest</h4>
                                    <ul className="mt-2 space-y-2 text-gray-600">
                                        <li>• No upper limit on deduction</li>
                                        <li>• Available for self, spouse, or children</li>
                                        <li>• Covers all fields of study</li>
                                        <li>• Available for 8 years from first repayment</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Important Notes */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Important Notes</h3>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <ul className="space-y-2 text-gray-600">
                                <li>• All figures are for Financial Year 2023-24 (Assessment Year 2024-25)</li>
                                <li>• Basic salary typically constitutes 40-50% of CTC in most organizations</li>
                                <li>• EPF contribution is mandatory if basic salary > ₹15,000 per month</li>
                                <li>• EPF contribution is capped at ₹1,800 monthly (12% of ₹15,000)</li>
                                <li>• Professional Tax varies by state, typically around ₹2,400 per year</li>
                                <li>• Education Cess of 4% is applicable on the total tax amount</li>
                                <li>• Tax calculation is progressive - different rates apply to different slabs</li>
                                <li>• Section 80C deductions have a combined limit of ₹1.5L</li>
                                <li>• For HRA exemption, rent receipts are mandatory if annual rent > ₹1L</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default OldRegimeIncomeTaxCalculator; 