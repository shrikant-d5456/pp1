import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL } from '../url';
import { BsFiletypePdf } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
const Practioners = () => {
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [filteredFiles, setFilteredFiles] = useState([]); // Filtered files based on category
    const [category, setCategory] = useState('All'); // Selected category

    const fetchFiles = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/files`);
            setFiles(res.data);
            setFilteredFiles(res.data); // Initially show all files
        } catch (err) {
            console.error('Error fetching files:', err);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    // Filter files when category changes
    useEffect(() => {
        if (category === 'All') {
            setFilteredFiles(files);
        } else {
            setFilteredFiles(files.filter(file => file.metadata?.category === category));
        }
    }, [category, files]);

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
            fetchFiles(); // Refresh the file list after deletion
        } catch (err) {
            console.error('Error deleting file:', err);
            toast('Error deleting file');
        }
    };

    return (
        <main>

            <div className="sm:flex w-full mt-2">
                <div className=' sm:w-[300px] sm:h-[90vh] bg-white text-sm'>
                    <h1 className="lg:tracking-widest lg:uppercase bg-green text-white py-2 px-4 font-semibold">Files</h1>
                    {/* Category Buttons */}
                    <div className="flex sm:flex-col sm:mb-6 md:m-0">
                        {['All', '1st Year', '2nd Year', '3rd Year', '4th Year'].map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-4 py-1  border-[1px] border-gray-100 text-start ${category === cat ? 'bg-green-500 text-white transition-all' : 'bg-gray-200 text-gray-700 '}`}
                            >
                            {cat}
                            </button>
                        ))}
                    </div>
                    <Link to="/quize"><p className='lg:tracking-widest lg:uppercase bg-green text-white py-2 px-4 font-semibold'>Quiz</p></Link>


                </div>

                <div className=' w-full'>
                    {filteredFiles.length > 0 ? (
                        <div className="flex justify-center items-center m-auto gap-2 flex-wrap my-4">
                            {filteredFiles.map((file) => (
                                <div
                                    key={file._id}
                                    className="flex flex-col items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md"
                                >
                                    <div className="flex flex-col items-center space-x-3">
                                        <span className="sm:text-8xl text-4xl p-4">
                                            <BsFiletypePdf />
                                        </span>
                                        <span className="font-semibold text-[11px]">{(file.filename).substring(0, 20)}..</span>
                                    </div>
                                    <div className="flex space-x-2 my-2 text-sm">
                                        <button
                                            onClick={() => handleOpenPDF(file.filename)}
                                            className="bg-green-500 text-white px-4 py-1 "
                                        >
                                            Open
                                        </button>
                                        <button
                                            onClick={() => handleDownload(file.filename)}
                                            className=" border-[1px] border-green-500  px-4 py-1 "
                                        >
                                            Download
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div> 
                    ) : (
                        <p className=' w-full min-h-[80vh] flex justify-center items-center '>No files found for {category}.</p>
                    )}
                </div>
            </div>


        </main>
    );
};

export default Practioners;
