import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../url.js';
import { toast } from 'react-toastify';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [category, setCategory] = useState('All'); // State to manage the selected category
    const [fileCategory, setFileCategory] = useState('All'); // Default category for uploading files

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleFileCategoryChange = (e) => {
        setFileCategory(e.target.value);
    };

    const handleUpload = async () => {
        if (!file) {
            toast('Please select a file first.');
            return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', fileCategory); // Include category
    
        try {
            const res = await axios.post(`http://localhost:8000/api/files/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            toast('File uploaded successfully: ' + res.data.message);
            fetchFiles(); // Refresh file list
            setFile(null); // Reset file state
        } catch (err) {
            toast('Error uploading file:', err);
        }
    };
    

    const fetchFiles = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/files`, {
                params: { category: category === 'All' ? '' : category }, // Pass category as query parameter
            });
            setFiles(res.data);
        } catch (err) {
            console.error('Error fetching files:', err);
        }
    };
    

    useEffect(() => {
        fetchFiles();
    }, [category]); // Re-fetch files whenever the category changes

    const handleOpenPDF = (filename) => {
        window.open(`http://localhost:8000/api/files/${filename}`, '_blank');
    };

    const handleDownload = async (filename) => {
        try {
            const res = await axios.get(`http://localhost:8000/api/files/${filename}`, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error('Error downloading file:', err);
        }
    };

    const handleDelete = async (fileId) => {
        try {
            await axios.delete(`http://localhost:8000/api/files/${fileId}`);
            toast('File deleted successfully');
            fetchFiles(); // Refresh file list after deletion
        } catch (err) {
            console.error('Error deleting file:', err);
            toast('Error deleting file');
        }
    };

    const getFileTypeIcon = (filename) => {
        if (filename.endsWith('.pdf')) {
            return '📄'; // PDF icon
        } else if (filename.endsWith('.jpg') || filename.endsWith('.png')) {
            return '🖼️'; // Image icon
        } else {
            return '📁'; // Default file icon
        }
    };

    return (
        <div className="lg:w-10/12 md:w-10/12 w-full m-auto">
            <div className="flex justify-center items-center my-8 flex-col border-2 bg-gray-100">
                <h1 className="text-2xl font-semibold my-2  w-full text-center p-2">Upload Files</h1>
                <div className="p-4 w-full shadow-md flex flex-col items-center rounded-md">
                    <input type="file" onChange={handleFileChange} />
                    <select
                        value={fileCategory}
                        onChange={handleFileCategoryChange}
                        className="border rounded-md px-4 py-2 mt-2"
                    >
                    <option value="All">All</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                    </select>
                    <button
                        onClick={handleUpload}
                        className="bg-green-500 text-white px-4 py-1 mt-2 rounded-sm"
                    >
                        Upload
                    </button>
                </div>
            </div>
            <hr />
            <div className="my-4 flex flex-col items-center">
                <h1 className="text-2xl font-semibold my-2">Uploaded Files</h1>
                <select
                    value={category}
                    onChange={handleCategoryChange}
                    className="border rounded-md px-4 py-2 mb-4"
                >
                    <option value="All">All</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                </select>
                {files.length > 0 ? (
                    <div className="space-y-4 w-full">
                        {files.map((file) => (
                            <div
                                key={file._id}
                                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md"
                            >
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">{getFileTypeIcon(file.filename)}</span>
                                    <span className="font-semibold text-lg">{file.filename}</span>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleOpenPDF(file.filename)}
                                        className="bg-blue-500 text-white px-4 py-1"
                                    >
                                        Open PDF
                                    </button>
                                    <button
                                        onClick={() => handleDownload(file.filename)}
                                        className="bg-green-500 text-white px-4 py-1"
                                    >
                                        Download
                                    </button>
                                    <button
                                        onClick={() => handleDelete(file._id)}
                                        className="bg-red-500 text-white px-4 py-1"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No files uploaded yet.</p>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
