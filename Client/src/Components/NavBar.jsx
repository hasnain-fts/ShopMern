import { ShoppingCart, Search, User, Menu, Heart, X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const cartItems = [
  { _id: "1", name: "Classic White Shirt", price: 29.99, quantity: 1, imageURL: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400", size: "M" },
  { _id: "2", name: "Slim Fit Jeans", price: 49.99, quantity: 2, imageURL: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", size: "L" },
  { _id: "3", name: "Running Sneakers", price: 79.99, quantity: 1, imageURL: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400", size: "42" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen]     = useState(false);
  const [profileOpen , setProfileOpen] = useState(false);

  const cartCount = cartItems.length;
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate()

  return (
    <>
      <header className="sticky top-0 z-50">

        {/* ── Announcement Bar ── */}
        <div className="bg-black text-white text-center text-xs py-2.5 tracking-widest font-medium uppercase">
          Free Shipping on Orders Above Rs. 2500
        </div>

        {/* ── Main Navbar ── */}
        <nav className="w-full bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">

            {/* Logo */}
            <div className="text-2xl font-bold tracking-widest text-black uppercase">
              ShopMern
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-8 text-xs font-medium text-black tracking-widest uppercase">
              <a href="/" className="hover:text-gray-400 transition-colors">Woman</a>
              <a href="/man" className="hover:text-gray-400 transition-colors">Man</a>
              <a href="/shoes" className="hover:text-gray-400 transition-colors">Shoes</a>
              <a href="/accessories" className="hover:text-gray-400 transition-colors">Accessories</a>
              <a href="/clearance" className="hover:text-gray-400 transition-colors">Clearance</a>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-1">

              {/* Search */}
              <Button
                variant="ghost" size="icon"
                className="text-black hover:text-gray-400 hover:bg-gray-100"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <Search size={18} />
              </Button>

              {/* Wishlist */}
              <Button variant="ghost" size="icon" className="text-black hover:text-gray-400 hover:bg-gray-100">
                <Heart size={18} />
              </Button>

              {/* Profile */}
              <Button 
                variant="ghost" size="icon" className="text-black hover:text-gray-400 hover:bg-gray-100"
                onClick={() => {setProfileOpen(!profileOpen)}}
                >
                <User size={18} />
              </Button>

              {/* Cart */}
              <Button
                variant="ghost" size="icon"
                className="relative text-black hover:text-gray-400 hover:bg-gray-100"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs bg-black text-white">
                    {cartCount}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu */}
              <Button
                variant="ghost" size="icon"
                className="md:hidden text-black hover:bg-gray-100"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Menu size={18} />
              </Button>

            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="border-t border-gray-200 px-6 py-3 bg-white">
              <div className="max-w-7xl mx-auto flex items-center gap-2">
                <Search size={16} className="text-gray-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search products..."
                  className="w-full outline-none text-sm text-black placeholder-gray-400 bg-transparent"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-xs text-gray-400 hover:text-black uppercase tracking-widest"
                >
                  Close
                </button>
              </div>
            </div>
          )}
          {/* {profile modal} */}
          {/* ── Profile Modal ── */}
{profileOpen && (
  <>
    {/* Backdrop */}
    <div
      className="fixed inset-0 bg-black/40 z-40"
      onClick={() => setProfileOpen(false)}
    />
    
    {/* Modal */}
    <div className="fixed top-20 right-6 z-50 w-72 bg-white border border-gray-200 shadow-lg">
      
      {/* Header */}
      <div className="border-b border-gray-200 px-5 py-3 flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest font-medium">
          My Account
        </span>
        <button
          onClick={() => setProfileOpen(false)}
          className="text-black hover:text-gray-400 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* User Info */}
      <div className="px-5 py-4 text-center border-b border-gray-200">
        <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-2">
          <User size={20} />
        </div>
        <p className="text-sm font-medium">Guest User</p>
        <p className="text-xs text-gray-400 mt-0.5">Not signed in</p>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        <button className="w-full text-left px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors">
          My Orders
        </button>
        <button className="w-full text-left px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors">
          Wishlist
        </button>
        <button className="w-full text-left px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors">
          Address Book
        </button>
        <button className="w-full text-left px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors">
          Settings
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Sign Out & Sign In */}
      <div className="py-2">
        <button className="w-full text-left px-5 py-2.5 text-xs uppercase tracking-widest text-red-500 hover:bg-gray-100 transition-colors">
          Sign Out
        </button>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 px-5 py-3">
        <Button className="w-full bg-black text-white text-xs uppercase tracking-widest py-2 hover:bg-gray-800" onClick={() => {navigate("/Login")}}>
          Sign In / Register
        </Button>
      </div>

    </div>
  </>
)}

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden border-t border-gray-200 px-6 py-4 flex flex-col gap-4 bg-white text-xs font-medium text-black tracking-widest uppercase">
              <a href="/" className="hover:text-gray-400 transition-colors">Woman</a>
              <a href="/man" className="hover:text-gray-400 transition-colors">Man</a>
              <a href="/shoes" className="hover:text-gray-400 transition-colors">Shoes</a>
              <a href="/accessories" className="hover:text-gray-400 transition-colors">Accessories</a>
              <a href="/clearance" className="hover:text-gray-400 transition-colors">Clearance</a>
            </div>
          )}
        </nav>
      </header>

      {/* ── Cart Drawer ── */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">

          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setCartOpen(false)}
          />

          {/* Drawer */}
          <div className="relative w-full max-w-sm bg-white h-full flex flex-col shadow-xl">

            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-5 flex items-center justify-between">
              <span className="text-sm uppercase tracking-widest font-medium">
                Your Cart ({cartCount})
              </span>
              <button
                onClick={() => setCartOpen(false)}
                className="text-black hover:text-gray-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={48} className="text-gray-300" />
                  <p className="text-sm uppercase tracking-widest text-gray-400">
                    Your cart is empty
                  </p>
                  <Button
                    onClick={() => setCartOpen(false)}
                    className="bg-black text-white text-xs uppercase tracking-widest hover:bg-gray-800"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4">

                    {/* Image */}
                    <div className="w-24 h-28 flex-shrink-0 overflow-hidden bg-gray-100">
                      <img
                        src={item.imageURL}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-sm font-medium uppercase tracking-wide">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">
                          Size: {item.size}
                        </p>
                        <p className="text-sm font-semibold mt-1">
                          ${item.price}
                        </p>
                      </div>

                      {/* Quantity + Remove */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-200">
                          <button className="px-2 py-1 hover:bg-gray-100 transition-colors">
                            <Minus size={12} />
                          </button>
                          <span className="px-3 py-1 text-xs border-x border-gray-200">
                            {item.quantity}
                          </span>
                          <button className="px-2 py-1 hover:bg-gray-100 transition-colors">
                            <Plus size={12} />
                          </button>
                        </div>
                        <button className="text-xs uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                          Remove
                        </button>
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 px-6 py-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-gray-500">Subtotal</span>
                  <span className="text-sm font-semibold">${total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-400">
                  Shipping and taxes calculated at checkout.
                </p>
                <Button className="w-full bg-black text-white text-xs uppercase tracking-widest py-5 hover:bg-gray-800">
                  Checkout
                </Button>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-xs uppercase tracking-widest text-center text-gray-400 hover:text-black transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}