import { Upload, FileText, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { uploadAadhaar } from '../axios/axios';
const AadhaarOcr = () => {
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);

  const [parsedData, setParsedData] = useState<any>({
    aadhaarNumber: "",
    name: "",
    dob: "",
    gender: "",
    address: "",
    pincode: ""
  });
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleParse = async () => {
    if (!frontFile || !backFile) {
      alert("Please upload both front and back images of the Aadhaar card.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("front", frontFile);
      formData.append("back", backFile);

      const response = await uploadAadhaar(formData);
      
      setParsedData({
        aadhaarNumber: response.data.aadhaarNumber || "",
        name: response.data.name || "",
        dob: response.data.dob || "",
        gender: response.data.gender || "",
        address: response.data.address || "",
        pincode: response.data.pincode || ""
      });
      
      setApiResponse(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("Error parsing Aadhaar:", error);
      setApiResponse(JSON.stringify({ error: "Failed to parse Aadhaar card" }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight flex items-center justify-center gap-3">
            <FileText className="text-blue-600 w-10 h-10" />
            Aadhaar OCR System
          </h1>
          <p className="text-gray-500 mt-2 text-lg">Upload your Aadhaar card for instant automated data extraction</p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Panel - Upload Section */}
          <div className="space-y-6">
            
            {/* Front Side Upload */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Aadhaar Front
              </h2>
              
              <label className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-blue-50 hover:border-blue-400 transition-colors cursor-pointer group block">
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/png, image/jpeg, image/jpg" 
                  onChange={(e) => setFrontFile(e.target.files?.[0] || null)} 
                />
                <div className="bg-blue-50 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8" />
                </div>
                <p className="text-gray-700 font-medium text-lg mb-1">
                  {frontFile ? frontFile.name : "Click or drag image to upload"}
                </p>
                <p className="text-gray-400 text-sm">PNG, JPG, JPEG up to 5MB</p>
              </label>

              {/* Preview Placeholder */}
              {frontFile && (
                <div className="mt-4 bg-gray-50 rounded-lg p-2 border border-gray-200 flex justify-center">
                  <img src={URL.createObjectURL(frontFile)} alt="Front Preview" className="max-h-48 rounded shadow-sm" />
                </div>
              )}
            </div>

            {/* Back Side Upload */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Aadhaar Back
              </h2>
              
              <label className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-blue-50 hover:border-blue-400 transition-colors cursor-pointer group block">
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/png, image/jpeg, image/jpg" 
                  onChange={(e) => setBackFile(e.target.files?.[0] || null)} 
                />
                <div className="bg-blue-50 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8" />
                </div>
                <p className="text-gray-700 font-medium text-lg mb-1">
                  {backFile ? backFile.name : "Click or drag image to upload"}
                </p>
                <p className="text-gray-400 text-sm">PNG, JPG, JPEG up to 5MB</p>
              </label>

              {/* Preview Placeholder */}
              {backFile && (
                <div className="mt-4 bg-gray-50 rounded-lg p-2 border border-gray-200 flex justify-center">
                  <img src={URL.createObjectURL(backFile)} alt="Back Preview" className="max-h-48 rounded shadow-sm" />
                </div>
              )}
            </div>

            {/* Action Button */}
            <button
              onClick={handleParse}
              disabled={loading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
              <CheckCircle2 className="w-6 h-6" />
              {loading ? "PARSING..." : "PARSE AADHAAR"}
            </button>

          </div>

          {/* Right Panel - Results Section */}
          <div className="space-y-6">
            
            {/* Parsed Data Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-3">Parsed Data</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Aadhaar Number</label>
                  <input type="text" readOnly value={parsedData.aadhaarNumber} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 font-medium focus:outline-none" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Name</label>
                    <input type="text" readOnly value={parsedData.name} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Gender</label>
                    <input type="text" readOnly value={parsedData.gender} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Date of Birth</label>
                  <input type="text" readOnly value={parsedData.dob} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Address</label>
                  <textarea readOnly value={parsedData.address} rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none resize-none"></textarea>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Pincode</label>
                  <input type="text" readOnly value={parsedData.pincode} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none" />
                </div>
              </div>
            </div>

            {/* API Response Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-shadow hover:shadow-md flex flex-col h-full">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex justify-between items-center">
                API Response
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded uppercase tracking-wider">200 OK</span>
              </h2>
              
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto flex-grow">
                <pre className="text-green-400 font-mono text-sm leading-relaxed">
                  <code>{apiResponse || "{\n  // API response will appear here\n}"}</code>
                </pre>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AadhaarOcr;
