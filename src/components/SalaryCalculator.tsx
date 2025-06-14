'use client';

import React, { useState, useEffect } from 'react';
import { ShareIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from '@/lib/utils';

const REGIMES = [
  { label: 'Old Regime', value: 'old' },
  { label: 'New Regime (2025-26)', value: 'new' },
];

const OLD_STANDARD_DEDUCTION = 50000;
const OLD_MAX_80C_LIMIT = 150000;
const OLD_MAX_80D_LIMIT = 25000;
const OLD_MAX_80CCD_LIMIT = 50000;
const OLD_PROF_TAX_DEFAULT = 2400;
const OLD_GRATUITY_PERCENT = 0.05;
const OLD_PF_PERCENT = 0.12;

const NEW_STANDARD_DEDUCTION = 75000;

const TAX_SLABS_OLD = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 5 },
  { min: 500000, max: 1000000, rate: 20 },
  { min: 1000000, max: null, rate: 30 },
];
const TAX_SLABS_NEW = [
  { min: 0, max: 400000, rate: 0 },
  { min: 400000, max: 800000, rate: 5 },
  { min: 800000, max: 1200000, rate: 10 },
  { min: 1200000, max: 1600000, rate: 15 },
  { min: 1600000, max: 2000000, rate: 20 },
  { min: 2000000, max: 2400000, rate: 25 },
  { min: 2400000, max: null, rate: 30 },
];

const SLIDER_MIN = 200000;
const SLIDER_MAX = 10000000;
const SLIDER_STEP = 1000;

