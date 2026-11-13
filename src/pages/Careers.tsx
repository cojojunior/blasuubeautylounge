import { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Users,
  CheckCircle,
} from "lucide-react";
import { getWhatsAppLink } from "../lib/whatsapp";
import { Button } from "../components/ui/Button";

export function Careers() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: "Student / Trainee",
    experience: "",
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Hello Blasuu Lounge! I am interested in joining/learning at your academy.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Interest:* ${formData.role}\n*Experience/Goals:* ${formData.experience}\n\nPlease let me know the next steps!`;

    window.location.href = getWhatsAppLink(message);
  };

  return (
    <div className="min-h-screen bg-white-pure">
      {/* Hero Section */}
      <div className="py-24 bg-elephant text-white-pure text-center px-4">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
            <GraduationCap size={32} className="text-gold" />
          </div>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 text-white-pure">
            Learn With Us
          </h1>
          <p className="text-lg md:text-xl text-elephant-light leading-relaxed">
            Whether you are a seasoned professional looking for a new home, or a
            beginner wanting to master the craft, our doors are open. The owner
            personally mentors and trains passionate individuals.
          </p>
        </div>
      </div>

      {/* Why Learn/Work With Us */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif mb-4">Why Join Blasuu?</h2>
          <p className="text-elephant-muted">
            We believe in nurturing talent through hands-on mentorship and a
            supportive environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 rounded-3xl bg-white-pure border border-black/5 shadow-sm">
            <div className="w-16 h-16 mx-auto bg-burnt/10 rounded-full flex items-center justify-center text-burnt mb-6">
              <GraduationCap size={32} />
            </div>
            <h3 className="text-xl font-serif mb-3">Hands-On Mentorship</h3>
            <p className="text-elephant-muted text-sm leading-relaxed">
              Learn directly from the owner and master the techniques that set
              Blasuu apart from the rest.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white-pure border border-black/5 shadow-sm">
            <div className="w-16 h-16 mx-auto bg-burnt/10 rounded-full flex items-center justify-center text-burnt mb-6">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-serif mb-3">Supportive Community</h3>
            <p className="text-elephant-muted text-sm leading-relaxed">
              Join a team that lifts each other up. We grow together, share
              knowledge, and celebrate wins.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white-pure border border-black/5 shadow-sm">
            <div className="w-16 h-16 mx-auto bg-burnt/10 rounded-full flex items-center justify-center text-burnt mb-6">
              <Sparkles size={32} />
            </div>
            <h3 className="text-xl font-serif mb-3">Premium Standards</h3>
            <p className="text-elephant-muted text-sm leading-relaxed">
              Train using top-tier products and learn the hygiene and
              client-care standards of a luxury lounge.
            </p>
          </div>
        </div>
      </div>

      {/* Training Programs Section */}
      <div className="py-20 bg-elephant/5 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif mb-4">Our Programs</h2>
            <p className="text-elephant-muted">
              We offer both employment opportunities and dedicated training
              programs.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white-pure p-6 rounded-2xl border border-black/5 flex items-start gap-4">
              <CheckCircle
                className="text-burnt flex-shrink-0 mt-1"
                size={24}
              />
              <div>
                <h3 className="font-semibold text-lg text-elephant">
                  Beauty Academy / Trainee Program
                </h3>
                <p className="text-sm text-elephant-muted mt-1">
                  Perfect for beginners. Learn nails, lashes, facials, and
                  massage from the ground up with the owner.
                </p>
              </div>
            </div>
            <div className="bg-white-pure p-6 rounded-2xl border border-black/5 flex items-start gap-4">
              <CheckCircle
                className="text-burnt flex-shrink-0 mt-1"
                size={24}
              />
              <div>
                <h3 className="font-semibold text-lg text-elephant">
                  Professional Employment
                </h3>
                <p className="text-sm text-elephant-muted mt-1">
                  Already certified? Join our team as a full-time or part-time
                  beauty specialist.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="py-20 px-4">
        <div className="max-w-2xl mx-auto bg-white-pure p-8 md:p-12 rounded-3xl border border-black/5 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif mb-2">Apply Now</h2>
            <p className="text-elephant-muted">
              Tell us what you want to learn or apply for a job.
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
                I am interested in...
              </label>
              <select
                className="w-full p-4 border border-elephant/20 rounded-xl bg-white-soft outline-none focus:border-burnt"
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }>
                <option value="Student / Trainee">
                  Becoming a Student / Trainee
                </option>
                <option value="Nail Technician Job">
                  Working as a Nail Technician
                </option>
                <option value="Esthetician Job">
                  Working as an Esthetician / Facialist
                </option>
                <option value="Massage Therapist Job">
                  Working as a Massage Therapist
                </option>
                <option value="Lash Artist Job">
                  Working as a Lash Artist
                </option>
                <option value="Front Desk Job">
                  Working at the Front Desk
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-elephant mb-2">
                Experience / Goals
              </label>
              <textarea
                rows={4}
                className="w-full p-4 border border-elephant/20 rounded-xl bg-white-soft outline-none focus:border-burnt"
                placeholder="Are you a beginner? What specific skills do you want to learn? Or tell us about your professional experience..."
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
              />
            </div>

            <Button
              type="submit"
              className="w-full py-4 text-lg flex items-center justify-center gap-2">
              Send Application <ArrowRight size={20} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
