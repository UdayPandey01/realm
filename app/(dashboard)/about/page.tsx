"use client"

import Navbar from '@/components/Navbar';
import React from 'react';

const About = () => {
  return (
    <div>
        <Navbar/>
    <div className="max-w-5xl mx-auto px-4 py-12">
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700">
            Welcome to <strong>Realm</strong>! Our mission is to build a platform where diverse voices can come together and share knowledge, experiences, and ideas. We believe everyone has a unique story to tell, and through Realm, we aim to foster a community of readers and writers who can engage, connect, and learn from one another.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-inside text-lg text-gray-700">
            <li><strong>Write & Publish Blogs:</strong> Authors can easily write and publish blogs, share their thoughts, and reach a wider audience.</li>
            <li><strong>Community Engagement:</strong> Readers can comment, share their views, and interact with authors to create an engaging dialogue.</li>
            <li><strong>Categories:</strong> Blogs are organized into categories to help users discover content that aligns with their interests.</li>
            <li><strong>Responsive Design:</strong> The platform is designed to look great on any device, ensuring an optimal reading and writing experience.</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-lg text-gray-700">
            Our vision for Realm is to become a thriving community of passionate writers and readers, where every voice matters. We strive to create a platform that encourages open dialogue, creativity, and collaboration. Realm is more than just a blogging platform it is a space where ideas come to life and connections are made.
          </p>
        </div>
      </section>
    </div>
    </div>
  );
};

export default About;
