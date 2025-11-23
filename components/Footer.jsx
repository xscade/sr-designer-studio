import { Button } from "./ui/Button";
import { Instagram, Facebook, Linkedin, Twitter, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-sr-black text-white w-full max-w-[150vw] px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col justify-center min-h-[80vh]">
        {/* Final CTA */}
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight font-serif">
            Ready to transform <br /> your space?
          </h2>
          <Button variant="primary" size="lg" className="h-16 px-10 text-lg rounded-full shadow-glow bg-sr-orange hover:bg-orange-600">
            Book Your Consultation
          </Button>
        </div>

        <div className="border-t border-white/10 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-6 font-serif">SR Designer Studio</h3>
              <p className="text-gray-400 max-w-sm mb-6 text-lg">
                Elevating lifestyles in Visakhapatnam through thoughtful, luxury interior design and architectural excellence.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg font-serif">Services</h4>
              <ul className="space-y-4 text-gray-400 text-lg">
                <li><a href="#" className="hover:text-sr-orange transition-colors">Architectural Design</a></li>
                <li><a href="#" className="hover:text-sr-orange transition-colors">Interior Styling</a></li>
                <li><a href="#" className="hover:text-sr-orange transition-colors">Sustainable Living</a></li>
                <li><a href="#" className="hover:text-sr-orange transition-colors">Commercial Spaces</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg font-serif">Company</h4>
              <ul className="space-y-4 text-gray-400 text-lg">
                <li><a href="#" className="hover:text-sr-orange transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-sr-orange transition-colors">Portfolio</a></li>
                <li><a href="#" className="hover:text-sr-orange transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-sr-orange transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} SR Designer Studio. All rights reserved.</p>
            <div className="flex items-center gap-1 mt-4 md:mt-0">
              <span>Built by</span>
              <a href="https://www.xscade.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-sr-orange transition-colors font-medium flex items-center gap-1">
                 Xscade <Heart className="w-3 h-3 text-sr-red fill-sr-red" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
