export function generateDiagramAsHTML(): string{
    // Note -- for demo only, this is temporary.
    const IMAGE_PATH = "../../../assets/python_demo2.svg"
    let html = `<h1>Your Diagram</h1>
    <img src='${IMAGE_PATH}'/>`;
    return html;

}