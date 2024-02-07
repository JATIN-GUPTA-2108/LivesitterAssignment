import React, { useState } from 'react';

const CustomOverlay = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
    const [height, setHeight] = useState(100);
    const [width, setWidth] = useState(100);
    const [logo, setLogo] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const [BG, setBG] = useState(false);

    // Function to handle mouse down event for dragging the overlay
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStartPos({ x: e.clientX, y: e.clientY });
    };

    // Function to handle mouse move event for dragging the overlay
    const handleMouseMove = (e) => {
        if (isDragging) {
            const deltaX = e.clientX - dragStartPos.x;
            const deltaY = e.clientY - dragStartPos.y;
            setPosition({ x: position.x + deltaX, y: position.y + deltaY });
            setDragStartPos({ x: e.clientX, y: e.clientY });
        }
    };

    // Function to handle mouse up event for ending drag
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Function to handle height change input
    const handleChangeHeight = (e) => {
        setHeight(parseInt(e.target.value));
    };

    // Function to handle width change input
    const handleChangeWidth = (e) => {
        setWidth(parseInt(e.target.value));
    };

    // Function to handle logo file change
    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setLogo(file);
    };

    // Function to toggle visibility of settings
    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    // Effect to add and remove mouse move and mouse up event listeners
    React.useEffect(() => {
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isDragging]);

    return (
        <div className="relative">
            <div
                className="absolute bg-gray-500 bg-opacity-50"
                style={{ left: position.x, top: position.y, width: width, height: height, zIndex:`${BG ? -1000 : 1000}`}}
                onMouseDown={handleMouseDown}
            >
                {logo ? (
                    <img src={URL.createObjectURL(logo)} alt="Custom Logo" className="w-full h-full object-contain" />
                ) : (
                    <div className="text-white p-2 select-none">Your Logo</div>
                )}
            </div>
            <div className="absolute border-spacing-x-2 bottom-1">
                <button onClick={toggleSettings} className="px-2 py-1 bg-gray-200 rounded select-none">Settings</button>
                {showSettings && (
                    <div className="mt-2">
                        <input type="number" value={height} onChange={handleChangeHeight} className="w-16 py-1 px-2 border rounded border-gray-400 mr-2" />
                        <input type="number" value={width} onChange={handleChangeWidth} className="w-16 py-1 px-2 border rounded border-gray-400 mr-2" />
                        <input type="file" onChange={handleLogoChange} />
                        <button className="bg-gray-200 select-none p-2" onClick={()=>setBG(!BG)}>Set</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomOverlay;
