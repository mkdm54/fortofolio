import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast"; // Mengimpor utilitas toast

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Mencegah pengiriman formulir default
    setIsSubmitting(true);

    const formId = "xyzprkoe"; // ID Formspree Anda
    const url = `https://formspree.io/f/${formId}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Mengatur tipe konten ke JSON
          Accept: "application/json", // Memberi tahu server bahwa kita menerima JSON
        },
        body: JSON.stringify({ name, email, message }), // Mengirim data sebagai JSON
      });

      if (response.ok) {
        showSuccess("Pesan Anda berhasil terkirim!");
        setName(""); // Mengosongkan input setelah berhasil
        setEmail("");
        setMessage("");
      } else {
        const data = await response.json();
        showError(data.error || "Gagal mengirim pesan. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showError("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full bg-white py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-portfolio-black mb-12">
          Get in Touch
        </h2>
        <div className="max-w-2xl mx-auto bg-portfolio-yellow p-8 rounded-none border-4 border-portfolio-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                className="border-2 border-portfolio-black rounded-none px-4 py-3 text-lg focus:ring-portfolio-pink focus:border-portfolio-pink shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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
                className="border-2 border-portfolio-black rounded-none px-4 py-3 text-lg focus:ring-portfolio-pink focus:border-portfolio-pink shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                className="border-2 border-portfolio-black rounded-none px-4 py-3 text-lg focus:ring-portfolio-pink focus:border-portfolio-pink shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-send-message-purple text-white border-4 border-portfolio-black rounded-none px-8 py-4 text-xl font-bold hover:bg-send-message-purple/80 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center space-x-2"
              disabled={isSubmitting} // Nonaktifkan tombol saat sedang mengirim
            >
              <Mail className="w-6 h-6" />
              <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
