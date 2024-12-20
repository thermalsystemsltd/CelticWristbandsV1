import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_r2b01x1';
const EMAILJS_TEMPLATE_ID = 'service_r2b01x1';
const EMAILJS_PUBLIC_KEY = 'X4t2us8R50NHxLtpc';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: 'celticwristbands@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-celtic-gold/20">
      <h2 className="text-3xl font-bold text-celtic-green mb-6">Contact Us</h2>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-celtic-green mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-celtic-gold/20 rounded-md focus:ring-2 focus:ring-celtic-green focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-celtic-green mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-celtic-gold/20 rounded-md focus:ring-2 focus:ring-celtic-green focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-celtic-green mb-1">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-celtic-gold/20 rounded-md focus:ring-2 focus:ring-celtic-green focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-celtic-green mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-2 border border-celtic-gold/20 rounded-md focus:ring-2 focus:ring-celtic-green focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className={`w-full bg-celtic-green text-celtic-gold py-3 px-6 rounded-md transition-colors duration-300 ${
            status === 'sending' 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-celtic-brown'
          }`}
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && (
          <p className="text-green-600 text-center">Message sent successfully!</p>
        )}
        
        {status === 'error' && (
          <p className="text-red-600 text-center">Failed to send message. Please try again.</p>
        )}
      </div>
    </form>
  );
};