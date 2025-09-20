import React, { useState, useEffect } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";
import { toast } from "react-toastify";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const isLive = false;
  const baseUrl = !isLive
    ? "http://localhost:5000"
    : "https://koa-backend-gaqt.onrender.com";

  // ✅ Validation function
  const validateForm = () => {
    let newErrors = {};

    if (!form?.name || form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }

    if (!form?.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form?.phone || !/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!form?.message || form.message.trim().length < 5) {
      newErrors.message = "Message should be at least 5 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle form change + remove errors instantly
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await fetch(`${baseUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const res = await response.json();

      if (!res.success) {
        throw new Error("Failed to send message");
      } else {
        toast.success("Message sent successfully");
        setSuccess(true);
        setForm({ name: "", email: "", phone: "", message: "" });
        setErrors({});
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactCards = [
    {
      icon: FiMail,
      title: "Email Us",
      value: "koadryfruits2025@gmail.com",
    },
    {
      icon: FiPhone,
      title: "Call Us",
      value: "+91-6367465206",
    },
    {
      icon: FiMapPin,
      title: "Visit Us",
      value:
        "G-31-A, Sector 2, VIDHYADHAR ENCLAVE–II, Central Spine, Vidyadhar Nagar, Jaipur, Rajasthan 302039",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 py-6 md:p-10">
        {/* Hero Section */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-6">
            Get In Touch
          </h1>
          <p className="text-gray-600 text-xl mx-auto leading-relaxed">
            Ready to transform your snacking experience? We're here to help with
            questions, feedback, or just a friendly chat about healthy living.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div
          className={`grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {contactCards.map((card) => (
            <div
              key={card.title}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 border border-orange-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <card.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-orange-600 font-medium">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div
          className={`max-w-5xl mx-auto transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-orange-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Send Us a Message
              </h2>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you within 24
                hours
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none transition-all duration-300 ${
                        errors.name
                          ? "border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none transition-all duration-300 ${
                        errors.phone
                          ? "border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                      }`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none transition-all duration-300 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-4 top-6 text-gray-400" />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full pl-12 pr-4 py-4 border rounded-xl focus:outline-none transition-all duration-300 resize-none ${
                      errors.message
                        ? "border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                    }`}
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 text-white rounded-xl py-4 px-8 font-semibold text-lg transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-70"
              >
                <FiSend className="text-xl" />
                {loading ? "Sending..." : "Send Message"}
              </button>

              {success && (
                <div className="text-center mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="text-green-700 font-semibold flex items-center justify-center gap-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    Thank you! We received your message and will respond soon.
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
