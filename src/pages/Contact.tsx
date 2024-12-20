import React from 'react';
import { ContactForm } from '../components/ContactForm';
import { Phone, Mail, MapPin } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-bold text-celtic-green mb-8">Get in Touch</h1>
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-celtic-gold/20">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-celtic-green" />
                <div>
                  <h3 className="font-semibold text-celtic-green">Phone</h3>
                  <p className="text-celtic-brown">07967394976</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-celtic-green" />
                <div>
                  <h3 className="font-semibold text-celtic-green">Email</h3>
                  <p className="text-celtic-brown">celticwristbands@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-celtic-green" />
                <div>
                  <h3 className="font-semibold text-celtic-green">Location</h3>
                  <p className="text-celtic-brown">United Kingdom</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <ContactForm />
      </div>
    </div>
  );
};