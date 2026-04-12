'use client';

import type { Config } from '@puckeditor/core';
import { Hero } from './blocks/Hero';
import { FeatureGrid } from './blocks/FeatureGrid';
import { RichText } from './blocks/RichText';
import { Stats } from './blocks/Stats';
import { CallToAction } from './blocks/CallToAction';
import { Root } from './root/Root';

export type PuckProps = {
  Hero: {
    heading: string;
    subheading: string;
    ctaLabel: string;
    ctaHref: string;
    backgroundImage?: string;
    align: 'left' | 'center';
  };
  FeatureGrid: {
    title: string;
    columns: 2 | 3 | 4;
    features: { icon: string; title: string; description: string }[];
  };
  RichText: { content: string };
  Stats: {
    stats: { value: string; label: string }[];
    background: 'white' | 'dark' | 'brand';
  };
  CallToAction: {
    heading: string;
    body: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel?: string;
    secondaryHref?: string;
    variant: 'centered' | 'split';
  };
};

export const config: Config<PuckProps> = {
  root: {
    render: Root,
    fields: {
      title: { type: 'text', label: 'Page title' },
    },
    defaultProps: { title: 'New page' },
  },
  components: {
    Hero: {
      label: 'Hero Section',
      fields: {
        heading: { type: 'text' },
        subheading: { type: 'textarea' },
        ctaLabel: { type: 'text', label: 'CTA Button Label' },
        ctaHref: { type: 'text', label: 'CTA URL' },
        backgroundImage: { type: 'text', label: 'Background Image URL' },
        align: {
          type: 'radio',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
          ],
        },
      },
      defaultProps: {
        heading: 'Build something great',
        subheading: 'The visual editor for React. No vendor lock-in.',
        ctaLabel: 'Get Started',
        ctaHref: '/',
        align: 'center',
      },
      render: Hero,
    },
    FeatureGrid: {
      label: 'Feature Grid',
      fields: {
        title: { type: 'text' },
        columns: {
          type: 'radio',
          options: [
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
          ],
        },
        features: {
          type: 'array',
          arrayFields: {
            icon: { type: 'text', label: 'Emoji icon' },
            title: { type: 'text' },
            description: { type: 'textarea' },
          },
        },
      },
      defaultProps: {
        title: 'Why choose us',
        columns: 3,
        features: [
          { icon: '⚡', title: 'Fast', description: 'Blazing fast by default' },
          { icon: '🔒', title: 'Secure', description: 'Security first approach' },
          { icon: '🌍', title: 'Global', description: 'CDN everywhere' },
        ],
      },
      render: FeatureGrid,
    },
    RichText: {
      label: 'Rich Text',
      fields: {
        content: { type: 'richtext' },
      },
      defaultProps: { content: '' },
      render: RichText,
    },
    Stats: {
      label: 'Stats Bar',
      fields: {
        stats: {
          type: 'array',
          arrayFields: {
            value: { type: 'text' },
            label: { type: 'text' },
          },
        },
        background: {
          type: 'select',
          options: [
            { label: 'White', value: 'white' },
            { label: 'Dark', value: 'dark' },
            { label: 'Brand', value: 'brand' },
          ],
        },
      },
      defaultProps: {
        stats: [
          { value: '10k+', label: 'Users' },
          { value: '99.9%', label: 'Uptime' },
          { value: '50ms', label: 'Avg response' },
        ],
        background: 'brand',
      },
      render: Stats,
    },
    CallToAction: {
      label: 'Call To Action',
      fields: {
        heading: { type: 'text' },
        body: { type: 'textarea' },
        primaryLabel: { type: 'text' },
        primaryHref: { type: 'text' },
        secondaryLabel: { type: 'text' },
        secondaryHref: { type: 'text' },
        variant: {
          type: 'radio',
          options: [
            { label: 'Centered', value: 'centered' },
            { label: 'Split', value: 'split' },
          ],
        },
      },
      defaultProps: {
        heading: 'Ready to get started?',
        body: 'Join thousands of teams already building with Puck.',
        primaryLabel: 'Start free',
        primaryHref: '/signup',
        variant: 'centered',
      },
      render: CallToAction,
    },
  },
};
