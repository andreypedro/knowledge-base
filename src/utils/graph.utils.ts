export async function shortestPath(
  fromId: string,
  toId: string,
  getTopics: () => Promise<Array<{ id: string; parentTopicId?: string | null }>>
): Promise<string[]> {
  const topics = await getTopics();
  const graph: Record<string, string[]> = {};

  // Build adjacency list
  topics.forEach((topic) => {
    if (!graph[topic.id]) graph[topic.id] = [];
    if (topic.parentTopicId) {
      if (!graph[topic.parentTopicId]) graph[topic.parentTopicId] = [];
      graph[topic.parentTopicId].push(topic.id);
      graph[topic.id].push(topic.parentTopicId);
    }
  });

  // BFS to find shortest path
  const queue: [string, string[]][] = [[fromId, [fromId]]];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const [current, path] = queue.shift()!;
    if (current === toId) return path;
    visited.add(current);
    for (const neighbor of graph[current] || []) {
      if (!visited.has(neighbor)) {
        queue.push([neighbor, [...path, neighbor]]);
      }
    }
  }
  return [];
}
