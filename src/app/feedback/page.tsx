import React from 'react';

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <div className="w-full max-w-2xl">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScv_SsrJtRdWPMtC3jfKUcu6KXZxAN9kgUUri1-ygCeM_PU6g/viewform?embedded=true"
          className="w-full border-0"
          style={{ height: '1800px' }}
          title="Contact Form"
          loading="lazy"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
} 