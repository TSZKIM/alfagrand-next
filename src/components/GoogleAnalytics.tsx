// GA4 measurement IDs are public client-side values (they appear in page HTML).
// Prefer an explicit env var so the ID can be overridden per environment,
// and fall back to the production ID so tracking stays on by default.
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-8R976WNQV6";

export default function GoogleAnalytics() {
  const gaId = GA_MEASUREMENT_ID;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', { page_path: window.location.pathname });
          `,
        }}
      />
    </>
  );
}
