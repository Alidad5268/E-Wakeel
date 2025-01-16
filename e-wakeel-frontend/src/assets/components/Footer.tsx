

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 border-t border-gray-200 p-8 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <div>
          <h2 className="text-xl font-bold mb-2">E-Wakeel</h2>
          <p className="text-gray-500">Law For Everyone</p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li className="hover:text-[#3498DB] cursor-pointer">Home</li>
            <li className="hover:text-[#3498DB] cursor-pointer">Legal Consultation</li>
            <li className="hover:text-[#3498DB] cursor-pointer">Advocate Services</li>
            <li className="hover:text-[#3498DB] cursor-pointer">Contact Us</li>
            <li className="hover:text-[#3498DB] cursor-pointer">Privacy Policy</li>
            <li className="hover:text-[#3498DB] cursor-pointer">Terms of Service</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Social Media</h4>
          <ul className="space-y-2">
            <li className="hover:text-[#3498DB] cursor-pointer">Facebook</li>
            <li className="hover:text-[#3498DB] cursor-pointer">Twitter</li>
            <li className="hover:text-[#3498DB] cursor-pointer">LinkedIn</li>
            <li className="hover:text-[#3498DB] cursor-pointer">Instagram</li>
          </ul>
        </div>

        <div>
          <p>For support, email us at <a href="mailto:support@ewakeel.com" className="text-[#3498DB]">support@ewakeel.com</a> or call <span className="text-[#3498DB]">+92-123-4567890</span>.</p>
        </div>
      </div>

      <div className="text-center mt-8 text-gray-400 text-sm">
        © 2024. E-Wakeel. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
