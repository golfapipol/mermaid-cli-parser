import fs from 'fs'
/**
 * Represents an edge in the graph.
 * @typedef {Object} Edge
 * @property {string} start - The starting node of the edge.
 * @property {string} end - The ending node of the edge.
 * @property {string} text - The arrow label of the edge.
 */

/**
 * @param {any[]} edges
 */
export function findAllPaths(edges) {
  if (edges.length == 0) {
    return []
  }
  /**
  * Represents a graph as an adjacency list.
  * @type {Object.<string, string[]>}
  */
  const graph = {};

  // Populate the graph with edges
  // @ts-ignore
  edges.forEach(edge => {
    if (!graph[edge.start]) {
        graph[edge.start] = [];
    }
    graph[edge.start].push(edge.end);
  });

  /**
  * Recursively finds all paths in the graph starting from a given node.
  * @param {string} start - The starting node for the current path.
  * @param {Edge[]} path - The path accumulated so far.
  * @returns {Edge[][]} An array of all possible paths, each represented as an array of edges.
  */
  function findPaths(start, path) {
    if (!graph[start]) {
        return [path];
    }

    /**
     * @type {any[]}
     */
    let paths = [];
    graph[start].forEach(nextNode => {
      const edge = edges.find((e) => e.start === start && e.end === nextNode)
      const newPath = [...path, { start: start, end: nextNode, text: edge.text }];
        paths = paths.concat(findPaths(nextNode, newPath));
    });
    return paths;
  }

  // Starting point for finding paths
  const startNode = edges[0].start || "A";

  // Find all paths from the startNode
  const allPaths = findPaths(startNode, []);

  // Log all paths
  allPaths.forEach(path => console.log(path));
  return  allPaths
}
