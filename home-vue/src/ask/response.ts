import {Message, Modal} from '@arco-design/web-vue';
import type {AxiosResponse} from "axios";

export default (response: AxiosResponse) => {
    if (response.status === 200) {
        console.error(response);
        return response.data;
    } else {
        Message.error("数据加载错误，请重新操作！");
        return Promise.reject(response);
    }
}
