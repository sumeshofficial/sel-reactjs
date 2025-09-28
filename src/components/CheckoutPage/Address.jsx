const Address = ({ register, errors }) => {
  return (
    <div className="w-full bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mt-8">Shopping Address</h2>

      {/* First Row */}
      <div className="flex flex-col md:flex-row gap-5 mt-6">
        <div className="flex flex-col flex-1">
          <label className="mb-1 font-medium">First Name*</label>
          <input
            type="text"
            {...register("firstName", {
              required: "First name is required",
              pattern: { value: /\S/, message: "First name cannot be empty" },
              minLength: { value: 3, message: "At least 3 characters" },
            })}
            placeholder="First Name"
            className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-violet-500"
          />
          {errors.firstName && (
          <p className="text-red-500">{errors.firstName.message}</p>
        )}
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-1 font-medium">Last Name*</label>
          <input
            {...register("lastName", {
              required: "Last Name is required",
              pattern: { value: /\S/, message: "Last Name cannot be empty" },
            })}
            type="text"
            placeholder="Last Name"
            className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-violet-500"
          />
          {errors.lastName && (
          <p className="text-red-500">{errors.lastName.message}</p>
        )}
        </div>
      </div>

      {/* Second Row */}
      <div className="flex flex-col md:flex-row gap-5 mt-6">
        <div className="flex flex-col flex-1">
          <label className="mb-1 font-medium">Email*</label>
          <input
            type="text"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /\S/, message: "Email cannot be empty" },
            })}
            placeholder="Email"
            className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-violet-500"
          />
          {errors.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-1 font-medium">Phone number*</label>
          <input
            type="number"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Phone number must contain only digits",
              },
              minLength: {
                value: 10,
                message: "Phone number must be at least 10 digits",
              },
              maxLength: {
                value: 15,
                message: "Phone number cannot exceed 15 digits",
              },
            })}
            placeholder="Phone Number"
            className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-violet-500"
          />
          {errors.phone && (
          <p className="text-red-500">{errors.phone.message}</p>
        )}
        </div>
      </div>

      {/* Third Row */}
      <div className="flex flex-col md:flex-row gap-5 mt-6">
        <div className="flex flex-col flex-1">
          <label className="mb-1 font-medium">State*</label>
          <input
            type="text"
            {...register("state", {
              required: "State is required",
              pattern: { value: /\S/, message: "State cannot be empty" },
            })}
            placeholder="State"
            className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-violet-500"
          />
          {errors.state && (
          <p className="text-red-500">{errors.state.message}</p>
        )}
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-1 font-medium">City*</label>
          <input
            type="text"
            {...register("city", {
              required: "City is required",
              pattern: { value: /\S/, message: "City cannot be empty" },
            })}
            placeholder="City"
            className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-violet-500"
          />
          {errors.city && (
          <p className="text-red-500">{errors.city.message}</p>
        )}
        </div>
        <div className="flex flex-col flex-1">
          <label className="mb-1 font-medium">Zip Code*</label>
          <input
            {...register("zipcode", {
              required: "Zip Code is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Zip Code must contain only digits",
              },
              minLength: {
                value: 5,
                message: "Zip Code must be at least 5 digits",
              },
              maxLength: {
                value: 6,
                message: "Zip Code cannot exceed 6 digits",
              },
            })}
            type="number"
            placeholder="Zip Code"
            className="border-2 border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-violet-500"
          />
          {errors.zipcode && (
          <p className="text-red-500">{errors.zipcode.message}</p>
        )}
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
              value={0}
              {...register("shippingMethod")}
              className="accent-black w-5 h-5"
              defaultChecked
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
              value={80}
              {...register("shippingMethod")}
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
