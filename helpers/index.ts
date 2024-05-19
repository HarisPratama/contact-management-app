const getRandomColor = () => {
    const getByte = () => Math.floor(Math.random() * 200);
    return {
        backgroundColor: `rgba(${getByte()},${getByte()},${getByte()},0.1)`,
        color: `rgb(${getByte()},${getByte()},${getByte()})`,
    };
};

export {
    getRandomColor
}
