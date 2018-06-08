export default ({object, startPoint, mouse}: {object: any, startPoint:any, mouse: any})  => {
    return {
        ...object,
        x: mouse.x - (startPoint.clientX - startPoint.objectX),
        y: mouse.y - (startPoint.clientY - startPoint.objectY)
    };
};