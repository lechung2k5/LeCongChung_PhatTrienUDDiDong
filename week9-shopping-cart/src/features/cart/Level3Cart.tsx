import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from './productsSlice';
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  applyDiscount,
  setShippingCost,
} from './cartSlice';
import { selectCartSummary } from './cartSelectors';

export const Level3Cart = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);
  const productsStatus = useAppSelector((state) => state.products.status);
  const cartItems = useAppSelector((state) => state.cart.items);
  const summary = useAppSelector(selectCartSummary);
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);

  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, productsStatus]);

  const handleApplyDiscount = (code: string) => {
    dispatch(applyDiscount(code));
  };

  const handleShippingChange = (cost: number) => {
    dispatch(setShippingCost(cost));
  };

  const handleCheckout = () => {
    setCheckoutMessage(`✅ Đặt hàng thành công! Tổng hóa đơn: $${summary.total.toFixed(2)}.`);
    dispatch(clearCart());
    setTimeout(() => setCheckoutMessage(null), 4000);
  };

  if (productsStatus === 'loading') return <p>Đang tải danh sách sản phẩm từ API...</p>;
  if (productsStatus === 'failed') return <p>Lỗi tải dữ liệu sản phẩm.</p>;

  return (
    <div className="shopping-cart">
      <h1>🛍️ Cửa Hàng Trực Tuyến (Level 3 - Chuyên Nghiệp)</h1>

      {checkoutMessage && (
        <div className="alert alert-success">{checkoutMessage}</div>
      )}

      {/* Danh sách sản phẩm */}
      <section style={{ marginBottom: '20px' }}>
        <h2>Sản Phẩm Có Sẵn (Async Thunk)</h2>
        <div className="products-simple-grid">
          {products.map((product) => (
            <div key={product.id} className="product-simple-card">
              <div>
                <h4>{product.name}</h4>
                <div className="price">${product.price.toFixed(2)}</div>
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => dispatch(addToCart(product))}
              >
                Thêm Vào Giỏ
              </button>
            </div>
          ))}
        </div>
      </section>

      <hr />

      {/* Giỏ hàng */}
      <section style={{ marginBottom: '20px' }}>
        <h2>Giỏ Hàng ({summary.itemCount} sản phẩm)</h2>

        {cartItems.length === 0 ? (
          <p style={{ color: '#6c757d' }}>Giỏ hàng trống (dữ liệu lưu tự động vào LocalStorage)</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="item-row">
                <span>
                  <strong>{item.name}</strong> (${item.price.toFixed(2)})
                </span>

                <div>
                  <button
                    className="btn btn-sm"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span style={{ margin: '0 8px', fontWeight: 'bold' }}>
                    {item.quantity}
                  </span>
                  <button
                    className="btn btn-sm"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    +
                  </button>
                  <span style={{ margin: '0 12px', fontWeight: 'bold' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <hr />

      {/* Áp dụng mã giảm giá */}
      <section style={{ marginBottom: '16px' }}>
        <h3>Mã Giảm Giá</h3>
        <button
          onClick={() => handleApplyDiscount('SUMMER10')}
          style={{ marginRight: '8px' }}
        >
          SUMMER10 (-10%)
        </button>
        <button onClick={() => handleApplyDiscount('SPECIAL20')}>
          SPECIAL20 (-20%)
        </button>
        {summary.discountCode && (
          <span style={{ marginLeft: '12px', color: '#198754', fontWeight: 600 }}>
            Đang áp dụng: {summary.discountCode} (-{(summary.discountRate * 100).toFixed(0)}%)
          </span>
        )}
      </section>

      {/* Lựa chọn vận chuyển */}
      <section style={{ marginBottom: '20px' }}>
        <h3>Phí Vận Chuyển</h3>
        <label>
          <input
            type="radio"
            name="shipping"
            onChange={() => handleShippingChange(0)}
          />{' '}
          Miễn phí ($0)
        </label>
        <label>
          <input
            type="radio"
            name="shipping"
            onChange={() => handleShippingChange(10)}
            defaultChecked
          />{' '}
          Tiêu chuẩn ($10)
        </label>
        <label>
          <input
            type="radio"
            name="shipping"
            onChange={() => handleShippingChange(25)}
          />{' '}
          Nhanh ($25)
        </label>
      </section>

      {/* Tóm tắt hóa đơn */}
      <section className="card-box">
        <h2>Tóm Tắt Đơn Hàng</h2>
        <table style={{ width: '100%', marginBottom: '12px' }}>
          <tbody>
            <tr>
              <td>Tổng cộng (Subtotal):</td>
              <td style={{ textAlign: 'right' }}>${summary.subtotal.toFixed(2)}</td>
            </tr>
            {summary.discount > 0 && (
              <tr style={{ color: '#198754' }}>
                <td>Giảm giá ({summary.discountCode}):</td>
                <td style={{ textAlign: 'right' }}>-${summary.discount.toFixed(2)}</td>
              </tr>
            )}
            <tr>
              <td>Thuế (10%):</td>
              <td style={{ textAlign: 'right' }}>${summary.tax.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Vận chuyển:</td>
              <td style={{ textAlign: 'right' }}>${summary.shipping.toFixed(2)}</td>
            </tr>
            <tr style={{ fontWeight: 700, fontSize: '16px' }}>
              <td>Thành Tiền:</td>
              <td style={{ textAlign: 'right', color: '#0d6efd' }}>
                ${summary.total.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <button
          className="btn btn-primary"
          style={{ width: '100%', padding: '10px' }}
          disabled={cartItems.length === 0}
          onClick={handleCheckout}
        >
          Thanh Toán
        </button>
      </section>
    </div>
  );
};
