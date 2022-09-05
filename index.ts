'use strict';
import Transport from 'winston-transport'
import Axios, {AxiosRequestConfig} from 'axios';

const DEFAULT_NODE_ENV = 'production'

export class RocketChatHook extends Transport {
    webhookUrl: string;
    level: string;
    axiosInstance;
    title: string = 'ALERT';
    color = '#ff0000'

    constructor(opts: any) {
        super(opts);
        opts = opts || {};
        if (!opts.webhookUrl) {
            throw "Webhook Url is Required"
        }
        this.webhookUrl = opts.webhookUrl;
        this.level = opts.level || undefined;
        this.title = opts.title || this.title;
        this.color = opts.color || this.color;

        this.axiosInstance = Axios.create({
            proxy: opts.proxy || undefined
        });
    }

    /**
     *
     * @param info
     * @param callback
     */
    log(info: { level: string; message: string; }, callback: () => void) {
        const axiosConfig: AxiosRequestConfig = {
            method: 'post',
            url: this.webhookUrl,
            data: {
                text: `*${(process.env.NODE_ENV || DEFAULT_NODE_ENV).toUpperCase()}*`,
                attachments: [
                    {
                        title: this.title,
                        text: info.message,
                        color: this.color
                    }
                ]
            }
        }
        this.axiosInstance(axiosConfig).then().catch((error)=>{
            console.error("Error in send Event RocketChat",error)
        })
    }
}
