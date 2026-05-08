import type { T_Tenant } from '../types';
import 我不是来和蜘蛛交配的Config from '../../../public/我不是来和蜘蛛交配的/config.json';

export const getTenant = (tenant?: T_Tenant) => {

    const t = tenant || process.env.NEXT_PUBLIC_TENANT;
    let config;
    let markdownDir;

    switch (t) {      
        case '我不是来和蜘蛛交配的':
            config = 我不是来和蜘蛛交配的Config;
            markdownDir = process.cwd() + '/public/我不是来和蜘蛛交配的/markdown';
            break;
        default:
            config = 我不是来和蜘蛛交配的Config;
            markdownDir = process.cwd() + '/public/我不是来和蜘蛛交配的/markdown';
            break;
    }
    return {
        tenant: t,
        config,
        markdownDir
    };
};
