import React from 'react';
import { Component } from 'react';
import './fileInput.css';
import PropTypes from 'prop-types';

class FileInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="upload-btn-wrapper">
                <button className="upload-btn">File</button>
                <input onChange={this.fileInputChanged.bind(this)} type="file"/>
            </div>
        );
    }

    fileInputChanged(e) {
        const file = e.target.files[0];
        if (file) {
            this.props.fileUploadButtonCallback({
                file: file,
                size: file.size
            });
        }
    }
}

FileInput.propTypes = {
    fileUploadButtonCallback: PropTypes.func
};

export default FileInput;