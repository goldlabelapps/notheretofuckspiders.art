import type { T_Tenant } from '../types';
import nhtfsConfig from '../../../public/nhtfs/config.json';

export const getTenant = (tenant?: T_Tenant) => {

    const t = tenant || process.env.NEXT_PUBLIC_TENANT;
    let config;
    let markdownDir;

    switch (t) {      
        case 'nhtfs':
            config = nhtfsConfig;
            markdownDir = process.cwd() + '/public/nhtfs/markdown';
            break;
        default:
            config = nhtfsConfig;
            markdownDir = process.cwd() + '/public/nhtfs/markdown';
            break;
    }
    return {
        tenant: t,
        config,
        markdownDir
    };
};
