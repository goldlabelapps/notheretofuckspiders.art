


export type T_Email = {
    from: {
        label: string;
        email: string;
    },
    to: {
        label: string;
        email: string;
    }
    subject: string;
    body: string; // Markdown or HTML content?  
    template?: string;

};