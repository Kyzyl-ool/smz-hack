import React from 'react';
import { post } from 'axios';
import "./simpleUpload.css"
import UploadButton from "../uploadButton/uploadButton";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography/Typography";

class SimpleReactFileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null
        };

        this.fileChange = this.props.fileChange;
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
    }

    fileChange() {}

    onFormSubmit(e){
        e.preventDefault();
        this.fileUpload(this.state.file).then((response)=>{
            console.log(response.data);
        })
    }

    onChange(e) {
        this.setState({file:e.target.files[0]});
        this.fileChange(e.target.files[0]);
    }

    fileUpload(file){
        const url = 'http://localhost:8000/file-upload';
        const formData = new FormData();
        formData.append('file',file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        return  post(url, formData,config)
    }

    render() {

        return (
            <form onSubmit={this.onFormSubmit}>
                <Typography variant="h6" gutterBottom>
                    Загрузка файла
                </Typography>
                <div className="upload-btn-wrapper">
                    <UploadButton/>
                    <input type="file" onChange={this.onChange} name="myfile"/>

                    {this.state.file ?

                        <div className="image-upload-wrap">
                            <input className="file-upload-input" type='file' onChange={this.onChange}/>
                            <div className="drag-text">
                                {this.state.file.name}
                            </div>
                        </div>

                        :

                        <div className="image-upload-wrap">
                            <input className="file-upload-input" type='file' onChange={this.onChange}/>
                            <div className="drag-text">
                                Выберите файл
                            </div>
                            <svg className="MuiSvgIcon-root upload-svg-icon makeStyles-rightIcon-9" focusable="false" viewBox="0 0 24 24"
                                 aria-hidden="true" role="presentation">
                                <path
                                    d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path>
                            </svg>
                        </div>
                    }
                </div>
            </form>
        )
    }
}

export default SimpleReactFileUpload