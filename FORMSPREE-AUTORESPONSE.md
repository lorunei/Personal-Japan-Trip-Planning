# LORUNEI v41 — Formspree guest confirmation email

The website form now submits directly to Formspree with `name="email"` and `_replyto` populated from the guest's email address. It does not open a mail application.

## Guest copy / confirmation email

For privacy and deliverability, use Formspree **Autoresponse** rather than CC'ing the internal notification to the guest.

In Formspree for endpoint `mjyvgqad`:
1. Open the form project / workflow settings.
2. Enable an **Autoresponse / confirmation email** sent to the submitted `email` field.
3. Suggested sender name: `LORUNEI`.
4. Suggested subject: `We received your LORUNEI inquiry`.
5. Suggested English body: `Thank you for contacting LORUNEI. We received your inquiry and will review the details personally. We will reply as soon as possible.`
6. Suggested Japanese body: `LORUNEIへお問い合わせいただきありがとうございます。ご相談内容を受け付けました。内容を確認のうえ、順次ご返信いたします。`

The normal Formspree notification remains internal. Reply-To is set to the guest address so replying from the notification goes to the guest.

Note: the website code can prepare the submitted email field, but enabling Formspree Autoresponse is an account-side setting and cannot be switched on by static HTML alone.
