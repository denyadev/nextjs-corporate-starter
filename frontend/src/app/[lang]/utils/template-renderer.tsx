// In your utils/template-renderer.js or .ts
export const templateRenderer = (template) => {
    switch (template.__component) {
        case "template.speaker":
            return (
                <div key={index}>
                    <h3>{template.name}</h3>
                    <p>{template.title}</p>
                    {/* Render other speaker attributes */}
                </div>
            );
        // Add cases for other template types
        default:
            return <div key={index}>Unknown template type</div>;
    }
};
