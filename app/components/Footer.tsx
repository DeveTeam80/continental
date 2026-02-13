import { Facebook, Linkedin, Instagram, Youtube } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-secondary text-secondary py-8 border-t border-secondary/10">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-4xl font-serif mb-8 text-primary">
            The Continental Group
          </h3>
          <p className="text-white max-w-md leading-relaxed">
            Continental Group is a community-first, legacy-driven real estate
            developer focused on trust, transparency, and long-term value.
          </p>
        </div>

        {/* Contact Numbers */}
        <div>
          <h4 className="uppercase text-xs tracking-[0.3em] text-primary mb-6">
            Call Us On
          </h4>
          <p className="text-white leading-relaxed">
            +91 (22) 6646 5253
            <br />
            +91 98007 25353
          </p>
        </div>

        {/* Email + Social */}
        <div>
          <h4 className="uppercase text-xs tracking-[0.3em] text-primary mb-6">
            Email Us
          </h4>
          <p className="text-white leading-relaxed">
             wecare@continental-group.in
          </p>

          {/* Social Media */}
          <div className="mt-8">
            <span className="block uppercase text-xs tracking-[0.3em] text-primary mb-4">
              Follow Us
            </span>
            <div className="flex gap-5">
              <a
                href="#"
                aria-label="Facebook"
                className="text-white hover:text-primary transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-white hover:text-primary transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-white hover:text-primary transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="text-white hover:text-primary transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-6 lg:px-12 mt-4 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] uppercase tracking-widest text-white/50">
          © 2026 The Continental Group. All rights reserved.
        </p>

        <p className="text-[10px] uppercase tracking-widest text-white/50 text-center max-w-xl">
          Corporate Address: SAKHAR BHAVAN, 9th Floor, Ramnath Goenka Marg,
          Nariman Point, Mumbai, Maharashtra 400021
        </p>

        <p className="text-[10px] uppercase tracking-widest text-white/50">
          Designed & Developed by{" "}
          <a
            href="https://www.visionarybizz.com/"
            className="hover:text-primary transition-colors"
          >
            Visionary Services
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
