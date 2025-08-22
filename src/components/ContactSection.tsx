import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="w-full bg-portfolio-yellow py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-portfolio-black mb-12">
          Get in Touch
        </h2>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg border-4 border-portfolio-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <form
            action="https://formspree.io/f/xyzprkoe"
            method="POST"
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-portfolio-black mb-2"
              >
                Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                className="border-2 border-portfolio-black rounded-md px-4 py-3 text-lg focus:ring-portfolio-pink focus:border-portfolio-pink shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-portfolio-black mb-2"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="border-2 border-portfolio-black rounded-md px-4 py-3 text-lg focus:ring-portfolio-pink focus:border-portfolio-pink shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-lg font-medium text-portfolio-black mb-2"
              >
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Your message..."
                rows={5}
                className="border-2 border-portfolio-black rounded-md px-4 py-3 text-lg focus:ring-portfolio-pink focus:border-portfolio-pink shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-portfolio-pink text-white border-4 border-portfolio-black rounded-lg px-8 py-4 text-xl font-bold hover:bg-portfolio-pink/80 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center space-x-2"
            >
              <Mail className="w-6 h-6" />
              <span>Send Message</span>
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
