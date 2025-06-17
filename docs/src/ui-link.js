
window.LongPressLink = ({ href, children, ...props }) => {
  const timerRef = React.useRef(null);

  const handleMouseDown = () => {
    timerRef.current = setTimeout(() => {
      if (href) {
        window.open(href, props.target || "_blank", "noopener,noreferrer");
      }
    }, 100);
  };

  const handleMouseUp = () => {
    clearTimeout(timerRef.current);
  };

  const handleOnClick = () => {
    // do nothing
  };

  return (
    <a
      href={href}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchCancel={handleMouseUp}
      onClick={e => e.preventDefault()}
      {...props}
    >
      {children}
    </a>
  );
};