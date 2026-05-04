import type { I_NestedNav, T_Frontmatter, T_Tenant } from '../NX/types';
import { Metadata } from "next";
import { Box, Container } from '@mui/material';
import { NX } from '../NX';
import { serverUseNav, getTenant, getMeta } from '../NX/lib/index.server';
import { Footer } from '../NX/DesignSystem';
import { Viruses, Share } from '../Virus'


const PAGE_TITLE = "Viruses°";
const PAGE_DESCRIPTION = "PORNVIRUSMP3";
const PAGE_URL = "/viruses";
const IMAGE_URL = 'https://live.staticflickr.com/65535/55227789380_e8f6c20743_b.jpg';
const FRONTMATTER: T_Frontmatter = {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    icon: "virus",
    slug: PAGE_URL,
    image: IMAGE_URL,
};

export async function generateMetadata(): Promise<Metadata> {
    const tenant = process.env.NEXT_PUBLIC_TENANT || "nx";
    const { config } = getTenant(tenant as T_Tenant);
    return getMeta({
        siteName: config.siteName,
        title: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        image: 'https://live.staticflickr.com/65535/55227789380_e8f6c20743_b.jpg',
        url: (config.url || "").replace(/\/$/, "") + PAGE_URL,
    });
}

export default async function Page() {
    
    const tenant = process.env.NEXT_PUBLIC_TENANT || "nx";
    const { config: rawConfig } = getTenant(tenant as T_Tenant);
    const config = { ...rawConfig, tenant: tenant as T_Tenant };
    const navItems = await serverUseNav();
    const meta = getMeta({
        siteName: config.siteName,
        title: FRONTMATTER.title || PAGE_TITLE,
        description: FRONTMATTER.description || PAGE_DESCRIPTION,
        url: (config.url || "").replace(/\/$/, "") + PAGE_URL,
        image: IMAGE_URL,
    });

    return (
        <NX config={config} frontmatter={FRONTMATTER}>
            <Container id="main" maxWidth="lg" sx={{ mt: '20px', pb: '90px' }}>
                <Box sx={{ width: '100%', display: 'flex', gap: 1 }}>
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column' }}>
                        <Box sx={{ flexGrow: 1, minHeight: 0, minWidth: 200 }}>
                            <Share />
                        </Box>
                    </Box>
                    <Box component="main" 
                    sx={{ 
                        gridColumn: { lg: '1' }, 
                        width: '100%', 
                        minWidth: 0, 
                        pr: { xs: 2, lg: 3 }, 
                        pl: { xs: 2, lg: 0 }, 
                        flexGrow: 1 }}>
                        <Viruses />
                    </Box>
                </Box> 
            </Container>
            <footer>
                <Footer
                    meta={meta as any}
                    frontmatter={FRONTMATTER}
                    navItems={navItems as I_NestedNav["navItems"]}
                />
            </footer>
        </NX>
    );
}