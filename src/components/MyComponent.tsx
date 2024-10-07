import React from 'react';

// Define props interface
interface MyComponentProps {
    title: string;
    onClick: () => void;
}

// Functional component
const MyComponent: React.FC<MyComponentProps> = ({ title, onClick }) => {
    return (
        <div>
            <h1>{title}</h1>
            <button onClick={onClick}>Click Me</button>
        </div>
    );
};

export default MyComponent;
