const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOrderConfirmationEmail = async (order) => {
    const { customerInfo, items, orderNumber, subtotal, shipping, tax, discount, total, paymentMethod, shippingMethod } = order;

    const itemsHTML = items.map(item => `
        <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <img src="${item.imageURL}" alt="${item.name}" 
                         style="width: 60px; height: 72px; object-fit: cover; border-radius: 4px;" />
                    <div>
                        <p style="margin: 0; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">${item.name}</p>
                        <p style="margin: 4px 0 0; color: #888; font-size: 12px;">Qty: ${item.quantity}</p>
                    </div>
                </div>
            </td>
            <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; text-align: right; font-weight: 600; font-size: 13px; vertical-align: top; padding-top: 20px;">
                Rs. ${(item.price * item.quantity).toLocaleString()}
            </td>
        </tr>
    `).join('');

    const shippingLabels = { standard: 'Standard (3–5 days)', express: 'Express (1–2 days)', overnight: 'Overnight' };

    const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8" /></head>
    <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <div style="max-width: 580px; margin: 40px auto; background: #fff;">

            <!-- Header -->
            <div style="background-color: #1a1a2e; padding: 32px 40px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;">
                    Order Confirmed
                </h1>
                <p style="color: #aaaacc; margin: 8px 0 0; font-size: 13px; letter-spacing: 0.05em;">
                    Thank you for your order, ${customerInfo.firstName}!
                </p>
            </div>

            <!-- Order Number Banner -->
            <div style="background-color: #f9f9f9; border-bottom: 1px solid #eeeeee; padding: 16px 40px; text-align: center;">
                <p style="margin: 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #888;">Order Number</p>
                <p style="margin: 4px 0 0; font-size: 18px; font-weight: 700; color: #1a1a2e; letter-spacing: 0.08em;">${orderNumber}</p>
            </div>

            <!-- Body -->
            <div style="padding: 32px 40px;">

                <!-- Tracking CTA -->
                <div style="text-align: center; margin-bottom: 32px;">
                    <a href="${process.env.CLIENT_URL}/order/tracking/${order._id}"
                       style="display: inline-block; background-color: #1a1a2e; color: #ffffff; text-decoration: none;
                              padding: 14px 32px; font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;">
                        Track My Order
                    </a>
                </div>

                <!-- Items -->
                <h2 style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #888; margin: 0 0 12px; border-bottom: 1px solid #eeeeee; padding-bottom: 10px;">
                    Order Items
                </h2>
                <table style="width: 100%; border-collapse: collapse;">
                    ${itemsHTML}
                </table>

                <!-- Totals -->
                <div style="margin-top: 20px; border-top: 2px solid #1a1a2e; padding-top: 16px;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                        <tr>
                            <td style="padding: 4px 0; color: #888;">Subtotal</td>
                            <td style="padding: 4px 0; text-align: right;">Rs. ${subtotal.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td style="padding: 4px 0; color: #888;">Shipping (${shippingLabels[shippingMethod]})</td>
                            <td style="padding: 4px 0; text-align: right;">Rs. ${shipping.toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td style="padding: 4px 0; color: #888;">Tax (10%)</td>
                            <td style="padding: 4px 0; text-align: right;">Rs. ${tax.toLocaleString()}</td>
                        </tr>
                        ${discount > 0 ? `
                        <tr>
                            <td style="padding: 4px 0; color: #16a34a;">Discount</td>
                            <td style="padding: 4px 0; text-align: right; color: #16a34a;">- Rs. ${discount.toLocaleString()}</td>
                        </tr>` : ''}
                        <tr>
                            <td style="padding: 12px 0 4px; font-weight: 700; font-size: 15px; text-transform: uppercase; letter-spacing: 0.05em;">Total</td>
                            <td style="padding: 12px 0 4px; text-align: right; font-weight: 700; font-size: 15px;">Rs. ${total.toLocaleString()}</td>
                        </tr>
                    </table>
                </div>

                <!-- Shipping & Payment Info -->
                <div style="display: flex; gap: 20px; margin-top: 28px;">
                    <div style="flex: 1; background: #f9f9f9; padding: 16px 20px;">
                        <p style="margin: 0 0 6px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #888;">Shipping To</p>
                        <p style="margin: 0; font-size: 13px; color: #1a1a2e; line-height: 1.6;">
                            ${customerInfo.firstName} ${customerInfo.lastName}<br/>
                            ${customerInfo.address}${customerInfo.apartment ? ', ' + customerInfo.apartment : ''}<br/>
                            ${customerInfo.city}, ${customerInfo.postalCode}<br/>
                            ${customerInfo.country}
                        </p>
                    </div>
                    <div style="flex: 1; background: #f9f9f9; padding: 16px 20px;">
                        <p style="margin: 0 0 6px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #888;">Payment</p>
                        <p style="margin: 0; font-size: 13px; color: #1a1a2e; line-height: 1.6;">
                            ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card Payment'}<br/>
                            <span style="color: #888; font-size: 12px;">
                                ${paymentMethod === 'cod' ? 'Pay when you receive' : 'Payment confirmed'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div style="background: #f9f9f9; border-top: 1px solid #eeeeee; padding: 24px 40px; text-align: center;">
                <p style="margin: 0; font-size: 11px; color: #aaa; letter-spacing: 0.05em;">
                    Questions? Reply to this email or contact our support team.
                </p>
                <p style="margin: 8px 0 0; font-size: 10px; color: #ccc; text-transform: uppercase; letter-spacing: 0.1em;">
                    © ${new Date().getFullYear()} Your Store. All rights reserved.
                </p>
            </div>

        </div>
    </body>
    </html>`;

    await transporter.sendMail({
        from: `"Your Store" <${process.env.EMAIL_USER}>`,
        to: customerInfo.email,
        subject: `Order Confirmed — ${orderNumber}`,
        html
    });
};

module.exports = { sendOrderConfirmationEmail };