module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  try {
    const { formData = {}, clientName = 'Khách hàng', phone = '', pdfBase64 } = req.body || {};

    if (!pdfBase64) {
      return res.status(400).json({ error: 'Thiếu file PDF.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.RECIPIENT_EMAIL || 'vinnielx@gmail.com';

    if (!apiKey) {
      return res.status(500).json({ error: 'Chưa cấu hình RESEND_API_KEY trên Vercel.' });
    }

    const safeName = String(clientName).replace(/[^\p{L}\p{N}_-]+/gu, '_').slice(0, 80) || 'Khach_hang';
    const filename = `VPS_Global_482_186_${safeName}.pdf`;

    const subject = `[VPS Global] Hồ sơ kê khai Visa 482/186 - ${clientName}`;
    const text = [
      'Kính gửi VPS Global,',
      '',
      'Có hồ sơ kê khai Visa 482/186 mới được gửi từ website.',
      '',
      `Họ và tên: ${clientName}`,
      `Điện thoại: ${phone || 'Chưa cung cấp'}`,
      '',
      'Toàn bộ thông tin kê khai được đính kèm trong file PDF.',
      '',
      'VPS GLOBAL - TƯ VẤN VISA ÚC 482-186'
    ].join('\n');

    // Resend expects a base64 attachment.
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.MAIL_FROM || 'VPS Global Website <onboarding@resend.dev>',
        to: [recipient],
        subject,
        text,
        attachments: [
          {
            filename,
            content: pdfBase64
          }
        ]
      })
    });

    const result = await emailResponse.json();
    if (!emailResponse.ok) {
      console.error('Resend error:', result);
      return res.status(502).json({ error: 'Dịch vụ email từ chối yêu cầu gửi.' });
    }

    return res.status(200).json({ ok: true, id: result.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Lỗi máy chủ khi gửi hồ sơ.' });
  }
};
