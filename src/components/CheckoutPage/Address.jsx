const Address = () => {
  return (
    <div className="w-full bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mt-8">Shopping Address</h2>

      {/* First Row */}
      <div className="flex flex-col md:flex-row gap-5 mt-6">
        <div className="flex flex-col flex-1">
          <label className="mb-1 font-medium">First Name*</label>
          <input
            type="text"
            placeholder="First Name"
            className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-violet-500"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-1 font-medium">Last Name*</label>
          <input
            type="text"
            placeholder="Last Name"
            className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {/* Second Row */}
      <div className="flex flex-col md:flex-row gap-5 mt-6">
        <div className="flex flex-col flex-1">
          <label className="mb-1 font-medium">Email*</label>
          <input
            type="text"
            placeholder="Email"
            className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-violet-500"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-1 font-medium">Phone number*</label>
          <input
            type="number"
            placeholder="Phone Number"
            className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {/* Third Row */}
      <div className="flex flex-col md:flex-row gap-5 mt-6">
        <div className="flex flex-col flex-1">
          <label className="mb-1 font-medium">State*</label>
          <input
            type="text"
            placeholder="State"
            className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-violet-500"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-1 font-medium">City*</label>
          <input
            type="text"
            placeholder="City"
            className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-violet-500"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-1 font-medium">Zip Code*</label>
          <input
            type="number"
            placeholder="Zip Code"
            className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {/* Shipping Method */}
      <div className="mt-12 mb-10">
        <h2 className="text-xl font-bold mb-4">Shipping Method</h2>

        <div className="flex flex-col md:flex-row gap-5">
          {/* Free Shipping */}
          <label className="flex items-center gap-3 flex-1 border-2 rounded-md border-gray-300 p-4 cursor-pointer">
            <input
              type="radio"
              name="shipping"
              className="accent-black w-5 h-5"
            />
            <div className="w-full">
              <div className="flex justify-between">
                <p className="font-medium">Free Shipping</p>
                <p className="font-medium">₹0</p>
              </div>
              <p className="text-sm text-gray-500">7–20 days</p>
            </div>
          </label>

          {/* Express Shipping */}
          <label className="flex items-center gap-3 flex-1 border-2 rounded-md border-gray-300 p-4 cursor-pointer">
            <input
              type="radio"
              name="shipping"
              className="accent-black w-5 h-5"
            />
            <div className="w-full">
              <div className="flex justify-between">
                <span className="font-medium">Express Shipping</span>
                <span className="font-medium">₹80</span>
              </div>
              <p className="text-sm text-gray-500">1–3 days</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Address;
