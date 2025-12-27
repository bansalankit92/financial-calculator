'use client';

import React from 'react';
import Link from 'next/link';
import EMICalculatorClient from '@/app/emi/EMICalculatorClient';
import CalculatorEmbed from '@/components/blog/CalculatorEmbed';
import ComparisonTable from '@/components/blog/ComparisonTable';
import InfoCard from '@/components/blog/InfoCard';
import StepGuide from '@/components/blog/StepGuide';
import QuickTip from '@/components/blog/QuickTip';

export default function EMIHomeLoanBlog() {
  // EMI Calculator config for ₹80 lakh home loan
  const homeLoanConfig = {
    principal: { min: 100000, max: 50000000, step: 50000, default: 8000000 },
    interest: { min: 5, max: 20, step: 0.1, default: 8.5 },
    years: { min: 1, max: 30, step: 1, default: 20 },
  };

  return (
    <div className="blog-content">
      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          The Emotional Decision vs The Investment Decision
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Buying a home is often considered a milestone in life. Parents feel proud,
          society approves, and you get the keys to something that feels like "yours."
          But here's the uncomfortable truth: buying a home, especially on a loan,
          might be one of the worst financial decisions you'll make.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          This isn't about dismissing homeownership entirely. It's about understanding
          the real cost of a home loan and comparing it with alternative strategies that
          could leave you significantly wealthier.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Let's break down the numbers without the emotional baggage.
        </p>
      </section>

      {/* How Banks Structure Loans */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          How Banks Structure Home Loans to Keep You Paying
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Banks are not in the business of helping you own a home quickly. They're
          in the business of maximizing their interest income. Here's how they do it:
        </p>

        <InfoCard type="warning" title="The Front-Loading Trick">
          <p className="mb-3">
            In the early years of your loan, most of your EMI goes toward interest,
            not the principal amount. For a ₹80 lakh loan at 8.5% interest over 20 years:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Year 1:</strong> You pay ₹8.7 lakh in EMI, but only ₹1.9 lakh goes to principal</li>
            <li><strong>Year 5:</strong> Still paying ₹6.4 lakh in interest annually</li>
            <li><strong>Year 10:</strong> You've paid ₹87 lakh total, but only ₹35 lakh reduced your principal</li>
          </ul>
          <p className="mt-3">
            This front-loading ensures that if you sell the property early or prepay the loan,
            the bank has already collected most of its profit.
          </p>
        </InfoCard>

        <QuickTip>
          The bank's interest is calculated on the outstanding principal. In the first few years,
          your outstanding balance is highest, so interest charges are maximum. This is why
          prepaying early saves you the most money.
        </QuickTip>
      </section>

      {/* Interactive Calculator */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Calculate Your Real Home Loan Cost
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Use this calculator to see exactly how much you'll pay over the life of your loan.
          Pay attention to the total interest amount—it's often shocking.
        </p>

        <CalculatorEmbed
          title="Home Loan EMI Calculator"
          description="Adjust the loan amount, interest rate, and tenure to see your monthly EMI and total interest payable."
          calculatorPath="/emi/home-loan"
        >
          <EMICalculatorClient config={homeLoanConfig} />
        </CalculatorEmbed>

        <InfoCard type="info" title="Understanding Your Results">
          <p className="mb-2">After using the calculator, look at these key numbers:</p>
          <ul className="list-disc list-inside space-y-1.5">
            <li><strong>Monthly EMI:</strong> Can you comfortably afford this without compromising other financial goals?</li>
            <li><strong>Total Interest:</strong> This is your true cost of borrowing. Often equals or exceeds the principal!</li>
            <li><strong>Total Payment:</strong> The actual price you'll pay for your "₹80 lakh" home</li>
          </ul>
        </InfoCard>
      </section>

      {/* Alternative Strategy */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          The Alternative: Rent + Invest Strategy
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Here's a strategy most people never consider: rent a home and invest the difference
          between your EMI and rent in mutual funds. Let's compare:
        </p>

        <ComparisonTable
          title="20-Year Financial Comparison: Buy vs Rent+Invest"
          columns={[
            { key: 'scenario', label: 'Scenario', align: 'left' },
            { key: 'monthlyOut', label: 'Monthly Outflow', align: 'right' },
            { key: 'totalPaid', label: 'Total Paid (20Y)', align: 'right' },
            { key: 'assetValue', label: 'Asset Value', align: 'right' },
            { key: 'netWorth', label: 'Net Worth', align: 'right' },
          ]}
          data={[
            {
              scenario: 'Buy: ₹80L Loan @ 8.5%',
              monthlyOut: '₹70,200 EMI',
              totalPaid: '₹1.68 Cr',
              assetValue: '₹2.10 Cr*',
              netWorth: '₹2.10 Cr',
            },
            {
              scenario: 'Rent @ ₹25k + Invest ₹45k',
              monthlyOut: '₹70,000 Total',
              totalPaid: '₹60L (Rent) + ₹1.08 Cr (Invested)',
              assetValue: '₹2.75 Cr**',
              netWorth: '₹2.75 Cr',
            },
          ]}
          highlightColumn="netWorth"
        />

        <div className="mt-6 text-sm text-gray-600 space-y-1">
          <p>* Assumes 5% annual property appreciation (conservative estimate)</p>
          <p>** Assumes 12% annual mutual fund returns (historical Nifty average)</p>
          <p>*** Does not include property maintenance, taxes, and renovation costs</p>
        </div>

        <InfoCard type="success" title="The Rent+Invest Advantage">
          <p className="mb-3">
            With the Rent+Invest strategy, you end up with:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>₹65 lakh more wealth</strong> after 20 years</li>
            <li><strong>Complete liquidity:</strong> Sell your mutual fund units anytime, no property buyer needed</li>
            <li><strong>Flexibility:</strong> Move cities for better opportunities without selling property</li>
            <li><strong>No maintenance costs:</strong> Your landlord handles repairs, society charges, and property tax</li>
            <li><strong>Diversification:</strong> Your wealth isn't tied to one physical asset</li>
          </ul>
        </InfoCard>

        <QuickTip>
          The biggest advantage of renting is flexibility. In today's economy, the ability to
          move for better career opportunities can increase your income far more than property
          appreciation ever will.
        </QuickTip>
      </section>

      {/* Age & Salary Guidelines */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Age & Salary Guidelines for Home Loans
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          If you're still considering a home loan, use these guidelines to avoid overextending yourself:
        </p>

        <ComparisonTable
          title="Recommended Home Loan Limits by Age & Income"
          columns={[
            { key: 'age', label: 'Age Group', align: 'left' },
            { key: 'salary', label: 'Monthly Income', align: 'right' },
            { key: 'maxLoan', label: 'Max Loan Amount', align: 'right' },
            { key: 'maxEmi', label: 'Max EMI (40% of income)', align: 'right' },
            { key: 'advice', label: 'Recommendation', align: 'left' },
          ]}
          data={[
            {
              age: '25-30',
              salary: '₹50,000 - ₹75,000',
              maxLoan: '₹25-35 lakhs',
              maxEmi: '₹20,000 - ₹30,000',
              advice: 'Focus on career growth. Rent is smarter.',
            },
            {
              age: '30-35',
              salary: '₹1,00,000 - ₹1,50,000',
              maxLoan: '₹40-60 lakhs',
              maxEmi: '₹40,000 - ₹60,000',
              advice: 'Buy only if settled in one city long-term.',
            },
            {
              age: '35-40',
              salary: '₹1,50,000 - ₹2,50,000',
              maxLoan: '₹60-1 crore',
              maxEmi: '₹60,000 - ₹1,00,000',
              advice: 'Consider if you have 30%+ down payment.',
            },
            {
              age: '40-45',
              salary: '₹2,50,000+',
              maxLoan: '₹1-1.5 crore',
              maxEmi: '₹1,00,000+',
              advice: 'Short tenure (10-15 years) to retire debt-free.',
            },
          ]}
        />

        <InfoCard type="warning" title="The 40% Rule">
          <p>
            Your total EMI should never exceed 40% of your monthly income. Ideally, keep it
            under 30% to maintain a comfortable lifestyle and invest for other goals like
            retirement and children's education.
          </p>
        </InfoCard>
      </section>

      {/* Tier 1 City Reality */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Why Tier 1 Cities May Not Be Worth It
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Mumbai, Bangalore, Delhi-NCR—these cities have absurd property prices relative
          to rental yields. Here's the math that real estate agents won't tell you:
        </p>

        <ComparisonTable
          title="Property Price vs Rental Yield in Indian Cities"
          columns={[
            { key: 'city', label: 'City', align: 'left' },
            { key: 'avgPrice', label: '2BHK Avg Price', align: 'right' },
            { key: 'avgRent', label: 'Monthly Rent', align: 'right' },
            { key: 'yield', label: 'Annual Yield', align: 'right' },
            { key: 'breakeven', label: 'Years to Break Even', align: 'right' },
          ]}
          data={[
            {
              city: 'Mumbai',
              avgPrice: '₹1.5 Cr',
              avgRent: '₹45,000',
              yield: '3.6%',
              breakeven: '28 years',
            },
            {
              city: 'Bangalore',
              avgPrice: '₹1.2 Cr',
              avgRent: '₹35,000',
              yield: '3.5%',
              breakeven: '29 years',
            },
            {
              city: 'Delhi-NCR',
              avgPrice: '₹1.0 Cr',
              avgRent: '₹30,000',
              yield: '3.6%',
              breakeven: '28 years',
            },
            {
              city: 'Pune',
              avgPrice: '₹80 L',
              avgRent: '₹25,000',
              yield: '3.75%',
              breakeven: '27 years',
            },
            {
              city: 'Tier 2 Cities',
              avgPrice: '₹50 L',
              avgRent: '₹15,000',
              yield: '3.6%',
              breakeven: '28 years',
            },
          ]}
        />

        <div className="mt-6">
          <InfoCard type="info" title="What This Means">
            <p className="mb-3">
              A rental yield of 3-4% is terrible compared to other investments:
            </p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>Fixed Deposits: 6-7% (risk-free)</li>
              <li>Debt Mutual Funds: 7-9%</li>
              <li>Equity Mutual Funds: 10-14% (long-term average)</li>
              <li>REITs: 6-8% (real estate without the hassle)</li>
            </ul>
            <p className="mt-3">
              Property makes sense only if you believe in appreciation. But appreciation
              in Tier 1 cities has slowed significantly over the last decade.
            </p>
          </InfoCard>
        </div>
      </section>

      {/* Actionable Steps */}
      <section className="mb-12">
        <StepGuide
          title="Smart Steps to Make This Decision"
          steps={[
            {
              title: 'Calculate Your True EMI Burden',
              description:
                'Use the calculator above to see total interest payable. Include property tax, maintenance, and renovation costs in your calculation. Be realistic about what you can afford.',
            },
            {
              title: 'Compare with Rent + Invest',
              description:
                'Find the rent for a similar property in your desired area. Calculate the difference between EMI and rent. Use a SIP calculator to project what investing that difference could yield over 20 years.',
            },
            {
              title: 'Evaluate Your Career Stage',
              description:
                'Are you likely to stay in the same city for 10+ years? Can you afford to miss career opportunities in other cities because of property ownership? Be honest about your career trajectory.',
            },
            {
              title: 'Consider Down Payment Alternatives',
              description:
                'If you have ₹20-30 lakhs for down payment, calculate what that amount could become if invested in equity mutual funds over 20 years. Often, the opportunity cost of the down payment alone is significant.',
            },
            {
              title: 'Factor in Liquidity Needs',
              description:
                'Real estate is highly illiquid. In emergencies, selling property takes months. Can you afford to have most of your wealth locked in an asset you can\'t quickly convert to cash?',
            },
          ]}
        />
      </section>

      {/* Conclusion */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          The Bottom Line
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Buying a home isn't inherently bad. What's bad is buying a home without
          understanding the real cost and comparing it with alternatives.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          For most young professionals in India, especially those in Tier 1 cities,
          renting and investing the difference is mathematically superior. You build
          more wealth, maintain flexibility, and avoid tying your entire financial
          future to one asset.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          The choice is yours. But make it with your eyes open to the numbers, not
          just the emotions.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
          <h3 className="text-xl font-bold text-blue-900 mb-3">
            Ready to Calculate Your EMI?
          </h3>
          <p className="text-blue-800 mb-4">
            Use our comprehensive EMI calculator to plan your home loan, compare different
            scenarios, and make an informed decision.
          </p>
          <Link
            href="/emi/home-loan"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            Try Full EMI Calculator →
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-600 italic">
          <strong>Disclaimer:</strong> This article provides general information and analysis
          based on typical scenarios. Individual financial situations vary. Consult with a
          certified financial planner before making major financial decisions. Property prices,
          rental yields, and investment returns are based on historical averages and may vary
          significantly based on location, market conditions, and time period.
        </p>
      </section>
    </div>
  );
}
