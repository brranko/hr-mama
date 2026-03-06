import React from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone } from 'lucide-react';
import './Contact.css';

export default function Contact() {
    return (
        <section className="contact-section" id="contact">
            <div className="container contact-container">

                <motion.div
                    className="contact-info"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="section-badge glass-panel text-gradient">
                        Connect
                    </div>
                    <h2 className="section-title">
                        Let's build a better <br /><span className="text-gradient">workplace together.</span>
                    </h2>
                    <p className="contact-desc">
                        Whether you need a complete HR overhaul or just some strategic advice,
                        we're here to listen and help your team thrive.
                    </p>

                    <div className="contact-methods">
                        <div className="method-item">
                            <div className="method-icon-wrapper">
                                <Mail size={20} />
                            </div>
                            <div className="method-text">
                                <span className="method-label">Email</span>
                                <a href="mailto:hello@hrmama.com" className="method-value">hello@hrmama.com</a>
                            </div>
                        </div>

                        <div className="method-item">
                            <div className="method-icon-wrapper">
                                <Phone size={20} />
                            </div>
                            <div className="method-text">
                                <span className="method-label">Phone</span>
                                <span className="method-value">(555) 123-4567</span>
                            </div>
                        </div>

                        <div className="method-item">
                            <div className="method-icon-wrapper">
                                <MapPin size={20} />
                            </div>
                            <div className="method-text">
                                <span className="method-label">Location</span>
                                <span className="method-value">Stockholm, Sweden (Remote globally)</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="contact-form-wrapper glass-panel"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="John Doe" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="john@company.com" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">How can we help?</label>
                            <textarea id="message" rows="4" placeholder="Tell us about your HR needs..."></textarea>
                        </div>

                        <button className="btn btn-primary form-submit" type="submit">
                            Send Message <Send size={18} />
                        </button>
                    </form>
                </motion.div>

            </div>
        </section>
    );
}
