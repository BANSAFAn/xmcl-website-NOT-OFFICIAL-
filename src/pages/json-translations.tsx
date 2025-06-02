import React from 'react';
import { JsonTranslationExample } from '@/components/JsonTranslationExample';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

const JsonTranslationsPage: NextPage = () => {
  return (
    <>
      <NextSeo
        title="JSON Translations Example | XMCL"
        description="Example page demonstrating JSON-based translations in XMCL"
      />
      <div className="container mx-auto py-8">
        <JsonTranslationExample />
      </div>
    </>
  );
};

export default JsonTranslationsPage;