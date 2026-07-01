import "./globals.css";
import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import { UbereduxProvider } from './NX/Uberedux';
import RequireAuthWrapper from './NX/Paywall/components/RequireAuthWrapper';

const tenant = process.env.NEXT_PUBLIC_TENANT || "nhtfs";
const configPath = path.join(process.cwd(), 'public', tenant, 'config.json');
const configRaw = fs.readFileSync(configPath, 'utf-8');
const config = JSON.parse(configRaw);
const { title, description, favicon } = config;
const encodedFavicon = typeof favicon === 'string' ? encodeURI(favicon) : favicon;
const encodedManifestHref = `/${encodeURIComponent(tenant)}/manifest.json`;
const metadataBase = (() => {
  try {
    return new URL(config.url || 'http://localhost:3000');
  } catch {
    return new URL('http://localhost:3000');
  }
})();

export const metadata: Metadata = {
  metadataBase,
  title: `${title}, ${description}`,
  description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const paywall = config.features?.paywall?.enabled === true;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={encodedFavicon} />
        <link rel="manifest" href={encodedManifestHref} />
        <meta name="application-name" content={title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={title} />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <div className="wrapper">
          <UbereduxProvider config={config}>
            {paywall ? (
              <RequireAuthWrapper config={config}>{children}</RequireAuthWrapper>
            ) : (
              children
            )}
          </UbereduxProvider>
        </div>
      </body>
    </html>
  );
}
