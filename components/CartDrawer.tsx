
import React, { useState } from 'react';
import { XIcon, PlusIcon, MinusIcon, TrashIcon, ShoppingCartIcon } from './Icons';
import { Product } from '../data';

export interface CartItem extends Product {
  quantity: number;
}

export interface CheckoutData {
  notes: string;
  contactNumber: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: number, delta: number) => void;
  removeFromCart: (id: number) => void;
  onCheckout: (data: CheckoutData) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, updateQuantity, removeFromCart, onCheckout }) => {
  const [notes, setNotes] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckoutClick = () => {
    onCheckout({ notes, contactNumber });
    setNotes(''); 
    setContactNumber('');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <h2 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
            <ShoppingCartIcon className="w-5 h-5 text-primary-500" />
            Your Cart
            <span className="bg-primary-50 text-primary-700 text-xs px-2.5 py-1 rounded-full font-sans uppercase tracking-wider font-bold">
              {cart.reduce((acc, item) => acc + item.quantity, 0)} items
            </span>
          </h2>
          <button onClick={onClose} aria-label="Close cart" className="text-slate-400 hover:text-slate-700 transition-colors p-2 rounded-full hover:bg-slate-100">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 content-auto">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
              <ShoppingCartIcon className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-base font-medium text-slate-500">Your cart is empty</p>
              <p className="text-xs mt-2 text-slate-400">Start shopping to add items to your collection.</p>
              <button onClick={onClose} className="mt-6 px-6 py-3 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors">
                Start Browsing
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 group animate-in fade-in slide-in-from-bottom-2 duration-500 bg-white">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div>
                    <div className="flex justify-between items-start">
                       <h3 className="font-bold text-sm text-slate-900 line-clamp-1 pr-2">{item.name}</h3>
                       <button 
                        onClick={() => removeFromCart(item.id)} 
                        aria-label={`Remove ${item.name} from cart`}
                        className="text-slate-300 hover:text-red-500 transition-colors p-1"
                       >
                         <TrashIcon className="w-4 h-4" />
                       </button>
                    </div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide font-bold">{item.category}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-slate-200 rounded-md h-8">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2 hover:bg-slate-50 text-slate-500 transition-colors h-full flex items-center"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <MinusIcon className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-slate-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2 hover:bg-slate-50 text-slate-500 transition-colors h-full flex items-center"
                        aria-label="Increase quantity"
                      >
                        <PlusIcon className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-bold text-sm text-slate-900">${item.price * item.quantity}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50 shrink-0 shadow-[0_-4px_15px_-3px_rgba(0,0,0,0.03)]">
            
            {/* Contact Number */}
            <div className="mb-4">
              <label htmlFor="contact-number" className="block text-xs font-bold uppercase text-slate-600 mb-2 tracking-wider">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                id="contact-number"
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="w-full rounded-lg border border-slate-200 bg-white text-sm px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-slate-700 placeholder:text-slate-400 shadow-sm transition-shadow"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>

            {/* Additional Details Text Box */}
            <div className="mb-6">
              <label htmlFor="order-notes" className="block text-xs font-bold uppercase text-slate-600 mb-2 tracking-wider">
                Order Notes
              </label>
              <textarea
                id="order-notes"
                rows={2}
                placeholder="Any special requests?"
                className="w-full rounded-lg border border-slate-200 bg-white text-sm px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow outline-none text-slate-700 placeholder:text-slate-400 resize-none shadow-sm"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Totals */}
            <div className="flex justify-between items-center border-t border-slate-200 pt-4 mb-5">
                <span className="text-sm text-slate-500 font-medium">Estimated Total</span>
                <span className="text-xl font-bold text-slate-900">${total}</span>
            </div>
            
            {/* Checkout Action */}
            <button 
              onClick={handleCheckoutClick}
              disabled={!contactNumber}
              className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-lg transform transition-all duration-200 flex items-center justify-center gap-2 ${
                  contactNumber 
                  ? 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-primary-500/40 hover:-translate-y-0.5' 
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              Submit Enquiry
            </button>
            <p className="text-xs text-center text-slate-400 mt-3">
              Our team will call you to finalize details.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
