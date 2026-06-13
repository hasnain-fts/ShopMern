import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Lock } from "lucide-react";

const cartItems = [
  { _id: "1", name: "Classic White Shirt", price: 29.99, quantity: 1, size: "M", imageURL: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400" },
  { _id: "2", name: "Slim Fit Jeans", price: 49.99, quantity: 2, size: "L", imageURL: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400" },
  { _id: "3", name: "Running Sneakers", price: 79.99, quantity: 1, size: "42", imageURL: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
];

const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
const shipping = 5.99;
const tax = subtotal * 0.1;
const total = subtotal + shipping + tax;

function InputField({ label, placeholder, type = "text", half = false }) {
  return (
    <div className={half ? "flex-1" : "w-full"}>
      <label className="text-xs uppercase tracking-widest text-gray-500 mb-1 block">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black transition-colors bg-white"
      />
    </div>
  );
}

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);

  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-12">

          {/* Page Title */}
          <h1 className="text-2xl font-bold uppercase tracking-widest mb-10 text-center">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* ── Left — Forms ── */}
            <div className="flex flex-col gap-8">

              {/* Contact */}
              <div>
                <h2 className="text-sm uppercase tracking-widest font-medium mb-4 pb-2 border-b border-gray-200">
                  Contact Information
                </h2>
                <div className="flex flex-col gap-4">
                  <InputField label="Email Address" placeholder="john@example.com" type="email" />
                  <InputField label="Phone Number" placeholder="+92 300 0000000" type="tel" />
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="text-sm uppercase tracking-widest font-medium mb-4 pb-2 border-b border-gray-200">
                  Shipping Address
                </h2>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <InputField label="First Name" placeholder="John" half />
                    <InputField label="Last Name" placeholder="Doe" half />
                  </div>
                  <InputField label="Address" placeholder="123 Main Street" />
                  <InputField label="Apartment, Suite, etc. (optional)" placeholder="Apt 4B" />
                  <div className="flex gap-4">
                    <InputField label="City" placeholder="Lahore" half />
                    <InputField label="Postal Code" placeholder="54000" half />
                  </div>
                  {/* Country Select */}
                  <div>
                    <label className="text-xs uppercase tracking-widest text-gray-500 mb-1 block">
                      Country
                    </label>
                    <select className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-black transition-colors bg-white">
                      <option>Pakistan</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>UAE</option>
                      <option>Canada</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div>
                <h2 className="text-sm uppercase tracking-widest font-medium mb-4 pb-2 border-b border-gray-200">
                  Shipping Method
                </h2>
                <div className="flex flex-col gap-3">
                  {[
                    { id: "standard", label: "Standard Shipping", time: "5-7 Business Days", price: "$5.99" },
                    { id: "express", label: "Express Shipping", time: "2-3 Business Days", price: "$12.99" },
                    { id: "overnight", label: "Overnight Shipping", time: "Next Business Day", price: "$24.99" },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className="flex items-center justify-between border border-gray-200 px-4 py-3 cursor-pointer hover:border-black transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          defaultChecked={method.id === "standard"}
                          className="accent-black"
                        />
                        <div>
                          <p className="text-sm font-medium">{method.label}</p>
                          <p className="text-xs text-gray-400">{method.time}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium">{method.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-sm uppercase tracking-widest font-medium mb-4 pb-2 border-b border-gray-200">
                  Payment Method
                </h2>

                {/* Payment Tabs */}
                <div className="flex gap-3 mb-4">
                  {[
                    { id: "card", label: "Credit / Debit Card" },
                    { id: "cod", label: "Cash on Delivery" },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex-1 py-2.5 text-xs uppercase tracking-widest border transition-all ${
                        paymentMethod === method.id
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-gray-200 hover:border-black"
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>

                {/* Card Fields */}
                {paymentMethod === "card" && (
                  <div className="flex flex-col gap-4">
                    <InputField label="Card Number" placeholder="1234 5678 9012 3456" />
                    <InputField label="Name on Card" placeholder="John Doe" />
                    <div className="flex gap-4">
                      <InputField label="Expiry Date" placeholder="MM / YY" half />
                      <InputField label="CVV" placeholder="123" half />
                    </div>
                  </div>
                )}

                {/* COD Message */}
                {paymentMethod === "cod" && (
                  <div className="bg-gray-50 border border-gray-200 px-4 py-4">
                    <p className="text-sm text-gray-600">
                      Pay with cash when your order is delivered. Additional charges may apply.
                    </p>
                  </div>
                )}
              </div>

              {/* Place Order Button */}
              <Button className="w-full bg-black text-white text-xs uppercase tracking-widest py-6 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <Lock size={14} />
                Place Order — ${total.toFixed(2)}
              </Button>

              <p className="text-xs text-gray-400 text-center">
                By placing your order you agree to our{" "}
                <span className="underline cursor-pointer">Terms of Service</span> and{" "}
                <span className="underline cursor-pointer">Privacy Policy</span>
              </p>

            </div>

            {/* ── Right — Order Summary ── */}
            <div>
              <div className="bg-white border border-gray-200 p-6 sticky top-28">

                {/* Toggle on mobile */}
                <button
                  className="w-full flex items-center justify-between mb-4 lg:cursor-default"
                  onClick={() => setOrderSummaryOpen(!orderSummaryOpen)}
                >
                  <h2 className="text-sm uppercase tracking-widest font-medium">
                    Order Summary ({cartItems.length} items)
                  </h2>
                  <ChevronDown
                    size={16}
                    className={`lg:hidden transition-transform ${orderSummaryOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Items */}
                <div className={`flex flex-col gap-4 ${orderSummaryOpen ? "block" : "hidden lg:block"}`}>
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex gap-4">
                      {/* Image */}
                      <div className="relative w-20 h-24 flex-shrink-0 bg-gray-100">
                        <img
                          src={item.imageURL}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {/* Quantity Badge */}
                        <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-sm font-medium uppercase tracking-wide">{item.name}</p>
                          <p className="text-xs text-gray-400 mt-1">Size: {item.size}</p>
                        </div>
                        <p className="text-sm font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Divider */}
                  <div className="border-t border-gray-200 pt-4 mt-2 flex flex-col gap-3">

                    {/* Promo Code */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo code"
                        className="flex-1 border border-gray-200 px-3 py-2 text-xs outline-none focus:border-black transition-colors"
                      />
                      <button className="bg-black text-white text-xs uppercase tracking-widest px-4 hover:bg-gray-800 transition-colors">
                        Apply
                      </button>
                    </div>

                    {/* Totals */}
                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Tax (10%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-3 mt-1">
                        <span className="uppercase tracking-widest">Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Checkout;