export interface SendMailPayload {
    from: string;
    to: string | string[];
    subject: string;
    text: string;
}