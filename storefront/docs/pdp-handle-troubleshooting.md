## PDP handle troubleshooting (Medusa v2)

This guide helps diagnose 404s on product detail pages (PDP) that use
handle-based URLs like `/us/products/t-shirt`.

### How PDP routing works
- The storefront links to `/products/<handle>`.
- The PDP fetches the product using the Store API list filter `handle=<handle>`.
- The Store API response is scoped by the publishable key's sales channels.

### Required Store API auth (v2)
All `/store` requests must include `x-publishable-api-key`. The storefront
uses `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` via the JS SDK.

Confirm:
- The deployment environment includes `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`.
- The key is active in Medusa Admin (Settings → Publishable API Keys).

### Sales channel visibility
Products are only returned for sales channels associated with the publishable
key. If a product is not in the key’s channels, the PDP will 404 even if the
handle is correct.

Check in Admin:
- Product → Sales Channels: ensure the product is assigned.
- Publishable API Key → Sales Channels: ensure the key includes that channel.

Optional: set `NEXT_PUBLIC_MEDUSA_SALES_CHANNEL_ID` to force a single channel
filter in storefront queries (only if you need explicit scoping).

### Region mapping
The storefront resolves a region from the URL’s country code. If a country code
is not mapped to a region, the PDP will return a 404.

Verify:
- Region includes the country code in Admin.
- The PDP is accessed under a valid `/{countryCode}` prefix.

### Verify the handle via Store API
Use curl to confirm the product is returned:

```
curl -L "https://<BACKEND_URL>/store/products?handle=t-shirt" \
  -H "x-publishable-api-key: <PUBLISHABLE_KEY>"
```

If `products` is empty, the issue is not the URL but Store API scoping.

### After confirming the fix
Remove temporary failsafes:
- Handle normalization in links/route params.
- The full fallback scan in `getProductByHandle`.