const SalaryCalculator = () => {
  const [regime, setRegime] = useState<'old' | 'new'>('new');
  const [ctc, setCtc] = useState(1000000);
  const [basicSalary, setBasicSalary] = useState(Math.round(1000000 * 0.5));
  const [monthlyBasic, setMonthlyBasic] = useState(Math.round(1000000 * 0.5 / 12));

  // Deductions (default values, can be overridden)
  const [pf, setPf] = useState(21600);
  const [epf, setEpf] = useState(21600);
  const [gratuity, setGratuity] = useState(Math.round(1000000 * 0.5 * OLD_GRATUITY_PERCENT));
  const [profTax, setProfTax] = useState(OLD_PROF_TAX_DEFAULT);
  const [section80C, setSection80C] = useState(0);
  const [nps80CCD, setNps80CCD] = useState(0);
  const [employerNps, setEmployerNps] = useState(0); // 80CCD(2)
  const [mediclaim80D, setMediclaim80D] = useState(0);
  const [donations80G, setDonations80G] = useState(0);
  const [homeLoanInterest80EEA, setHomeLoanInterest80EEA] = useState(0);
  const [eduLoanInterest80E, setEduLoanInterest80E] = useState(0);
  const [actualRent, setActualRent] = useState(0);
  const [hraExemption, setHraExemption] = useState(0);
  const [showCopied, setShowCopied] = useState(false);

  // Results
  const [gross, setGross] = useState(0);
  const [incomeTax, setIncomeTax] = useState(0);
  const [takeHome, setTakeHome] = useState(0);
  const [inHand, setInHand] = useState(0);

  // Cash Take Home calculation (do NOT deduct PF, EPF, Gratuity again)
  const cashTakeHome = takeHome
    - profTax
    - section80C
    - nps80CCD
    - mediclaim80D
    - donations80G
    - homeLoanInterest80EEA
    - eduLoanInterest80E
    - actualRent
    - (regime === 'new' ? employerNps : 0);

  // Update deduction defaults for regime
  useEffect(() => {
    if (regime === 'new') {
      setPf(0);
      setEpf(0);
      setNps80CCD(0);
      setGratuity(0);
    } else {

      const newBasic = Math.round(ctc * 0.5);
      setPf(Math.round(newBasic * OLD_PF_PERCENT));
      setEpf(Math.round(newBasic * OLD_PF_PERCENT));

      
      setGratuity(Math.round(newBasic * OLD_GRATUITY_PERCENT));
    }
  }, [regime, ctc]);

  // Update basic salary when CTC changes
  useEffect(() => {
    const newBasic = Math.round(ctc * 0.5);
    setBasicSalary(newBasic);
    setMonthlyBasic(Math.round(newBasic / 12));
    if (regime === 'old') {
      setPf(21600);
      setEpf(21600);
      setGratuity(Math.round(newBasic * OLD_GRATUITY_PERCENT));
    }
  }, [ctc]);

  // Calculate HRA exemption (for old regime)
  useEffect(() => {
    if (regime === 'old') {
      const hraReceived = basicSalary * 0.4;
      const rentExceedingBasic = Math.max(0, actualRent - (basicSalary * 0.1));
      const exemption = Math.min(hraReceived, basicSalary * 0.5, rentExceedingBasic);
      setHraExemption(exemption);
    } else {
      setHraExemption(0);
    }
  }, [actualRent, basicSalary, regime]);

  // Calculate all results
  useEffect(() => {
    // Gross = CTC - employer PF/EPF - gratuity
    const grossSalary = ctc - pf - gratuity;
    setGross(grossSalary);

    // Taxable income
    let deductions = 0;
    if (regime === 'old') {
      deductions = OLD_STANDARD_DEDUCTION + Math.min(section80C + pf + epf, OLD_MAX_80C_LIMIT) + Math.min(nps80CCD, OLD_MAX_80CCD_LIMIT) + Math.min(mediclaim80D, OLD_MAX_80D_LIMIT) + donations80G + homeLoanInterest80EEA + eduLoanInterest80E + hraExemption + profTax;
    } else {
      deductions = NEW_STANDARD_DEDUCTION + employerNps;
    }
    const taxable = Math.max(0, ctc - deductions);

    // Tax calculation
    let totalTax = 0;
    if (regime === 'old') {
      const slabs = TAX_SLABS_OLD;
      for (let i = 0; i < slabs.length; i++) {
        const slab = slabs[i];
        const slabMin = slab.min;
        const slabMax = slab.max ?? Infinity;
        const rate = slab.rate;
        if (taxable > slabMin) {
          const taxableInThisSlab = Math.min(taxable, slabMax) - slabMin;
          totalTax += (taxableInThisSlab * rate) / 100;
        }
      }
      // Add education cess
      totalTax += (totalTax * 4) / 100;
    } else {
      // New Regime FY 2025-26: slabs, standard deduction, employer NPS, rebate
      const slabs = TAX_SLABS_NEW;
      for (let i = 0; i < slabs.length; i++) {
        const slab = slabs[i];
        const slabMin = slab.min;
        const slabMax = slab.max ?? Infinity;
        const rate = slab.rate;
        if (taxable > slabMin) {
          const taxableInThisSlab = Math.min(taxable, slabMax) - slabMin;
          totalTax += (taxableInThisSlab * rate) / 100;
        }
      }
      // Apply rebate for taxable income up to 12L (after deductions)
      const REBATE_LIMIT = 1200000;
      const TAX_REBATE = 60000;
      if (taxable <= REBATE_LIMIT) {
        totalTax = Math.max(0, totalTax - TAX_REBATE);
      }
      // Add education cess
      totalTax += (totalTax * 4) / 100;
    }
    setIncomeTax(Math.round(totalTax));

    // Take Home = Gross - Income Tax
    setTakeHome(grossSalary - Math.round(totalTax));
    // In-hand calculation (no need to deduct PF, EPF, Professional Tax, and Gratuity again)
    setInHand(grossSalary - Math.round(totalTax));
  }, [ctc, pf, epf, gratuity, profTax, section80C, nps80CCD, employerNps, mediclaim80D, donations80G, homeLoanInterest80EEA, eduLoanInterest80E, hraExemption, actualRent, regime, basicSalary]);

  // Share button handler
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  // Slider color logic (copied from other calculators)
  const calculatePercentage = (value: number, max: number) => (value / max) * 100;
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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Salary Calculator</h2>
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
      <div className="mb-4 flex gap-4 items-center">
        <label className="font-semibold">Select Regime:</label>
        <select value={regime} onChange={e => setRegime(e.target.value as 'old' | 'new')} className="border rounded px-3 py-2">
          {REGIMES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Fixed CTC (₹)</label>
        <input
          type="number"
          value={ctc}
          onChange={e => setCtc(Number(e.target.value))}
          className="border rounded px-3 py-2 w-full"
          min={SLIDER_MIN}
          max={SLIDER_MAX}
          step={SLIDER_STEP}
        />
        <div className="mt-2">
          <input
            type="range"
            value={ctc}
            onChange={e => setCtc(Number(e.target.value))}
            min={SLIDER_MIN}
            max={SLIDER_MAX}
            step={SLIDER_STEP}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={getSliderStyle(ctc, SLIDER_MAX)}
          />
        </div>
        <div className="text-sm text-gray-500 mt-1">Monthly Basic: {formatCurrency(monthlyBasic)} | Yearly Basic: {formatCurrency(basicSalary)}</div>
      </div>
      {/* Deductions Section */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Deductions ({regime === 'old' ? 'Old Regime' : 'New Regime'})</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">PF (Yearly)</label>
            <input type="number" step={100}  value={pf} onChange={e => setPf(Number(e.target.value))} className="border rounded px-2 py-1 w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium">EPF (Yearly)</label>
            <input type="number" step={100} value={epf} onChange={e => setEpf(Number(e.target.value))} className="border rounded px-2 py-1 w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium">Gratuity (Yearly)</label>
            <input type="number" step={100}  value={gratuity} onChange={e => setGratuity(Number(e.target.value))} className="border rounded px-2 py-1 w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium">Professional Tax (Yearly)</label>
            <input type="number" value={profTax} onChange={e => setProfTax(Number(e.target.value))} className="border rounded px-2 py-1 w-full" />
          </div>
          {regime === 'old' && <>
            <div>
              <label className="block text-sm font-medium">Section 80C</label>
              <input type="number" step={1000}  value={section80C} onChange={e => setSection80C(Number(e.target.value))} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium">NPS 80CCD(1B)</label>
              <input type="number" step={100}  value={nps80CCD} onChange={e => setNps80CCD(Number(e.target.value))} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium">Mediclaim 80D</label>
              <input type="number" step={100}  value={mediclaim80D} onChange={e => setMediclaim80D(Number(e.target.value))} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium">Donations 80G</label>
              <input type="number" step={500}  value={donations80G} onChange={e => setDonations80G(Number(e.target.value))} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium">Home Loan Interest 80EEA</label>
              <input type="number" step={100}  value={homeLoanInterest80EEA} onChange={e => setHomeLoanInterest80EEA(Number(e.target.value))} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium">Education Loan Interest 80E</label>
              <input type="number" step={100}  value={eduLoanInterest80E} onChange={e => setEduLoanInterest80E(Number(e.target.value))} className="border rounded px-2 py-1 w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium">Annual Rent Paid</label>
              <input type="number" step={100}  value={actualRent} onChange={e => setActualRent(Number(e.target.value))} className="border rounded px-2 py-1 w-full" />
            </div>
          </>}
          {regime === 'new' && <>
            <div>
              <label className="block text-sm font-medium">Employer NPS 80CCD(2)</label>
              <input type="number" step={100}  value={employerNps} onChange={e => setEmployerNps(Number(e.target.value))} className="border rounded px-2 py-1 w-full" />
            </div>
          </>}
        </div>
      </div>
      {/* Results Section */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Results</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-50 rounded text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Component</th>
                <th className="px-4 py-2 text-right font-semibold">Yearly</th>
                <th className="px-4 py-2 text-right font-semibold">Monthly</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="px-4 py-2">CTC</td><td className="px-4 py-2 text-right">{formatCurrency(ctc)}</td><td className="px-4 py-2 text-right">{formatCurrency(ctc/12)}</td></tr>
              <tr><td className="px-4 py-2">Gross</td><td className="px-4 py-2 text-right">{formatCurrency(gross)}</td><td className="px-4 py-2 text-right">{formatCurrency(gross/12)}</td></tr>
              <tr><td className="px-4 py-2">Standard Deduction</td><td className="px-4 py-2 text-right">{formatCurrency(regime === 'old' ? OLD_STANDARD_DEDUCTION : NEW_STANDARD_DEDUCTION)}</td><td className="px-4 py-2 text-right">{formatCurrency((regime === 'old' ? OLD_STANDARD_DEDUCTION : NEW_STANDARD_DEDUCTION)/12)}</td></tr>
              <tr><td className="px-4 py-2">Take Home</td><td className="px-4 py-2 text-right">{formatCurrency(takeHome)}</td><td className="px-4 py-2 text-right">{formatCurrency(takeHome/12)}</td></tr>
              <tr>
                <td className="px-4 py-2 flex items-center gap-2">
                  <span>In-Hand</span>
                </td>
                <td className="px-4 py-2 text-right font-bold">{formatCurrency(cashTakeHome)}</td>
                <td className="px-4 py-2 text-right font-bold">{formatCurrency(cashTakeHome/12)}</td>
              </tr>
              <tr><td className="px-4 py-2">Income Tax</td><td className="px-4 py-2 text-right">{regime === 'new' && incomeTax === 0 ? '0 (after rebate)' : formatCurrency(incomeTax)}</td><td className="px-4 py-2 text-right">{regime === 'new' && incomeTax === 0 ? '0' : formatCurrency(incomeTax/12)}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Explanations Section */}
      <div className="mt-8">
        <h3 className="font-semibold mb-2">Explanation of Calculations</h3>
        <ul className="list-disc pl-6 text-sm text-gray-700">
          <li>
            <b>Gross Salary</b>: 
            <span className="ml-1">Gross Salary (</span>
            <span className="text-blue-600 font-semibold">{formatCurrency(gross)}</span>
            <span>) = CTC (</span>
            <span className="text-blue-600 font-semibold">{formatCurrency(ctc)}</span>
            <span>) - EPF (</span>
            <span className="text-blue-600 font-semibold">{formatCurrency(epf)}</span>
            <span>) - Gratuity (</span>
            <span className="text-blue-600 font-semibold">{formatCurrency(gratuity)}</span>
            <span>).</span>
          </li>
          <li>
            <b>Take Home</b>: 
            <span className="ml-1">Take Home (</span>
            <span className="text-green-600 font-semibold">{formatCurrency(takeHome)}</span>
            <span>) = Gross (</span>
            <span className="text-blue-600 font-semibold">{formatCurrency(gross)}</span>
            <span>) - Income Tax (</span>
            <span className="text-red-600 font-semibold">{formatCurrency(incomeTax)}</span>
            <span>).</span>
          </li>
          <li>
            <b>In-Hand</b>:
            <span className="ml-1">In-Hand (</span>
            <span className="text-green-600 font-semibold">{formatCurrency(cashTakeHome)}</span>
            <span>) = Take Home (</span>
            <span className="text-green-600 font-semibold">{formatCurrency(takeHome)}</span>
            <span>) - Professional Tax (</span>
            <span className="text-blue-600 font-semibold">{formatCurrency(profTax)}</span>
            <span>) - 80C (</span>
            <span className="text-blue-600 font-semibold">{formatCurrency(section80C)}</span>
            <span>) - NPS 80CCD(1B) (</span>
            <span className="text-blue-600 font-semibold">{formatCurrency(nps80CCD)}</span>
            <span>) - Mediclaim 80D (</span>
            <span className="text-blue-600 font-semibold">{formatCurrency(mediclaim80D)}</span>
            <span>) - Donations 80G (</span>
            <span className="text-blue-600 font-semibold">{formatCurrency(donations80G)}</span>
            <span>) - Home Loan Interest 80EEA (</span>
            <span className="text-blue-600 font-semibold">{formatCurrency(homeLoanInterest80EEA)}</span>
            <span>) - Education Loan Interest 80E (</span>
            <span className="text-blue-600 font-semibold">{formatCurrency(eduLoanInterest80E)}</span>
            <span>) - Rent (</span>
            <span className="text-blue-600 font-semibold">{formatCurrency(actualRent)}</span>
            <span>){regime === 'new' ? <span> - Employer NPS (<span className="text-blue-600 font-semibold">{formatCurrency(employerNps)}</span>)</span> : null}.</span>
          </li>
          <li>
            <b>Taxable Income</b>: 
            <span className="ml-1">Taxable Income (</span>
            <span className="text-blue-600 font-semibold">{regime === 'old' ? `See old regime formula` : formatCurrency(Math.max(0, ctc - (NEW_STANDARD_DEDUCTION + employerNps + profTax)))}</span>
            <span>) = CTC (</span>
            <span className="text-blue-600 font-semibold">{formatCurrency(ctc)}</span>
            <span>) - Deductions (as per selected regime).</span>
          </li>
          <li>
            <b>Income Tax</b>: 
            <span className="ml-1">Calculated as per regime slabs and cess. See above for details.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SalaryCalculator; 