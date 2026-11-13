import { useState } from "react";
import { Briefcase, Heart, Sparkles, Star, ArrowRight } from "lucide-react";
import { getWhatsAppLink } from "../lib/whatsapp";
import { Button } from "../components/ui/Button";

export function Careers() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: "Nail Technician",
    experience: "",
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Hello Blasuu Lounge! I would like to apply for a position.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Role:* ${formData.role}\n*Experience:* ${formData.experience}\n\nPlease let me know the next steps!`;

    window.location.href = getWhatsAppLink(message);
  };

  return (
    <div className="min-h-screen bg-white-pure">
      {/* Hero Section */}
      <div className="py-24 bg-elephant text-white-pure text-center px-4">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
            <Briefcase size={32} className="text-gold" />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 text-white-pure">
            Join Our Team
          </h1>
          <p className="text-lg md:text-xl text-elephant-light leading-relaxed">
            We are always looking for passionate, talented individuals to help
            us create unforgettable beauty experiences. Grow your career with
            Blasuu Beauty Lounge.
          </p>
        </div>
      </div>

      {/* Why Work With Us */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif mb-4">Why Work With Us?</h2>
          <p className="text-elephant-muted">
            We believe in nurturing talent and creating a supportive
            environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 rounded-3xl bg-white-pure border border-black/5 shadow-sm">
            <div className="w-16 h-16 mx-auto bg-burnt/10 rounded-full flex items-center justify-center text-burnt mb-6">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-serif mb-3">Supportive Culture</h3>
            <p className="text-elephant-muted text-sm leading-relaxed">
              We foster a positive, uplifting environment where everyone feels
              valued and respected.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white-pure border border-black/5 shadow-sm">
            <div className="w-16 h-16 mx-auto bg-burnt/10 rounded-full flex items-center justify-center text-burnt mb-6">
              <Sparkles size={32} />
            </div>
            <h3 className="text-xl font-serif mb-3">Continuous Growth</h3>
            <p className="text-elephant-muted text-sm leading-relaxed">
              Access to ongoing training, premium products, and opportunities to
              advance your skills.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white-pure border border-black/5 shadow-sm">
            <div className="w-16 h-16 mx-auto bg-burnt/10 rounded-full flex items-center justify-center text-burnt mb-6">
              <Star size={32} />
            </div>
            <h3 className="text-xl font-serif mb-3">Premium Environment</h3>
            <p className="text-elephant-muted text-sm leading-relaxed">
              Work in a beautiful, high-end lounge equipped with the best tools
              and products in the industry.
            </p>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="py-20 bg-white-soft px-4">
        <div className="max-w-2xl mx-auto bg-white-pure p-8 md:p-12 rounded-3xl border border-black/5 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif mb-2">Apply Now</h2>
            <p className="text-elephant-muted">
              Fill out the form below and we will contact you via WhatsApp.
            </p>
          </div>

          <form onSubmit={handleApply} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-elephant mb-2">
                Full Name
              </label>
              <input
                required
                type="text"
                className="w-full p-4 border border-elephant/20 rounded-xl bg-white-soft outline-none focus:border-burnt"
                placeholder="Your name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-elephant mb-2">
                Phone Number
              </label>
              <input
                required
                type="tel"
                className="w-full p-4 border border-elephant/20 rounded-xl bg-white-soft outline-none focus:border-burnt"
                placeholder="Your phone number"
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-elephant mb-2">
                Position Applying For
              </label>
              <select
                className="w-full p-4 border border-elephant/20 rounded-xl bg-white-soft outline-none focus:border-burnt"
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }>
                <option value="Nail Technician">Nail Technician</option>
                <option value="Esthetician/Facialist">
                  Esthetician / Facialist
                </option>
                <option value="Massage Therapist">Massage Therapist</option>
                <option value="Lash Artist">Lash Artist</option>
                <option value="Front Desk/Receptionist">
                  Front Desk / Receptionist
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-elephant mb-2">
                Experience & Portfolio (Optional)
              </label>
              <textarea
                rows={4}
                className="w-full p-4 border border-elephant/20 rounded-xl bg-white-soft outline-none focus:border-burnt"
                placeholder="Tell us a bit about your experience or drop a link to your work..."
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
              />
            </div>

            <Button
              type="submit"
              className="w-full py-4 text-lg flex items-center justify-center gap-2">
              Submit Application <ArrowRight size={20} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
