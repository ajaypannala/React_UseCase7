import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useProductStore } from "../stores/productStore";

function Cart() {
  const cart = useProductStore((state) => state.cart);
  const cartTotal = useProductStore((state) => state.getCartTotal());
  const updateCartQuantity = useProductStore((state) => state.updateCartQuantity);
  const removeFromCart = useProductStore((state) => state.removeFromCart);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-7">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600">Your order</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Shopping Cart</h1>
            <p className="mt-2 text-slate-500">{cart.length} {cart.length === 1 ? "product" : "products"} in your cart.</p>
          </div>

          {cart.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-slate-600">Your cart is empty.</p>
              <Link
                to="/products"
                className="mt-4 inline-flex rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700"
              >
                Browse products
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
              <div className="space-y-4">
                {cart.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
                  >
                    <div className="flex h-24 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-50 sm:w-24">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="h-full w-full object-contain p-2" />
                      ) : (
                        <span className="text-xs text-slate-400">No image</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="truncate font-semibold text-slate-900">{item.name}</h2>
                      <p className="mt-1 text-sm text-slate-500">{item.category}</p>
                      <p className="mt-2 font-semibold text-slate-900">₹{item.price} each</p>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={`Decrease ${item.name} quantity`}
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8 rounded border border-slate-200 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center font-medium" aria-label="Quantity">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label={`Increase ${item.name} quantity`}
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                          className="h-8 w-8 rounded border border-slate-200 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-bold text-slate-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm font-semibold text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <section className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900">Order summary</h2>
                <div className="mt-5 flex justify-between border-t border-slate-100 pt-4 text-slate-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <p className="mt-3 text-xs text-slate-500">Shipping and taxes are not included.</p>
                <Link
                  to="/products"
                  className="mt-5 block rounded-lg bg-indigo-600 px-4 py-3 text-center font-semibold text-white hover:bg-indigo-700"
                >
                  Continue shopping
                </Link>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Cart;
