import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-3 font-sans text-xs text-center bg-primary text-secondary">
      <div>
        <a href="/about" className="hover:text-golden">
          Qui sommes-nous?
        </a>{" "}
        |
        <a href="/contact" className="hover:text-golden">
          Nous contacter
        </a>
      </div>
      <div>Mentions légales</div>
      <div>YachtHaven © 2024</div>
      <a target="_blank" href="https://www.instagram.com/yachthavenoff/">
        <Instagram color="white" size={24} />
      </a>
    </footer>
  );
};

export default Footer;
