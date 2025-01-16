const ConsultationProcess = () => {
  return (
    <div>
      <h1 className="text-[#E74C3C] text-3xl font-semibold my-10">
        Legal Consultation Process
      </h1>
      <div className="md:mx-12">
        <p className="text-gray-800 mb-10">
          Get legal advice and support in just three easy steps.
        </p>

        <div className="flex justify-around items-center bg-[#f3f8fc] rounded-lg p-8 relative overflow-hidden arrow-bg flex-wrap gap-10 sm:flex-nowrap">
          <div className="relative text-center text-gray-800">
            <h3 className="text-[#3498DB] font-bold text-lg mb-1">Step 1</h3>
            <p className="font-semibold">Ask a Question</p>
            <span className="text-gray-600 text-sm">
              Type your legal question in any language you prefer.
            </span>
          </div>

          <div className="relative text-center text-gray-800">
            <h3 className="text-[#3498DB] font-bold text-lg mb-1">Step 2</h3>
            <p className="font-semibold">Get Instant Advice</p>
            <span className="text-gray-600 text-sm">
              Receive a personalized response from our AI chatbot.
            </span>
          </div>

          <div className="relative text-center text-gray-800">
            <h3 className="text-[#3498DB] font-bold text-lg mb-1">Step 3</h3>
            <p className="font-semibold">Connect with Advocates</p>
            <span className="text-gray-600 text-sm">
              If needed, get in touch with experienced advocates for more
              detailed legal help.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationProcess;
