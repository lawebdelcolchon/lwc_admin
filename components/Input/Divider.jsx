function Divider({
    type = "horizontal", // "horizontal" o "vertical"
    text = "",
    containerStyle = "",
}) {
    return type === "horizontal" ? (
        <div className={`flex w-full flex-col ${containerStyle}`}>
            <div className="divider my-1">{text}</div>
        </div>
    ) : (
        <div className={`flex w-full ${containerStyle}`}>
            <div className="divider divider-horizontal my-1">{text}</div>
        </div>
    );
}

export default Divider;
