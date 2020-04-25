import axios from 'axios';
import {ML_SERVER} from "../config/config";


export class TextRecognition {
    static recognize(text) {
        const bodyFormData = new FormData();
        bodyFormData.set('Title', 'Some title');
        bodyFormData.set('Body', text);
        return axios.post(`${ML_SERVER}/check`, bodyFormData, {
            headers: {'Content-Type': 'multipart/form-data' }
        })
            .then(value => {
                return value.data;
            })
    }
}
