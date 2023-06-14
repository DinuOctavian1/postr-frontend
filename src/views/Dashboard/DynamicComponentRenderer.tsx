const DynamicComponentRenderer = ({ condition, component }) => {
  if (!condition) {
    return null; // Don't render anything if the condition is false
  }

  return component; // Render the component if the condition is true
};

export default DynamicComponentRenderer;
