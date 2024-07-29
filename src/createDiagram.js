/**
 * Represents an edge in the graph.
 * @typedef {Object} Edge
 * @property {string} start - The starting node of the edge.
 * @property {string} end - The ending node of the edge.
 * @property {string} text - The arrow label of the edge.
 */

/**
 * Creates new diagrams from possible paths and vertices.
 *
 * @param {Array<Array<Edge>>} possiblePaths - The possible paths for the diagrams.
 * @param {Object} vertices - The vertices data.
 * @returns {Array<string>} - The generated diagram contents.
 */
export function createNewDiagram(possiblePaths, vertices) {
  // const fileName = `flowchart_${Date.now()}.mmd`;
  // const filePath = path.join(process.cwd(), "diagrams", fileName);

  // fs.writeFileSync(filePath, diagramContent, "utf8");
  // console.log(`New diagram created: ${filePath}`);
  return possiblePaths.map((walkPath) => {
    const diagramContent = generateMermaidFlowchart(walkPath, vertices);
    console.log('diagramContent', diagramContent);
    return diagramContent;
  });
}

/**
 * Generates a Mermaid flowchart from a given path and vertices.
 *
 * @param {Array<Edge>} path - The path of edges for the flowchart.
 * @param {Object<string, { type: string, text: string }>} vertices - The vertices data.
 * @returns {string} - The generated Mermaid flowchart content.
 */
function generateMermaidFlowchart(path, vertices) {
  let flowchart = "\nflowchart LR\n";

  // Add connections
  const vertexKey = {};
  let connection = "";
  for (let i = 0; i < path.length; i++) {
    connection += `  ${path[i].start} -->`;
    if (path[i].text.length > 0) {
      connection += `|${path[i].text}|`;
    }
    connection += ` ${path[i].end}\n`;
    vertexKey[path[i].start] = true;
    vertexKey[path[i].end] = true;
  }

  // Add vertices
  const vertexKeys = Object.keys(vertexKey);
  for (const key of vertexKeys) {
    flowchart += `  ${key}`;
    if (vertices[key].type === "diamond") {
      flowchart += `{"${vertices[key].text}"}`;
    } else {
      flowchart += `["${vertices[key].text}"]`;
    }
    flowchart += `\n`;
  }

  flowchart += connection;
  return flowchart;
}
