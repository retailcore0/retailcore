'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';

// Dados mockados
const mockProducts = [
  { id: 'prod_base', name: 'Base' },
  { id: 'prod_plus', name: 'Plus' },
];

const mockPrices = [
  { 
    id: 'price_base_monthly', 
    productId: 'prod_base', 
    unitAmount: 800, 
    interval: 'month', 
    trialPeriodDays: 7 
  },
  { 
    id: 'price_plus_monthly', 
    productId: 'prod_plus', 
    unitAmount: 1200, 
    interval: 'month', 
    trialPeriodDays: 7 
  },
];

export default function PricingPage() {
  // Usando dados mockados em vez de buscar do Stripe
  const prices = mockPrices;
  const products = mockProducts;

  const basePlan = products.find((product) => product.name === 'Base');
  const plusPlan = products.find((product) => product.name === 'Plus');

  const basePrice = prices.find((price) => price.productId === basePlan?.id);
  const plusPrice = prices.find((price) => price.productId === plusPlan?.id);

  // Função simplificada para simular o checkout
  const handleCheckout = (e: React.FormEvent): void => {
    e.preventDefault();
    alert('Checkout functionality would be here in a real app');
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-8 max-w-xl mx-auto">
        <PricingCard
          name={basePlan?.name || 'Base'}
          price={basePrice?.unitAmount || 800}
          interval={basePrice?.interval || 'month'}
          trialDays={basePrice?.trialPeriodDays || 7}
          features={[
            'Unlimited Usage',
            'Unlimited Workspace Members',
            'Email Support',
          ]}
          priceId={basePrice?.id}
          onCheckout={handleCheckout}
        />
        <PricingCard
          name={plusPlan?.name || 'Plus'}
          price={plusPrice?.unitAmount || 1200}
          interval={plusPrice?.interval || 'month'}
          trialDays={plusPrice?.trialPeriodDays || 7}
          features={[
            'Everything in Base, and:',
            'Early Access to New Features',
            '24/7 Support + Slack Access',
          ]}
          priceId={plusPrice?.id}
          onCheckout={handleCheckout}
        />
      </div>
    </main>
  );
}

interface PricingCardProps {
  name: string;
  price: number;
  interval: string;
  trialDays: number;
  features: string[];
  priceId?: string;
  onCheckout: (e: React.FormEvent) => void;
}

function PricingCard({
  name,
  price,
  interval,
  trialDays,
  features,
  priceId,
  onCheckout,
}: PricingCardProps) {
  return (
    <div className="pt-6">
      <h2 className="text-2xl font-medium text-gray-900 mb-2">{name}</h2>
      <p className="text-sm text-gray-600 mb-4">
        with {trialDays} day free trial
      </p>
      <p className="text-4xl font-medium text-gray-900 mb-6">
        ${price / 100}{' '}
        <span className="text-xl font-normal text-gray-600">
          per user / {interval}
        </span>
      </p>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={onCheckout}>
        <input type="hidden" name="priceId" value={priceId} />
        <Button type="submit" className="w-full">
          Start Free Trial
        </Button>
      </form>
    </div>
  );
}
