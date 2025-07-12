import React, { useEffect, useRef, useState } from "react";

const Select = ({ options, placeholder, inp, setInp }) => {
    const [showoptions, setShowoptions] = useState(false);
    const optionRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionRef.current && !optionRef.current.contains(event.target)) {
                setShowoptions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);
    return (
        <div
            ref={optionRef}
            className={`w-full relative cursor-pointer`}
            onClick={() => setShowoptions(!showoptions)}
        >
            <input
                type="text"
                placeholder={placeholder}
                className={` w-full px-4 py-2  md:text-sm border bg-white text-gray-800  focus:outline-none focus:ring-1 focus:ring-green-200 focus:border-green-300 transition duration-150 ease-in-out placeholder:text-gray-400 shadow-sm`}
                value={inp}
                onChange={(e) => setInp(e.target.value)}
                title="click here"
            />
            <div
                className={`w-full max-h-60 absolute transition-all transform shadow-md mt-[1px] z-50 rounded-sm overflow-scroll bg-white duration-500 ease-in-out`}
            >
                {showoptions &&
                    options.filter((ele) => ele.includes(inp)).map((ele, index) => (
                        <Option
                            key={index}
                            ele={ele}
                            setInp={setInp}
                            setShowoptions={setShowoptions}
                        />
                    ))}
            </div>
        </div>
    );
};

const Option = ({ ele, setInp, setShowoptions }) => {
    const operation = (e) => {
        e.stopPropagation();
        setShowoptions(false);
        setInp(ele);
    };

    return (
        <div
            className="w-full border-b-[1px] text-sm text-black bg-white overflow-scroll cursor-pointer transition-transform transform "
            onClick={operation}
        >
            <p className="w-full hover:bg-green-500 text-left hover:text-white bg-white p-1 overflow-x-scroll px-2">
                {ele}
            </p>
        </div>
    );
};

export default Select;