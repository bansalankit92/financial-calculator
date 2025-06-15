import React from 'react';

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <div className="w-full max-w-2xl">
        <div className="relative pb-[250%] h-0 overflow-hidden">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScv_SsrJtRdWPMtC3jfKUcu6KXZxAN9kgUUri1-ygCeM_PU6g/viewform?embedded=true"
            width="640"
            height="1300"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            // className="absolute top-0 left-0 w-full h-full border-0"
            title="Contact Form"
            loading="lazy"
            allowFullScreen
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  );
} 